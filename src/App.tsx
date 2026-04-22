import { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ShapeGrid from "./components/ShapeGrid";
import { useShapeActions } from "./hooks/useShapeActions";

const { Content } = Layout;
const { Title } = Typography;

type Page = "home" | "shape";
type MenuKey = "test1" | "test2" | "test3";

function getPageFromHash(): Page {
  if (typeof window === "undefined") {
    return "home";
  }

  return window.location.hash === "#shape" ? "shape" : "home";
}

export default function App() {
  const { t } = useTranslation();
  const [page, setPage] = useState<Page>(() => getPageFromHash());
  const menuItems: Array<{ key: MenuKey; page?: Page }> = [
    { key: "test1", page: "shape" },
    { key: "test2" },
    { key: "test3" },
  ];

  const {
    targetShapes,
    handleMoveShapeLeft,
    handleMovePosition,
    handleMoveShapeRight,
    handleRandomizePositions,
  } = useShapeActions();

  useEffect(() => {
    const syncPage = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  const openPage = (nextPage: Page) => {
    window.location.assign(nextPage === "shape" ? "#shape" : "#home");
  };

  return (
    <Layout className={`app-layout ${page === "home" ? "app-layout-home" : "app-layout-shape"}`}>
      <div className="language-switcher-floating">
        <LanguageSwitcher />
      </div>

      <Content className={page === "home" ? "home-content" : "shape-page-content"}>
        {page === "home" ? (
          <section className="home-page" aria-label={t("home.ariaLabel")}>
            <div className="home-menu">
              {menuItems.map((item) => {
                const isEnabled = Boolean(item.page);

                return (
                  <button
                    key={item.key}
                    type="button"
                    className={`home-menu-card ${isEnabled ? "" : "is-disabled"}`}
                    onClick={() => item.page && openPage(item.page)}
                    disabled={!isEnabled}
                  >
                    <span className="home-menu-card-title">{t(`home.${item.key}.title`)}</span>
                    <span className="home-menu-card-subtitle">{t(`home.${item.key}.subtitle`)}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="shape-page">
            <Title level={2} className="page-title">
              {t("pageTitle")}
            </Title>

            <ShapeGrid
              targetShapes={targetShapes}
              onMoveShapeLeft={handleMoveShapeLeft}
              onMovePosition={handleMovePosition}
              onMoveShapeRight={handleMoveShapeRight}
              onRandomizePositions={handleRandomizePositions}
            />
          </section>
        )}
      </Content>
    </Layout>
  );
}
