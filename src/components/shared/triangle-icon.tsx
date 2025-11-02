import { cn } from "@/lib/utils";
import Image from "next/image";

type TriangleIconProps = {
  className: string;
};

export const TriangleIcon = ({ className }: TriangleIconProps) => {
  return (
    <Image
      src="/triangle.svg"
      alt="triangle svg icon"
      height={12}
      width={12}
      className={cn(className)}
    />
  );
};
