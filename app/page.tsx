"use client";

import { useEffect, useRef, useState } from "react";

const DESIGN_WIDTH = 1440;

const cards = [
  {
    name: <>DR. SVIRCEVIC<br />NIKOLA</>,
    subtitle: "Személyes oldal · Szakmai pálya",
    image: "/images/nikola.jpg",
    href: "https://nikola.svircevic.hu",
    alt: "Dr. Svircevic Nikola",
    ariaLabel: "Dr. Svircevic Nikola – megnyitás",
  },
  {
    name: <>DR. SVIRCEVIC-BODNÁR<br />ÁGOTA</>,
    subtitle: "Személyes oldal · Szakmai pálya",
    image: "/images/agota.jpg",
    href: "https://agota.bodnar.svircevic.hu",
    alt: "Dr. Svircevic-Bodnár Ágota",
    ariaLabel: "Dr. Svircevic-Bodnár Ágota – megnyitás",
  },
  {
    name: <>SVIRCEVIC<br />NIKOLA STEVAN</>,
    subtitle: "Gaming · Tech · Közösség",
    image: "/images/nikola-stevan.jpg",
    href: "https://nikola.stevan.svircevic.hu",
    alt: "Svircevic Nikola Stevan",
    ariaLabel: "Svircevic Nikola Stevan – megnyitás",
  },
  {
    name: <>CSALÁDUNK</>,
    subtitle: "Otthon · Élmények · Emlékek",
    image: "/images/family.jpg",
    href: "https://family.svircevic.hu",
    alt: "Svircevic család",
    ariaLabel: "Családunk – megnyitás",
  },
] as const;

export default function Home() {
  const stageRef = useRef<HTMLElement | null>(null);
  const [desktopScale, setDesktopScale] = useState(1);
  const [stageHeight, setStageHeight] = useState(0);

  useEffect(() => {
    const updateScale = () => {
      const isDesktop = window.matchMedia("(pointer: fine)").matches && window.innerWidth > 680;
      if (!isDesktop || !stageRef.current) {
        setDesktopScale(1);
        setStageHeight(0);
        return;
      }

      const stage = stageRef.current;
      const naturalHeight = stage.scrollHeight;
      const viewportScale = window.visualViewport?.scale || 1;

      // Use the effective visual viewport so browser zoom does not trigger
      // a second, conflicting responsive layout.
      const availableWidth = Math.max(1, window.innerWidth * viewportScale - 20);
      const availableHeight = Math.max(1, window.innerHeight * viewportScale - 16);
      const widthScale = availableWidth / DESIGN_WIDTH;
      const heightScale = naturalHeight > 0 ? availableHeight / naturalHeight : 1;

      setStageHeight(naturalHeight);
      setDesktopScale(Math.min(0.95, widthScale, heightScale));
    };

    const update = () => requestAnimationFrame(updateScale);

    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  const desktopHeight = stageHeight > 0 ? stageHeight * desktopScale : undefined;

  return (
    <div
      className="desktop-viewport"
      style={desktopHeight ? { height: desktopHeight } : undefined}
    >
      <main
        ref={stageRef}
        className="page-shell desktop-stage"
        style={{ transform: `scale(${desktopScale})` }}
      >
        <header className="topbar" aria-label="Oldalfejléc">
          <div aria-hidden="true" />
          <div className="language-switch">
            <button className="active" type="button" aria-current="true">HU</button>
            <span aria-hidden="true">|</span>
            <button type="button">EN</button>
          </div>
        </header>

        <section className="hero" aria-labelledby="site-title">
          <div className="rule" aria-hidden="true" />
          <h1 id="site-title">SVIRCEVIC.HU</h1>
          <div className="rule" aria-hidden="true" />
        </section>

        <section className="directory" aria-label="Személyes és családi oldalak">
          {cards.map((card) => (
            <a className="profile-card" href={card.href} key={card.href} aria-label={card.ariaLabel}>
              <div className="photo-wrap">
                <img src={card.image} alt={card.alt} />
              </div>
              <div className="card-body">
                <span className="mini-rule" aria-hidden="true" />
                <h2>{card.name}</h2>
                <p>{card.subtitle}</p>
                <span className="arrow" aria-hidden="true">→</span>
              </div>
            </a>
          ))}
        </section>

        <section className="cityscape" aria-hidden="true">
          <img src="/art/kecskemet-skyline.png" alt="" />
        </section>

        <footer className="footer">
          <span>SVIRCEVIC.HU</span>
          <span>KECSKEMÉT · HUNGARY</span>
        </footer>
      </main>
    </div>
  );
}
