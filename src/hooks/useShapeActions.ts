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

function rotateTargetsInGrid(
  items: ShapeItem[],
  direction: "left" | "right"
): ShapeItem[] {
  if (items.length !== 6) {
    return items;
  }
  const ring = [0, 1, 2, 5, 4, 3];
  const next = [...items];
  if (direction === "left") {
    for (let i = 0; i < ring.length; i++) {
      const currentIndex = ring[i];
      const nextIndex = ring[(i + 1) % ring.length];
      next[currentIndex] = items[nextIndex];
    }
    return next;
  }
  for (let i = 0; i < ring.length; i++) {
    const currentIndex = ring[i];
    const prevIndex = ring[(i - 1 + ring.length) % ring.length];
    next[currentIndex] = items[prevIndex];
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
    setTargetShapes((prev) => rotateTargetsInGrid(prev, "left"));
  };
  const handleMovePosition = () => {
    setTargetShapes((prev) => swapRows(prev));
  };
  const handleMoveShapeRight = () => {
    setTargetShapes((prev) => rotateTargetsInGrid(prev, "right"));
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