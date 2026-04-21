export type ShapeType =
  | "triangle-up"
  | "triangle-down"
  | "triangle-left"
  | "triangle-right"
  | "square"
  | "rectangle"
  | "circle"
  | "oval"
  | "trapezoid"
  | "parallelogram";

export interface ShapeItem {
  id: number;
  type: ShapeType;
}
