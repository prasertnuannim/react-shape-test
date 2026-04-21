import { Card } from "antd";
import type { ShapeItem } from "../types/shape";
import ShapeRenderer from "./ShapeRenderer";

type Props = {
  shape: ShapeItem;
  onClick: () => void;
};

export default function ShapeCard({ shape, onClick }: Props) {
  return (
    <Card hoverable className="shape-card" onClick={onClick}>
      <div className="shape-card-inner">
        <ShapeRenderer type={shape.type} />
      </div>
    </Card>
  );
}
