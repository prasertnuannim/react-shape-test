import { useTranslation } from "react-i18next";
import type { ShapeItem, ShapeType } from "../types/shape";
import "../styles/shapes.scss";

const controlShapes: {
  left: ShapeType;
  center: [ShapeType, ShapeType];
  right: ShapeType;
} = {
  left: "triangle-left",
  center: ["triangle-up", "triangle-down"],
  right: "triangle-right",
};

type Props = {
  targetShapes: ShapeItem[];
  onMoveShapeLeft: () => void;
  onMovePosition: () => void;
  onMoveShapeRight: () => void;
  onRandomizePositions: () => void;
};

function renderShape(type: ShapeType) {
  return <div className={`shape ${type}`} />;
}

export default function ShapeGrid({
  targetShapes,
  onMoveShapeLeft,
  onMovePosition,
  onMoveShapeRight,
  onRandomizePositions,
}: Props) {
  const { t } = useTranslation();
  const controlButtons = [
    {
      key: "left",
      className: "shape-panel shape-panel-single",
      label: t("moveShape"),
      onClick: onMoveShapeLeft,
      content: renderShape(controlShapes.left),
    },
    {
      key: "center",
      className: "shape-panel shape-panel-wide",
      label: t("movePosition"),
      onClick: onMovePosition,
      content: (
        <div className="shape-panel-duo">
          {renderShape(controlShapes.center[0])}
          {renderShape(controlShapes.center[1])}
        </div>
      ),
    },
    {
      key: "right",
      className: "shape-panel shape-panel-single",
      label: t("moveShape"),
      onClick: onMoveShapeRight,
      content: renderShape(controlShapes.right),
    },
  ] as const;
  const targetRows = [
    { className: "shape-mid-row", items: targetShapes.slice(0, 3) },
    { className: "shape-bottom-row", items: targetShapes.slice(3, 6) },
  ] as const;

  return (
    <div className="shape-layout">
      <div className="shape-top-row">
        {controlButtons.map((button) => (
          <button key={button.key} type="button" className={button.className} onClick={button.onClick}>
            {button.content}
            <span className="shape-panel-action">{button.label}</span>
          </button>
        ))}
      </div>

      <div className="shape-layout-divider" />

      {targetRows.map((row) => (
        <div key={row.className} className={row.className}>
          {row.items.map((shape) => (
            <button
              key={shape.id}
              type="button"
              className="shape-panel shape-panel-target"
              aria-label={shape.type}
              onClick={onRandomizePositions}
            >
              {renderShape(shape.type)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
