import { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ShapeGrid from "./components/ShapeGrid";
import { useShapeActions } from "./hooks/useShapeActions";

const { Content } = Layout;
const { Title } = Typography;

type Page = "home" | "shape";

function getPageFromHash(): Page {
  if (typeof window === "undefined") {
    return "home";
  }

  return window.location.hash === "#shape" ? "shape" : "home";
}

export default function App() {
  const { t } = useTranslation();
  const [page, setPage] = useState<Page>(() => getPageFromHash());

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
    window.location.hash = nextPage === "shape" ? "#shape" : "#home";
  };

  const menuItems = [
    {
      title: t("home.test1.title"),
      subtitle: t("home.test1.subtitle"),
      page: "shape" as const,
    },
    {
      title: t("home.test2.title"),
      subtitle: t("home.test2.subtitle"),
    },
    {
      title: t("home.test3.title"),
      subtitle: t("home.test3.subtitle"),
    },
  ];

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
                    key={item.title}
                    type="button"
                    className={`home-menu-card ${isEnabled ? "" : "is-disabled"}`}
                    onClick={() => item.page && openPage(item.page)}
                    disabled={!isEnabled}
                  >
                    <span className="home-menu-card-title">{item.title}</span>
                    <span className="home-menu-card-subtitle">{item.subtitle}</span>
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
