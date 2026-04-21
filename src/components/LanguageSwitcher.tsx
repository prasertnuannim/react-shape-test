import { Select } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function LanguageSwitcher() {
  useTranslation();

  return (
    <Select
      value={i18n.language.startsWith("th") ? "th" : "en"}
      size="small"
      style={{ width: 84 }}
      onChange={(value) => i18n.changeLanguage(value)}
      options={[
        { label: "EN", value: "en" },
        { label: "ไทย", value: "th" },
      ]}
    />
  );
}
