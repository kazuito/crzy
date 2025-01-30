"use client";

import { getStorageColors, getStorageFps } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [play, setPlay] = useState(true);
  const colors = getStorageColors();
  const fps = getStorageFps();
  const [colorIndex, setColorIndex] = useState(0);

  const currentColor = colors[colorIndex];

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!play) return;
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [colors.length, play]);

  useEffect(() => {
    const handleKeyDown = () => {
      setPlay(false);
      router.push("/settings");
    };
    const handleClick = () => {
      setPlay(false);
      router.push("/settings");
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <main className="">
      <div
        className="w-[100dvw] h-[100dvh]"
        style={{
          backgroundColor: currentColor.toString("css"),
        }}
      />
    </main>
  );
}
