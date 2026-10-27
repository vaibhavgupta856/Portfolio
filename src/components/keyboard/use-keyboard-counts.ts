"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import { SocketContext } from "@/contexts/socketio";
import { SKILLS } from "@/data/constants";
import { mergeKeyboardCounts } from "./wear";

const skills = new Set(Object.values(SKILLS).map(skill => skill.name));
const sequences = new WeakMap<Socket, number>();

export function useKeyboardCounts() {
  const { socket } = useContext(SocketContext);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (!socket) return;
    let synced = false;
    let lastSync = 0;
    const receive = (incoming: Record<string, unknown>) => {
      if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) return;
      setCounts(previous => mergeKeyboardCounts(previous, incoming, skills));
      synced = true;
      lastSync = Date.now();
      setAvailable(true);
    };
    const update = (data: { skill: string; count: number }) => {
      if (data && skills.has(data.skill)) {
        setCounts(previous => mergeKeyboardCounts(previous, { [data.skill]: data.count }, skills));
      }
    };
    const sync = () => {
      if (socket.connected) socket.volatile.emit("keyboard:sync");
    };
    const disconnect = () => { synced = false; setAvailable(false); };
    socket.on("keyboard:counts", receive);
    socket.on("keyboard:count", update);
    socket.on("connect", sync);
    socket.on("disconnect", disconnect);
    sync();
    // Handlers are registered after the server resolves the visitor's session.
    const timer = setInterval(() => {
      if (!synced || Date.now() - lastSync >= 30_000) sync();
    }, 3_000);
    return () => {
      clearInterval(timer);
      socket.off("keyboard:counts", receive);
      socket.off("keyboard:count", update);
      socket.off("connect", sync);
      socket.off("disconnect", disconnect);
    };
  }, [socket]);

  const recordPress = useCallback((skill: string) => {
    if (!socket?.connected || !available || !skills.has(skill)) return;
    const sequence = (sequences.get(socket) ?? 0) + 1;
    sequences.set(socket, sequence);
    // Never replay offline input as fresh presses on reconnect.
    socket.volatile.emit("keyboard:press", { skill, sequence });
  }, [socket, available]);

  return { counts, total: Object.values(counts).reduce((sum, count) => sum + count, 0), available, recordPress };
}
