import { useState } from "react";
import type { ShapeItem } from "../types/shape";

const initialTargetShapes: ShapeItem[] = [
  { id: 1, type: "square" },
  { id: 2, type: "circle" },
  { id: 3, type: "oval" },
  { id: 4, type: "trapezoid" },
  { id: 5, type: "rectangle" },
  { id: 6, type: "parallelogram" },
];

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function rotateTargets(items: ShapeItem[], direction: "left" | "right"): ShapeItem[] {
  if (items.length < 2) {
    return items;
  }

  const next = [...items];

  if (direction === "left") {
    const first = next.shift();
    if (first) {
      next.push(first);
    }
    return next;
  }

  const last = next.pop();
  if (last) {
    next.unshift(last);
  }

  return next;
}

function swapRows(items: ShapeItem[]): ShapeItem[] {
  if (items.length < 6) {
    return items;
  }

  return [...items.slice(3, 6), ...items.slice(0, 3)];
}

export function useShapeActions() {
  const [targetShapes, setTargetShapes] = useState<ShapeItem[]>(initialTargetShapes);

  const handleMoveShapeLeft = () => {
    setTargetShapes((prev) => rotateTargets(prev, "left"));
  };

  const handleMovePosition = () => {
    setTargetShapes((prev) => swapRows(prev));
  };

  const handleMoveShapeRight = () => {
    setTargetShapes((prev) => rotateTargets(prev, "right"));
  };

  const handleRandomizePositions = () => {
    setTargetShapes((prev) => shuffleArray(prev));
  };

  return {
    targetShapes,
    handleMoveShapeLeft,
    handleMovePosition,
    handleMoveShapeRight,
    handleRandomizePositions,
  };
}
