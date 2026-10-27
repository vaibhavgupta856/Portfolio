"use client";

import { useState } from "react";
import Image from "next/image";
import { getAvatarUrl } from "@/lib/avatar";
import { cn } from "@/lib/utils";

export function PlayerAvatar({
  name,
  color,
  avatar,
  className,
}: {
  name: string;
  color: string;
  avatar?: string;
  className?: string;
}) {
  const [failedAvatar, setFailedAvatar] = useState<string | null>(null);
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-full border-2 font-bold text-[color:var(--game-avatar-ink)] [&_img]:block [&_img]:size-full [&_img]:object-cover",
        className,
      )}
      style={{ backgroundColor: color, borderColor: color }}
    >
      {avatar && failedAvatar !== avatar ? (
        <Image
          src={getAvatarUrl(encodeURIComponent(avatar))}
          alt=""
          width={36}
          height={36}
          unoptimized
          draggable={false}
          onError={() => setFailedAvatar(avatar)}
        />
      ) : (
        <span aria-hidden="true">{name.slice(0, 1).toUpperCase()}</span>
      )}
    </span>
  );
}
