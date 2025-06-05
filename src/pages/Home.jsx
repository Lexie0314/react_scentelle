import { Helmet } from 'react-helmet'
import HeaderNew from "../components/HeaderNew"
import Footer from "../components/Footer"
import HomePageContent from "../components/HomePageContent";
import { theme } from 'antd';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTopOnMount() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Home() {
  const {
    token: { colorBgBase, colorTextBase },
  } = theme.useToken();

  // --- 回到頂端按鈕邏輯 ---
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="maincontainer mainLayout">
      <ScrollToTopOnMount />
      <Helmet>
        <title>Scentelle</title>
        <style>{`
          body { 
            background-color: ${colorBgBase}; 
            color: ${colorTextBase}
          }
        `}</style>
      </Helmet>

      <HeaderNew
        className="layoutHeader"
        slogan="An example made by Vite."
      />
      <HomePageContent
        className="layoutContent"
        title="Product"
      />
      <Footer className="layoutFooter" />

      {showTopBtn && (
  <div
    onClick={scrollToTop}
    style={{
      position: "fixed",
      bottom: "40px",
      right: "10px",
      width: "160px",
      cursor: "pointer",
      zIndex: 1000,
      textAlign: "center",
      userSelect: "none",
    }}
    title="回到頂部"
  >
    <img
      src="/images/logodel.png"
      alt="回到頂部"
      style={{
        width: "160px",
        height: "100px",
        
        
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    />
    <div style={{ 
      color: "#484349", 
      fontWeight: "bold", 
      marginTop: "6px", 
      fontSize: "16px",
      textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
    }}>
      Top
    </div>
  </div>
)}

    </div>
  );
}

export default Home;