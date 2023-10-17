"use client";

import Image from "next/image";
import Link from "next/link";
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
    <main className="flex h-screen w-screen justify-center bg-[url('/images/grass.png')] align-middle font-pokemon-classic text-2xl">
      <div className="flex w-full flex-wrap content-center justify-center">
        <div className="space-y-8">
          <div className="flex justify-center text-8xl">WELCOME</div>
          <div className="flex flex-row gap-10">
            <Link href="/pokedex">
              <Image
                alt="Pokemart"
                className={`hover:scale-110 ${
                  isHoveringMarket ? "scale-110" : "scale-100"
                }`}
                height={150}
                onMouseEnter={() => handleMouseEnter(true)}
                onMouseLeave={() => handleMouseLeave(true)}
                src="/images/Pokemart_Exterior.png"
                width={150}
              />
            </Link>
            <Image
              alt="Pokemart"
              className={`hover:scale-110 ${
                isHoveringPC ? "scale-110" : "scale-100"
              }`}
              height={150}
              onMouseEnter={() => handleMouseEnter(false)}
              onMouseLeave={() => handleMouseLeave(false)}
              src="/images/Pokemon_Center_Exterior.png"
              width={150}
            />
          </div>

          <div className="flex justify-center rounded border-8 border-double border-black bg-white text-4xl	">
            <ul>
              <li> What do you want to do ?</li>
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
                    alt="Pokemart"
                    height={12}
                    src="/images/arrow.png"
                    width={12}
                  />
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
                    alt="Pokemart"
                    height={12}
                    src="/images/arrow.png"
                    width={12}
                  />
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
