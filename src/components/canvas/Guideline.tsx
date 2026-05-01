import { cn } from "@/lib/utils";
import { useCanvas } from "./Canvas";
import "./style.css";

export type GuidelineProps = {
  edge: "left" | "right" | "top" | "bottom";
};

export function Guideline({ edge }: GuidelineProps) {
  const { width, height } = useCanvas("Ruler.Guideline");

  const isHorizontal = edge === "top" || edge === "bottom";
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const style = isHorizontal
    ? { width: `${width}px`, height: "1px", left: `-${halfWidth}px` }
    : { width: "1px", height: `${height}px`, top: `-${halfHeight}px` };

  return (
    <div
      style={style}
      className={cn(
        "absolute -z-20 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]",
        {
          horizontal: isHorizontal,
          vertical: !isHorizontal,
          "top-0": edge === "top",
          "bottom-0": edge === "bottom",
          "left-0": edge === "left",
          "right-0": edge === "right",
        },
      )}
    />
  );
}
