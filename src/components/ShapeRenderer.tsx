import type { ShapeType } from "../types/shape";
import "../styles/shapes.scss";

type Props = {
  type: ShapeType;
};

export default function ShapeRenderer({ type }: Props) {
  return <div className={`shape ${type}`} />;
}
