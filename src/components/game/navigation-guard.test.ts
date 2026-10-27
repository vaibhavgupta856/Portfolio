import { strict as assert } from "node:assert";
import { test } from "node:test";
import { MatchNavigationGuard } from "./navigation-guard";
import { roomUrl } from "./room-url";

class BrowserEvent {
  stopped = false;
  defaultPrevented = false;
  returnValue = false;
  stopImmediatePropagation() { this.stopped = true; }
  preventDefault() { this.defaultPrevented = true; }
}

class Browser {
  entries = [
    { state: { __NA: true, route: "previous" }, url: "https://example.com/projects" },
    { state: { __NA: true, route: "game" }, url: "https://example.com/?room=abc123&ref=friend#about" },
  ];
  index = 1;
  pending: (() => void)[] = [];
  listeners: { name: string; callback: (event: BrowserEvent) => void; capture: boolean }[] = [];
  location = { href: this.entries[this.index].url };
  history = {
    state: this.entries[this.index].state as Record<string, unknown>,
    pushState: (state: Record<string, unknown>, _title: string, url: string | URL) => {
      this.entries.splice(this.index + 1);
      this.entries.push({ state: state as typeof this.entries[number]["state"], url: String(url) });
      this.index++;
      this.sync();
    },
    replaceState: (state: Record<string, unknown>, _title: string, url: string | URL) => {
      this.entries[this.index] = { state: state as typeof this.entries[number]["state"], url: String(url) };
      this.sync();
    },
    back: () => {
      this.pending.push(() => {
        if (this.index === 0) return;
        this.index--;
        this.sync();
        this.dispatch("popstate");
      });
    },
  };

  addEventListener(name: string, callback: (event: BrowserEvent) => void, capture = false) {
    this.listeners.push({ name, callback, capture });
  }
  removeEventListener(name: string, callback: (event: BrowserEvent) => void, capture = false) {
    this.listeners = this.listeners.filter((listener) => listener.name !== name || listener.callback !== callback || listener.capture !== capture);
  }
  dispatch(name: string) {
    const event = new BrowserEvent();
    const listeners = this.listeners.filter((listener) => listener.name === name).sort((a, b) => Number(b.capture) - Number(a.capture));
    for (const listener of listeners) {
      if (event.stopped) break;
      listener.callback(event);
    }
    return event;
  }
  flush() {
    while (this.pending.length) this.pending.shift()!();
  }
  private sync() {
    this.location.href = this.entries[this.index].url;
    this.history.state = this.entries[this.index].state;
  }
  asWindow() { return this as unknown as Window; }
}

test("lobbies have no history entry or unload warning until a match starts", () => {
  const browser = new Browser();
  const guard = new MatchNavigationGuard(browser.asWindow(), () => {});
  guard.setActive(false);
  assert.equal(browser.entries.length, 2);
  assert.equal(browser.dispatch("beforeunload").defaultPrevented, false);
  guard.setActive(true);
  guard.setActive(true);
  assert.equal(browser.entries.length, 3);
  assert.equal(browser.history.state.__NA, true);
  assert.equal(browser.history.state.route, "game");
  assert.equal(browser.dispatch("beforeunload").defaultPrevented, true);
  assert.equal(browser.dispatch("beforeunload").returnValue, true);
  guard.dispose();
});

test("Back restores the match before router and invite listeners can unmount it", () => {
  const browser = new Browser();
  let prompts = 0;
  let routerCalls = 0;
  browser.addEventListener("popstate", () => { routerCalls++; });
  const guard = new MatchNavigationGuard(browser.asWindow(), () => { prompts++; });
  const originalUrl = browser.location.href;
  guard.setActive(true);
  for (let i = 0; i < 3; i++) {
    browser.history.back();
    browser.flush();
    assert.equal(browser.location.href, originalUrl);
    assert.equal(browser.entries.length, 3);
    assert.equal(routerCalls, 0);
    assert.equal(prompts, i + 1);
  }
  assert.equal(browser.dispatch("beforeunload").defaultPrevented, true);
  guard.dispose();
});

test("confirming leave consumes the guard entry once and lets subsequent Back navigate normally", () => {
  const browser = new Browser();
  let closes = 0;
  let routerCalls = 0;
  browser.addEventListener("popstate", () => { routerCalls++; });
  const guard = new MatchNavigationGuard(browser.asWindow(), () => {});
  guard.setActive(true);
  const leave = () => {
    closes++;
    browser.history.replaceState(browser.history.state, "", roomUrl(browser.location.href, null));
  };
  guard.leave(leave);
  guard.leave(leave);
  assert.equal(closes, 0);
  assert.equal(browser.dispatch("beforeunload").defaultPrevented, false);
  browser.flush();
  assert.equal(closes, 1);
  assert.equal(browser.index, 1);
  assert.equal(browser.location.href, "https://example.com/?ref=friend#about");
  assert.equal(routerCalls, 0);
  assert.deepEqual(browser.history.state, { __NA: true, route: "game" });
  browser.history.back();
  browser.flush();
  assert.equal(browser.location.href, "https://example.com/projects");
  assert.equal(routerCalls, 1);
});

test("game over removes the unload warning and replays reuse the history entry", () => {
  const browser = new Browser();
  const guard = new MatchNavigationGuard(browser.asWindow(), () => {});
  guard.setActive(true);
  guard.setActive(false);
  assert.equal(browser.dispatch("beforeunload").defaultPrevented, false);
  guard.setActive(true);
  assert.equal(browser.entries.length, 3);
  assert.equal(browser.dispatch("beforeunload").defaultPrevented, true);
  guard.dispose();
  assert.equal(browser.listeners.length, 0);
  assert.deepEqual(browser.history.state, { __NA: true, route: "game" });
});

test("Back after game over can close directly without a second confirmation", () => {
  const browser = new Browser();
  let closes = 0;
  const guard = new MatchNavigationGuard(browser.asWindow(), () => guard.leave(() => { closes++; }));
  guard.setActive(true);
  guard.setActive(false);
  browser.history.back();
  browser.flush();
  assert.equal(closes, 1);
  assert.equal(browser.index, 1);
  assert.equal(browser.listeners.length, 0);
});

test("leaving a lobby closes immediately without traversing history", () => {
  const browser = new Browser();
  let closes = 0;
  const guard = new MatchNavigationGuard(browser.asWindow(), () => {});
  guard.leave(() => { closes++; });
  assert.equal(closes, 1);
  assert.equal(browser.pending.length, 0);
  assert.equal(browser.entries.length, 2);
});
