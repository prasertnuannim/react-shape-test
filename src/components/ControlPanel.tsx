import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

type Props = {
  onMoveShape: () => void;
  onMovePosition: () => void;
  onShuffleAll: () => void;
};

export default function ControlPanel({
  onMoveShape,
  onMovePosition,
  onShuffleAll,
}: Props) {
  const { t } = useTranslation();

  return (
    <Flex justify="center" align="center" wrap="wrap" gap={12} className="control-panel">
      <Button type="primary" size="large" onClick={onMoveShape}>
        {t("moveShape")}
      </Button>

      <Button size="large" onClick={onMovePosition}>
        {t("movePosition")}
      </Button>

      <Button size="large" onClick={onShuffleAll}>
        {t("randomPosition")}
      </Button>
    </Flex>
  );
}
