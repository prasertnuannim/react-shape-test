import type { ShapeType } from "../types/shape";

export function rotateShapeLeft(type: ShapeType): ShapeType {
  switch (type) {
    case "triangle-up":
      return "triangle-left";
    case "triangle-left":
      return "triangle-down";
    case "triangle-down":
      return "triangle-right";
    case "triangle-right":
      return "triangle-up";
    default:
      return type;
  }
}
