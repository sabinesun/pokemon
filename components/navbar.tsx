import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";

export const Navbar = () => {
  return (
    <div className="flex flex-wrap items-center justify-between p-2 md:p-4">
      <h1 className="text-6xl">MY POKEDEX</h1>
      <Link href="/">
        <Button className="p-2"> Back </Button>
      </Link>
    </div>
  );
};
