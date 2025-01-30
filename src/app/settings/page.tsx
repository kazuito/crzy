"use client";

import MyColorPicker from "@/components/color-picker";
import { cn, getStorageColors, getStorageFps } from "@/lib/utils";
import { Button, ButtonGroup, Input } from "@heroui/react";
import { GithubIcon, PlusIcon, ShareIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Color, parseColor } from "react-aria-components";

const Page = () => {
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [colors, setColors] = useState<Color[] | null>(null);
  const [fps, setFps] = useState<number | null>(null);

  const activeColor = colors?.[activeColorIndex];

  const removeColor = (index: number) => {
    if (!colors) return;
    setColors(colors.filter((_, i) => i !== index));
    setActiveColorIndex(Math.min(activeColorIndex, colors.length - 2));
  };

  const addColor = () => {
    if (!colors) return;
    setColors([...colors, parseColor("#000")]);
    setActiveColorIndex(colors.length);
  };

  useEffect(() => {
    setColors(getStorageColors());
    setFps(getStorageFps());
  }, []);

  useEffect(() => {
    if (colors === null) return;
    localStorage.setItem(
      "colors",
      JSON.stringify(colors.map((color) => color.toString("hsla")))
    );
  }, [colors]);

  useEffect(() => {
    if (fps === null) return;
    localStorage.setItem("fps", fps.toString());
  }, [fps]);

  return (
    <div className="pt-6 sm:pt-10 bg-black min-h-[100dvh]">
      <div className="mx-auto max-w-lg">
        <div className="text-white px-5 sm:px-0 items-center justify-between font-semibold flex">
          <Link href="" className="text-lg">
            CRZY
          </Link>
          <Button
            isIconOnly
            variant="light"
            className="text-neutral-600 hover:text-white"
            as="a"
            target="_blank"
            href="https://github.com/kazuito/crzy"
          >
            <GithubIcon size={20} strokeWidth={2.4} />
          </Button>
        </div>
        <div className="sm:border border-neutral-800 p-6 rounded-3xl sm:mt-6">
          <div className="flex flex-wrap gap-1.5">
            {colors?.map((color, i) => {
              const isActive = i === activeColorIndex;
              return (
                <button
                  key={i}
                  className={cn(
                    "size-8 rounded-xl transition-all active:scale-95",
                    isActive && "scale-110"
                  )}
                  style={{
                    backgroundColor: color.toString("css"),
                    boxShadow: `inset 0 0 0 4px #ffffff${
                      isActive ? "ff" : "44"
                    }`,
                  }}
                  onClick={() =>
                    setActiveColorIndex((prev) => (prev === i ? -1 : i))
                  }
                ></button>
              );
            })}
            <button
              className="size-8 rounded-xl grid place-content-center text-neutral-500 opacity-50 hover:opacity-100 hover:transition"
              style={{
                boxShadow: `0 0 0 4px inset rgba(255,255,255,0.4)`,
              }}
              onClick={addColor}
            >
              <PlusIcon size={14} strokeWidth={4} />
            </button>
          </div>
          <div
            className={cn("mt-4", activeColorIndex === -1 ? "hidden" : "block")}
          >
            <MyColorPicker
              color={activeColor}
              setColor={(newColor) => {
                if (!colors) return;
                const newColors = [...colors];
                newColors[activeColorIndex] = newColor;
                setColors(newColors);
              }}
              removeColor={() => removeColor(activeColorIndex)}
            />
          </div>
          <div className="mt-6 flex gap-6">
            <Input
              type="number"
              value={fps?.toString()}
              onChange={(e) => setFps(Number(e.target.value))}
              endContent={<span className="text-neutral-400 text-sm">fps</span>}
            />
            <div className="flex gap-2">
              <ButtonGroup>
                <Button isIconOnly variant="flat" color="primary">
                  <ShareIcon size={14} />
                </Button>
                <Button variant="solid" color="primary" as={Link} href="/">
                  Play
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
