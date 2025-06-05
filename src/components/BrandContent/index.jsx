import React, { useEffect, useState, useRef } from "react";
import styles from "./BrandContent.module.css";
import TimelineFlip from "./TimelineFlip";

export default function BrandContent() {
  const [visible, setVisible] = useState(false);
  const [isFixed, setIsFixed] = useState(true);
  const timelineRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero 滿版大圖 */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>SCENTELLE</h1>
          <p className={styles.heroSubtitle}>香氛點亮你的生活</p>
        </div>
      </section>

      {/* 內容主區 */}
      <main className={styles.main}>
        <section className={`${styles.section} ${visible ? styles.fadeInUp : ""}`}>
          <div className={styles.text}>
            <h2>品牌故事</h2>
            <p>
              Scentelle 是一間販售各式香氛產品的商店，
              我們不只提供個性化的香氛選品，
              更希望透過質感與舒適兼具的香味，
              讓你在每一個日常時刻中，找回屬於自己的生活儀式感。
              從起床的第一縷清香，到夜晚放鬆的一抹暖調，
              相信香氛可以帶來溫暖、舒適的感受，並且點亮每個角落的美好時光。
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img
              src="/images/brand1.webp"
              alt="香氛蠟燭"
            />
          </div>
        </section>

        <section
          className={`${styles.section} ${visible ? styles.fadeInUp : ""}`}
          style={{ animationDelay: "0.3s" }}
        >
          <div className={styles.imageWrapper}>
            <img
              src="/images/y11_1.webp"
              alt="蠟燭製作"
            />
          </div>
          <div className={styles.text}>
            <h2>品牌理念</h2>
            <ul>
              <li>天然成分：我們選擇純淨天然的蠟材與香料，呵護您的健康與環境。</li>
              <li>手工製作：每支蠟燭皆由專業工匠手工打造，保證品質與細節。</li>
              <li>創新設計：融合藝術與生活，打造獨一無二的香氛體驗。</li>
              <li>永續發展：我們關注環境，致力於減少生產對地球的負擔。</li>
            </ul>
          </div>
        </section>
        
      </main>


      <section className={styles.timelineWrapper}>
            <div className={styles.timelineSticky}>
                <TimelineFlip />
            </div>
        </section>

    <main className={styles.main}>
        <section
          className={`${styles.section} ${visible ? styles.fadeInUp : ""}`}
          style={{ animationDelay: "0.6s" }}
        >
          <div className={styles.text}>
            <h2>團隊介紹</h2>
            <p>
              Scentelle 是一間販售各式香氛產品的商店，
              我們不只提供個性化的香氛選品，
              更希望透過質感與舒適兼具的香味，
              讓你在每一個日常時刻中，找回屬於自己的生活儀式感。
              從起床的第一縷清香，到夜晚放鬆的一抹暖調，
              Scentelle 讓香味成為你品味生活的延伸，
              一種追求真實、純粹與美好質感的生活態度，正悄悄蔓延。
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img
              src="/images/logodel.png"
              alt="團隊合作"
            />
          </div>
        </section>
    </main>
        
    </>
  );
}