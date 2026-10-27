const HISTORY_KEY = "portfolioGameNavigationGuard";

export class MatchNavigationGuard {
  private token = crypto.randomUUID();
  private active = false;
  private installed = false;
  private disposed = false;
  private gameUrl = "";
  private gameState: Record<string, unknown> = {};
  private leaving: (() => void) | null = null;

  constructor(private browser: Window, private onBack: () => void) {}

  setActive(active: boolean) {
    if (this.disposed) return;
    if (active && !this.installed) {
      this.gameUrl = this.browser.location.href;
      this.gameState = { ...this.browser.history.state };
      delete this.gameState[HISTORY_KEY];
      this.browser.history.pushState({ ...this.gameState, [HISTORY_KEY]: this.token }, "", this.gameUrl);
      // Run before the router and invite-link listeners can unmount the match.
      this.browser.addEventListener("popstate", this.onPopState, true);
      this.installed = true;
    }
    if (active && !this.active) this.browser.addEventListener("beforeunload", this.onBeforeUnload);
    else if (!active && this.active) this.browser.removeEventListener("beforeunload", this.onBeforeUnload);
    this.active = active;
  }

  leave(onLeave: () => void) {
    if (this.leaving) return;
    this.setActive(false);
    if (this.installed && this.browser.history.state?.[HISTORY_KEY] === this.token) {
      this.leaving = onLeave;
      // Consume our duplicate entry before closing so Back does not reopen the invite.
      this.browser.history.back();
    } else {
      this.dispose();
      onLeave();
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.browser.removeEventListener("beforeunload", this.onBeforeUnload);
    this.browser.removeEventListener("popstate", this.onPopState, true);
    if (this.browser.history.state?.[HISTORY_KEY] === this.token) {
      const state = { ...this.browser.history.state };
      delete state[HISTORY_KEY];
      this.browser.history.replaceState(state, "", this.browser.location.href);
    }
  }

  private onBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = true;
  };

  private onPopState = (event: PopStateEvent) => {
    event.stopImmediatePropagation();
    if (this.leaving) {
      const onLeave = this.leaving;
      this.leaving = null;
      this.browser.history.replaceState(this.gameState, "", this.gameUrl);
      this.dispose();
      onLeave();
      return;
    }
    if (this.browser.history.state?.[HISTORY_KEY] === this.token) return;
    this.browser.history.pushState({ ...this.gameState, [HISTORY_KEY]: this.token }, "", this.gameUrl);
    this.onBack();
  };
}
