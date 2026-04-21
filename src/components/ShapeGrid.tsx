import { useTranslation } from "react-i18next";
import { controlShapes } from "../data/shapes";
import type { ShapeItem } from "../types/shape";
import ShapeRenderer from "./ShapeRenderer";

type Props = {
  targetShapes: ShapeItem[];
  onMoveShapeLeft: () => void;
  onMovePosition: () => void;
  onMoveShapeRight: () => void;
  onRandomizePositions: () => void;
};

export default function ShapeGrid({
  targetShapes,
  onMoveShapeLeft,
  onMovePosition,
  onMoveShapeRight,
  onRandomizePositions,
}: Props) {
  const { t } = useTranslation();

  const [
    topLeft,
    topCenter,
    topRight,
    bottomLeft,
    bottomCenter,
    bottomRight,
  ] = targetShapes;

  return (
    <div className="shape-layout">
      <div className="shape-top-row">
        <button type="button" className="shape-panel shape-panel-single" onClick={onMoveShapeLeft}>
          <ShapeRenderer type={controlShapes.left} />
          <span className="shape-panel-action">{t("moveShape")}</span>
        </button>

        <button type="button" className="shape-panel shape-panel-wide" onClick={onMovePosition}>
          <div className="shape-panel-duo">
            <ShapeRenderer type={controlShapes.center[0]} />
            <ShapeRenderer type={controlShapes.center[1]} />
          </div>
          <span className="shape-panel-action">{t("movePosition")}</span>
        </button>

        <button type="button" className="shape-panel shape-panel-single" onClick={onMoveShapeRight}>
          <ShapeRenderer type={controlShapes.right} />
          <span className="shape-panel-action">{t("moveShape")}</span>
        </button>
      </div>

      <div className="shape-layout-divider" />

      <div className="shape-mid-row">
        {topLeft && (
          <button
            type="button"
            className="shape-panel shape-panel-target"
            aria-label={topLeft.type}
            onClick={onRandomizePositions}
          >
            <ShapeRenderer type={topLeft.type} />
          </button>
        )}

        {topCenter && (
          <button
            type="button"
            className="shape-panel shape-panel-target"
            aria-label={topCenter.type}
            onClick={onRandomizePositions}
          >
            <ShapeRenderer type={topCenter.type} />
          </button>
        )}

        {topRight && (
          <button
            type="button"
            className="shape-panel shape-panel-target"
            aria-label={topRight.type}
            onClick={onRandomizePositions}
          >
            <ShapeRenderer type={topRight.type} />
          </button>
        )}
      </div>

      <div className="shape-bottom-row">
        {bottomLeft && (
          <button
            type="button"
            className="shape-panel shape-panel-target"
            aria-label={bottomLeft.type}
            onClick={onRandomizePositions}
          >
            <ShapeRenderer type={bottomLeft.type} />
          </button>
        )}

        {bottomCenter && (
          <button
            type="button"
            className="shape-panel shape-panel-target"
            aria-label={bottomCenter.type}
            onClick={onRandomizePositions}
          >
            <ShapeRenderer type={bottomCenter.type} />
          </button>
        )}

        {bottomRight && (
          <button
            type="button"
            className="shape-panel shape-panel-target"
            aria-label={bottomRight.type}
            onClick={onRandomizePositions}
          >
            <ShapeRenderer type={bottomRight.type} />
          </button>
        )}
      </div>
    </div>
  );
}
