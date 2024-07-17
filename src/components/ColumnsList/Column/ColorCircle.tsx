"use client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

type ColorCircleProps = {
  defaultColor: string;
  changeColumnColor: (color: string) => Promise<{ error: string } | undefined>;
};

function ColorCircle({ changeColumnColor, defaultColor }: ColorCircleProps) {
  const solids = [
    "#1FA2FF",
    "#9400D3",
    "#c84e89",
    "#00F5A0",
    "#F7941E",
    "#72C6EF",
    "#FD8112",
    "#bf5ae0",
    "#fbed96",
    "#FFE000",
    "#F7F8F8",
    "#00416A",
    "#334d50",
    "#0052D4",
    "#5433FF",
    "#799F0C",
    "#ffe259",
    "#acb6e5",
    "#536976",
    "#B79891",
    "#9796f0",
    "#BBD2C5",
    "#076585",
    "#00467F",
    "#fc00ff",
    "#1488CC",
    "#ec008c",
    "#cc2b5e",
    "#e65c00",
    "#2b5876",
    "#314755",
    "#77A1D3",
    "#ff6e7f",
    "#e52d27",
    "#603813",
  ];
  const [color, setColor] = useState(defaultColor);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="size-7 inline-block rounded-full"
          style={{ backgroundColor: color }}
        ></button>
      </PopoverTrigger>
      <PopoverContent
        className="flex flex-wrap justify-evenly gap-1 mt-0 w-56"
        onCloseAutoFocus={async () => {
          await changeColumnColor(color);
        }}
      >
        {solids.map((s) => (
          <button
            key={s}
            style={{ background: s }}
            className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
            onClick={() => setColor(s)}
          />
        ))}
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="bg-transparent border border-font-secondary-color rounded-md w-full mt-3 p-1 active:border-font-primary-color"
        ></input>
      </PopoverContent>
    </Popover>
  );
}

export { ColorCircle };
