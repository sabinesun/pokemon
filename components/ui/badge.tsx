import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded border-black text-white border h-5 px-2.5  uppercase  transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        bug: " bg-[#A6B91A]",
        dark: "  bg-[#705746]",
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        dragon: "bg-[#705746]",
        electric: "bg-[#F7D02C]",
        fairy: "bg-[#D685AD]",
        fighting: "bg-[#C22E28]",
        fire: "bg-[#EE8130]",
        flying: "bg-[#A98FF3]",
        ghost: "bg-[#735797]",
        grass: "bg-[#7AC74C]",
        ground: "bg-[#E2BF65]",
        ice: "bg-[#96D9D6]",
        normal: "bg-[#A8A77A]",
        poison: "bg-[#A33EA1]",
        psychic: "bg-[#F95587]",
        rock: "bg-[#B6A136]",
        steel: "bg-[#B7B7CE]",
        water: "bg-[#6390F0]",
      },
    },
  },
);

export type BadgeProps = {} & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export { Badge, badgeVariants };
