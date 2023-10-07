"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isHoveringMarket, setIsHoveringMarket] = useState(false);
  const [isHoveringPC, setIsHoveringPC] = useState(false);

  const handleMouseEnter = (market: boolean) => {
    market ? setIsHoveringMarket(true) : setIsHoveringPC(true);
  };
  const handleMouseLeave = (market: boolean) => {
    market ? setIsHoveringMarket(false) : setIsHoveringPC(false);
  };
  return (
    <main className="flex h-screen w-screen	justify-center overflow-hidden bg-[url('/images/grass.png')] align-middle font-pokemon-classic">
      <div className="flex w-full flex-wrap content-center justify-center">
        <div className="space-y-8">
          <div className="flex justify-center text-8xl">WELCOME</div>
          <div className="flex flex-row gap-10">
            <Image
              src={"/images/Pokemart_Exterior.png"}
              alt={"Pokemart"}
              width={150}
              height={150}
              className={`hover:scale-110 ${
                isHoveringMarket ? "scale-110" : "scale-100"
              }`}
              onMouseEnter={() => handleMouseEnter(true)}
              onMouseLeave={() => handleMouseLeave(true)}
            ></Image>
            <Image
              src={"/images/Pokemon_Center_Exterior.png"}
              alt={"Pokemart"}
              width={150}
              height={150}
              className={`hover:scale-110 ${
                isHoveringPC ? "scale-110" : "scale-100"
              }`}
              onMouseEnter={() => handleMouseEnter(false)}
              onMouseLeave={() => handleMouseLeave(false)}
            ></Image>
          </div>

          <div className="flex justify-center rounded border-8 border-double border-black bg-white text-4xl	">
            <ul>
              <li> What do you want to do ? </li>
              <li
                className="group flex flex-wrap items-baseline text-2xl "
                onMouseEnter={() => handleMouseEnter(true)}
                onMouseLeave={() => handleMouseLeave(true)}
              >
                <div
                  className={`mx-1 pb-px group-hover:opacity-100 ${
                    isHoveringMarket ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={"/images/arrow.png"}
                    alt={"Pokemart"}
                    width={12}
                    height={12}
                  ></Image>
                </div>
                Check the Pokedex{" "}
              </li>
              <li
                className="group flex flex-wrap items-baseline text-2xl "
                onMouseEnter={() => handleMouseEnter(false)}
                onMouseLeave={() => handleMouseLeave(false)}
              >
                <div
                  className={`mx-1 pb-px group-hover:opacity-100 ${
                    isHoveringPC ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={"/images/arrow.png"}
                    alt={"Pokemart"}
                    width={12}
                    height={12}
                  ></Image>
                </div>
                Guess all Pokemon{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
