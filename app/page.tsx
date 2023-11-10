// eslint-disable-next-line canonical/filename-match-exported
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [isHoveringMarket, setIsHoveringMarket] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHoveringPC, setIsHoveringPC] = useState(false);

  const handleMouseEnter = (market: boolean) => {
    if (market) {
      setIsHoveringMarket(true);
    } else {
      setIsHoveringPC(true);
    }
  };

  const handleMouseLeave = (market: boolean) => {
    if (market) {
      setIsHoveringMarket(false);
    } else {
      setIsHoveringPC(false);
    }
  };

  return (
    <main className="flex h-screen w-screen justify-center bg-[url('/images/grass.png')] align-middle font-pokemon-classic text-2xl">
      <div className="flex w-full flex-wrap content-center justify-center">
        <div className="space-y-8">
          <div className="flex justify-center text-8xl">WELCOME</div>
          <div className="flex flex-row gap-10">
            <Button className="flex h-auto items-center border-0 bg-transparent">
              <Link href="/pokedex">
                <Image
                  alt="Pokemart"
                  className={`hover:scale-110 ${
                    isHoveringMarket ? "scale-110" : "scale-100"
                  }`}
                  height={150}
                  onMouseEnter={() => handleMouseEnter(true)}
                  onMouseLeave={() => handleMouseLeave(true)}
                  priority
                  src="/images/pokemart-exterior.png"
                  width={150}
                />
              </Link>
            </Button>
            <Button
              className="flex h-auto items-center border-0 bg-transparent"
              disabled
            >
              <Link href="/">
                <Image
                  alt="Pokemart"
                  height={150}
                  onMouseEnter={() => handleMouseEnter(false)}
                  onMouseLeave={() => handleMouseLeave(false)}
                  priority
                  src="/images/pokemon-center-exterior.png"
                  width={150}
                />
              </Link>
            </Button>
          </div>

          <div className="flex justify-center rounded border-8 border-double border-black bg-white text-4xl	">
            <ul>
              <li> What do you want to do ?</li>
              <li
                className="group flex flex-wrap items-baseline text-2xl "
                onMouseEnter={() => handleMouseEnter(true)}
                onMouseLeave={() => handleMouseLeave(true)}
              >
                <Link href="/pokedex">
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
                  Check the Pokedex
                </Link>
              </li>
              <li
                className="group flex flex-wrap items-baseline text-2xl "
                onMouseEnter={() => handleMouseEnter(false)}
                onMouseLeave={() => handleMouseLeave(false)}
              >
                <div className="mx-1 pb-px opacity-0">
                  <Image
                    alt="Pokemart"
                    height={12}
                    src="/images/arrow.png"
                    width={12}
                  />
                </div>
                <span className="line-through">Guess all Pokemon</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
