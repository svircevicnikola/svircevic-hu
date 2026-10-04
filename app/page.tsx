"use client";

import { useEffect, useState } from "react";

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
  const [desktopScale, setDesktopScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const isDesktop = window.innerWidth > 1100;
      if (!isDesktop) {
        setDesktopScale(1);
        return;
      }

      const stage = document.querySelector(".desktop-stage") as HTMLElement | null;
      if (!stage) return;

      // Measure the approved layout at its natural size, then scale that
      // complete composition as one unit. This never changes card internals
      // or the photo crop.
      const naturalHeight = stage.scrollHeight;
      const availableHeight = Math.max(1, window.innerHeight - 16);
      const fitScale = availableHeight / naturalHeight;

      setDesktopScale(Math.min(0.9, fitScale));
    };

    const frame = requestAnimationFrame(updateScale);
    window.addEventListener("resize", updateScale);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <main
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
  );
}
