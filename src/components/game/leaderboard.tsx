"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RefreshCw, X } from "lucide-react";
import type { Socket } from "socket.io-client";
import { cn } from "@/lib/utils";
import { gameTheme } from "./game-theme";
import { formatDuration, formatPlayed } from "./leaderboard-format";
import { PlayerAvatar } from "./player-avatar";
import type {
  Leaderboard,
  LeaderboardEntry,
  LeaderboardPeriod,
  LeaderboardReply,
} from "./protocol";

export function LeaderboardDialog({
  socket,
  onClose,
}: {
  socket: Socket;
  onClose: () => void;
}) {
  const [period, setPeriod] = useState<LeaderboardPeriod>("all");
  const [data, setData] = useState<Leaderboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const request = useRef(0);
  const inFlight = useRef(false);
  const refreshAgain = useRef(false);

  const load = useCallback(
    function fetchLeaderboard() {
      if (inFlight.current) {
        refreshAgain.current = true;
        return;
      }
      const id = ++request.current;
      if (!socket.connected) {
        setError("You're offline. Reconnect to see the leaderboard.");
        setLoading(false);
        return;
      }
      inFlight.current = true;
      setLoading(true);
      setError(null);
      socket
        .timeout(10_000)
        .emit(
          "game:leaderboard",
          { period },
          (timeout: Error | null, result: LeaderboardReply) => {
            if (request.current !== id) return;
            inFlight.current = false;
            setLoading(false);
            if (timeout || !result)
              setError("The leaderboard didn't respond. Try again.");
            else if ("error" in result) setError(result.error);
            else setData(result.data);
            if (refreshAgain.current) {
              refreshAgain.current = false;
              fetchLeaderboard();
            }
          },
        );
    },
    [socket, period],
  );

  useEffect(() => {
    inFlight.current = false;
    refreshAgain.current = false;
    setData(null);
    load();
    const offline = () => {
      request.current++;
      inFlight.current = false;
      refreshAgain.current = false;
      setError("You're offline. Reconnect to see the leaderboard.");
      setLoading(false);
    };
    socket.on("connect", load);
    socket.on("game:joined", load);
    socket.on("disconnect", offline);
    socket.on("game:leaderboard-updated", load);
    const invalidate = () => {
      request.current++;
    };
    return () => {
      invalidate();
      socket.off("connect", load);
      socket.off("game:joined", load);
      socket.off("disconnect", offline);
      socket.off("game:leaderboard-updated", load);
    };
  }, [socket, load]);

  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[10000] bg-black/70" />
        <Dialog.Content
          className={cn(
            gameTheme,
            "fixed left-1/2 top-1/2 z-[10001] flex max-h-[min(calc(100dvh-2rem),720px)] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-[color:var(--game-surface)] font-sans text-[color:var(--game-text)] focus:outline-none",
          )}
          data-lenis-prevent
          data-no-custom-cursor="true"
        >
          <div className="shrink-0 px-4 pt-3">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-base font-semibold">
                Leaderboards
              </Dialog.Title>
              <Dialog.Close
                aria-label="Close leaderboard"
                className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">
              Top 20 runs, ranked by wave, then score. Ties go to the earlier
              run.
              {period === "week" && " This week starts Monday at 00:00 UTC."}
            </Dialog.Description>
            <div className="mt-1 flex items-center gap-3 border-b border-white/10">
              {(
                [
                  ["all", "All time"],
                  ["week", "This week"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPeriod(value)}
                  aria-pressed={period === value}
                  className={cn(
                    "min-h-11 cursor-pointer border-b-2 px-1 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white",
                    period === value
                      ? "border-zinc-100 text-zinc-100"
                      : "border-transparent text-zinc-400 hover:text-zinc-100",
                  )}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={load}
                disabled={loading}
                aria-label="Refresh leaderboard"
                className="-mr-2 ml-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-40"
              >
                <RefreshCw
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4",
                    loading && "animate-spin motion-reduce:animate-none",
                  )}
                />
              </button>
            </div>
          </div>

          <div
            className="min-h-0 overflow-y-auto overscroll-contain px-4 pb-4"
            aria-busy={loading}
          >
            {error ? (
              <div role="alert" className="py-6 text-center">
                <p className="text-sm text-rose-300">{error}</p>
                <button
                  type="button"
                  onClick={load}
                  disabled={loading}
                  className="mt-3 min-h-11 cursor-pointer rounded border border-white/20 px-4 text-sm transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-40"
                >
                  Try again
                </button>
              </div>
            ) : loading && !data ? (
              <p
                role="status"
                className="py-6 text-center text-sm text-zinc-400"
              >
                Loading leaderboard…
              </p>
            ) : (
              data && (
                <>
                  {data.entries.length === 0 ? (
                    <p className="py-6 text-center text-sm text-zinc-400">
                      {period === "week"
                        ? "No runs this week yet."
                        : "No runs yet."}
                    </p>
                  ) : (
                    <table className="w-full table-fixed text-sm">
                      <caption className="sr-only">
                        Top 20 runs{" "}
                        {period === "week" ? "this week" : "of all time"}
                      </caption>
                      <thead className="sticky top-0 z-10 bg-[color:var(--game-surface)] text-left text-xs text-zinc-400">
                        <tr className="border-b border-white/10">
                          <th scope="col" className="w-7 py-2 font-normal">
                            <span aria-hidden="true">#</span>
                            <span className="sr-only">Rank</span>
                          </th>
                          <th scope="col" className="py-2 pr-2 font-normal">
                            Players
                          </th>
                          <th scope="col" className="w-12 py-2 text-right font-normal">
                            Wave
                          </th>
                          <th scope="col" className="w-16 py-2 text-right font-normal sm:w-20">
                            Score
                          </th>
                          <th scope="col" className="hidden w-20 py-2 text-right font-normal sm:table-cell">
                            Time
                          </th>
                          <th scope="col" className="hidden w-24 py-2 text-right font-normal sm:table-cell">
                            Played
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.entries.map((entry, i) => (
                          <RunRow key={entry.id} entry={entry} rank={i + 1} />
                        ))}
                      </tbody>
                    </table>
                  )}
                  {data.personalBest &&
                    !data.entries.some(
                      (entry) => entry.id === data.personalBest?.id,
                    ) && (
                      <p className="mt-3 border-t border-white/10 pt-3 text-sm text-zinc-400">
                        Your best:{" "}
                        <span className="tabular-nums text-zinc-100">
                          Wave {data.personalBest.wave} ·{" "}
                          {data.personalBest.score.toLocaleString()} pts
                        </span>{" "}
                        <span className="tabular-nums">
                          · {formatDuration(data.personalBest.duration)} ·{" "}
                          {formatPlayed(data.personalBest.endedAt)}
                        </span>
                      </p>
                    )}
                </>
              )
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function RunRow({ entry, rank }: { entry: LeaderboardEntry; rank: number }) {
  const mine = entry.players.some((p) => p.me);
  const names = entry.players.map((p) => p.name).join(", ");
  const played = new Date(entry.endedAt).toLocaleString();
  const duration = formatDuration(entry.duration);
  const ago = formatPlayed(entry.endedAt);
  return (
    <tr
      className={cn(
        "border-b border-white/10 last:border-0",
        mine && "bg-white/[0.04]",
      )}
    >
      <td className="py-2 tabular-nums text-zinc-400">{rank}</td>
      <td className="py-2 pr-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex shrink-0 -space-x-2">
            {entry.players.map((p, i) => (
              <PlayerAvatar
                key={i}
                name={p.name}
                color={p.color}
                avatar={p.avatar}
                className="size-7 text-xs ring-2 ring-[color:var(--game-surface)]"
              />
            ))}
          </div>
          <div className="min-w-0">
            <p className="truncate" title={names}>
              {entry.players.map((p, i) => (
                <span key={i}>
                  {i > 0 && ", "}
                  {p.name}
                  {p.me && <span className="text-zinc-400"> (you)</span>}
                </span>
              ))}
            </p>
            <p className="truncate text-xs tabular-nums text-zinc-400 sm:hidden">
              {duration} · <time dateTime={entry.endedAt} title={played}>{ago}</time>
            </p>
          </div>
        </div>
      </td>
      <td className="py-2 text-right tabular-nums">{entry.wave}</td>
      <td className="py-2 text-right tabular-nums">
        {entry.score.toLocaleString()}
      </td>
      <td className="hidden py-2 text-right tabular-nums text-zinc-400 sm:table-cell">
        {duration}
      </td>
      <td className="hidden py-2 text-right text-zinc-400 sm:table-cell">
        <time dateTime={entry.endedAt} title={played}>{ago}</time>
      </td>
    </tr>
  );
}
