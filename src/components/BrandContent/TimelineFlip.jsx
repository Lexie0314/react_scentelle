import React, { useState, useEffect, useRef } from "react";
import styles from "./TimelineFlip.module.css";

const timelineData = [
  {
    year: "2018",
    text: "We started with a vision to bring calm to everyday life.\nIn 2018, we created our first signature scented candle.\nIt quickly became a beloved classic.",
    img: "/images/brand1.webp",
  },
  {
    year: "2019",
    text: "Our first flagship store opened in 2019.\nA cozy space for customers to explore and enjoy our scents.\nIt deepened our connection with fragrance lovers.",
    img: "home.avif",
  },
  {
    year: "2021",
    text: "We introduced a curated selection of international fragrance brands.\nOur boutique became a destination for unique, artisan scents.\nThis expanded our vision and product range.",
    img: "/images/news.png",
  },
  {
    year: "2023",
    text: "In 2023, we launched a full home fragrance line.\nIncluding candles, diffusers, and room sprays.\nEach designed to create a personal sanctuary.",
    img: "/images/y11_1.webp",
  },
];


export default function TimelineFlip() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    function onWheel(e) {
      if (isScrollingRef.current) return;

      if (e.deltaY > 0) {
        // 往下滾
        if (currentIndex < timelineData.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          isScrollingRef.current = true;
          setTimeout(() => (isScrollingRef.current = false), 1000); // 1秒滑動鎖定
        }
      } else if (e.deltaY < 0) {
        // 往上滾
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
          isScrollingRef.current = true;
          setTimeout(() => (isScrollingRef.current = false), 1000);
        }
      }
    }

    const container = containerRef.current;
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [currentIndex]);

  return (
    <div className={styles.timelineContainer} ref={containerRef}>
      {timelineData.map((item, index) => (
        <div
          key={item.year}
          className={`${styles.page} ${index === currentIndex ? styles.active : ""}`}
        >
          <div className={styles.year}>{item.year}</div>
          <div className={styles.content}>
            <p>{item.text}</p>
            <img src={item.img} alt={`品牌大事紀-${item.year}`} />
          </div>
        </div>
      ))}
    </div>
  );
}