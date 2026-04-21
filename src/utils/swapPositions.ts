import type { ShapeItem } from "../types/shape";

export function swapGridPositions(items: ShapeItem[]): ShapeItem[] {
  const arr = [...items];

  // Layout หน้า shape แบ่งเป็น:
  // ซ้ายบน 1 / กลางบน 2 / ขวาบน 1 / แถวกลาง 3 / แถวล่าง 3
  if (arr.length < 10) return arr;

  const left = arr.slice(0, 1);
  const center = arr.slice(1, 3);
  const right = arr.slice(3, 4);
  const middle = arr.slice(4, 7);
  const bottom = arr.slice(7, 10);

  return [...right, ...center, ...left, ...bottom, ...middle];
}
