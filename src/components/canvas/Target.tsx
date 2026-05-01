import { cn } from "@/lib/utils";
import { useRuler } from "./Ruler";

export type TargetProps = {
  edge: "left" | "top" | "right" | "bottom";
};

export function Target({ edge }: TargetProps) {
  const { width, height } = useRuler("Ruler.Target");
  const isHorizontal = edge === "top" || edge === "bottom";

  if (isHorizontal) {
    return (
      <span
        className={cn(
          "absolute left-0 flex w-full items-center border-l-2 border-r-2 border-l-red-300 border-r-red-300 text-center font-mono text-xs font-normal text-red-300",
          {
            "bottom-full": edge === "top",
            "top-full": edge === "bottom",
          },
        )}
      >
        <hr className="h-px grow border-0 bg-red-300" />
        <span className="mx-2 leading-3">{width}px</span>
        <hr className="h-px grow border-0 bg-red-300" />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "absolute flex h-full w-4 flex-col items-center border-b-2 border-t-2 border-b-red-300 border-t-red-300 text-center font-mono text-xs font-normal",
        {
          "-left-4": edge === "left",
          "-right-4": edge === "right",
        },
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <hr className="h-full w-px border-0 bg-red-300" />
        <span
          className={cn("absolute text-red-300", {
            "-left-10": edge === "left",
            "-right-10": edge === "right",
          })}
        >
          {height}px
        </span>
      </div>
    </span>
  );
}
