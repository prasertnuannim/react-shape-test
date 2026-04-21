import type { ShapeItem, ShapeType } from "../types/shape";

export const controlShapes: {
  left: ShapeType;
  center: [ShapeType, ShapeType];
  right: ShapeType;
} = {
  left: "triangle-left",
  center: ["triangle-up", "triangle-down"],
  right: "triangle-right",
};

export const initialTargetShapes: ShapeItem[] = [
  { id: 1, type: "square" },
  { id: 2, type: "circle" },
  { id: 3, type: "oval" },
  { id: 4, type: "trapezoid" },
  { id: 5, type: "rectangle" },
  { id: 6, type: "parallelogram" },
];
