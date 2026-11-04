"use client";

import { useEffect, useState } from "react";
import "./stevan.css";

type InterestId = "math" | "science" | "drums" | "basketball" | "kayak" | "chess" | "code" | "hiking";

type Interest = {
  id: InterestId;
  number: string;
  title: string;
  subtitle: string;
  mark: string;
  size: "wide" | "large" | "small";
  description: string;
  detail: string;
};

const interests: Interest[] = [
  {
    id: "math", number: "01", title: "Matematika", subtitle: "LOGIC · CHALLENGE", mark: "∑",
    size: "large", description: "Logika, koncentráció, problémamegoldás.",
    detail: "A matematikaversenyek eredményei, oklevelei és versenyfotói itt kapnak helyet. A konkrét versenyneveket, évszámokat és helyezéseket a tényleges adatok alapján töltjük fel."
  },
  {
    id: "science", number: "02", title: "Természettudomány", subtitle: "SCIENCE · DISCOVERY", mark: "⚛",
    size: "small", description: "Kérdések, kísérletek, felfedezések.",
    detail: "Érdekes témák, kísérletek, felfedezések és olyan kérdések, amelyekre érdemes utánajárni."
  },
  {
    id: "drums", number: "03", title: "Dob", subtitle: "RHYTHM · MUSIC", mark: "◖))",
    size: "small", description: "Ritmus, zene és gyakorlás.",
    detail: "A zenei érdeklődés, kedvenc ritmusok, felvételek és később akár saját videók helye."
  },
  {
    id: "basketball", number: "04", title: "Kosárlabda", subtitle: "BASKETBALL", mark: "◉",
    size: "wide", description: "Mozgás, csapatjáték, lendület.",
    detail: "Kosárlabdás pillanatok, kedvenc játékosok, edzések és mérkőzések – azok a dolgok, amelyek igazán meghatározzák ezt az érdeklődést."
  },
  {
    id: "hiking", number: "08", title: "Túrázás", subtitle: "HIKING · OUTDOORS", mark: "⌃",
    size: "wide", description: "Természet, útvonalak és új panorámák.",
    detail: "Túrák, útvonalak, hegyek és természetben töltött napok – fotók és élmények gyűjtőhelye."
  },
  {
    id: "kayak", number: "05", title: "Kajak", subtitle: "PADDLING · TEAMWORK", mark: "≈",
    size: "small", description: "Víz, csapat, kitartás.",
    detail: "A kajakozáshoz kapcsolódó élmények, túrák, edzések és fotók gyűjtőhelye."
  },
  {
    id: "chess", number: "06", title: "Sakk", subtitle: "STRATEGY · FOCUS", mark: "♞",
    size: "large", description: "Stratégia, türelem, következő lépés.",
    detail: "Játszmák, kombinációk, érdekes állások és sakkos kihívások – minden, ahol néhány lépéssel előre kell gondolkodni."
  },
  {
    id: "code", number: "07", title: "Programozás", subtitle: "CODE · CREATE", mark: "</>",
    size: "wide", description: "Ötletekből működő dolgok.",
    detail: "Saját projektek, kísérletezés, játékötletek és a programozás során születő megoldások bemutatására szolgáló rész."
  }
];

function ControllerMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 112" fill="none" aria-hidden="true">
      <path d="M43 25h94c13 0 21 7 25 20l12 40c4 15-7 23-19 16l-27-18H52L25 101C13 108 2 100 6 85l12-40c4-13 12-20 25-20Z" fill="#071012" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
      <path d="M43 44v28M29 58h28" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="125" cy="49" r="5.5" fill="currentColor"/><circle cx="144" cy="65" r="5.5" fill="currentColor"/>
      <circle cx="106" cy="65" r="5.5" fill="currentColor"/><circle cx="125" cy="81" r="5.5" fill="currentColor"/>
      <path d="M67 92h46" stroke="currentColor" strokeWidth="2" opacity=".45"/>
    </svg>
  );
}

function InterestModal({ interest, onClose }: { interest: Interest; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="stevan-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="stevan-modal" role="dialog" aria-modal="true" aria-labelledby="interest-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="stevan-modal-close" type="button" onClick={onClose} aria-label="Ablak bezárása">×</button>
        <div className="stevan-modal-mark">{interest.mark}</div>
        <span className="stevan-eyebrow">A JÁTÉKON TÚL · {interest.number}</span>
        <h2 id="interest-modal-title">{interest.title}</h2>
        <p className="stevan-modal-subtitle">{interest.subtitle}</p>
        <p className="stevan-modal-copy">{interest.detail}</p>
        {interest.id === "math" ? (
          <div className="stevan-modal-note">
            <span>VERSENYEREDMÉNYEK</span>
            <p>Verseny neve · évszám · elért helyezés · oklevél vagy fotó</p>
          </div>
        ) : (
          <div className="stevan-modal-note">
            <span>GYŰJTEMÉNY</span>
            <p>Fotók, videók, kedvencek és saját történetek</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function NikolaStevanPage() {
  const [activeInterest, setActiveInterest] = useState<Interest | null>(null);

  return (
    <main className="stevan-site">
      <div className="stevan-noise" aria-hidden="true" />
      <header className="stevan-header">
        <a className="stevan-brand" href="#top" aria-label="Team Nikola – főoldal">
          <span className="stevan-brand-icon"><ControllerMark /></span>
          <span><b>TEAM <em>NIKOLA</em></b><small>GAMER PROFILE</small></span>
        </a>
        <nav className="stevan-nav" aria-label="Fő navigáció">
          <a href="#gaming">GAMING</a>
          <a href="#interests">INTERESTS</a>
          <a href="#about">ABOUT</a>
        </nav>
        <a className="stevan-header-cta" href="#gaming">ENTER THE ZONE <span>↗</span></a>
      </header>

      <section className="stevan-hero" id="top">
        <div className="stevan-hero-copy">
          <div className="stevan-kicker"><span className="stevan-status-dot" /> PLAYER PROFILE <i>·</i> EST. 2026</div>
          <h1>GAME<br/><span>ON.</span></h1>
          <div className="stevan-hero-rule"><span /></div>
          <p className="stevan-hero-name">NIKOLA STEVAN <small>— TEAM NIKOLA</small></p>
          <p className="stevan-hero-lead">A játék a fő pálya. A kíváncsiság visz tovább — a digitális világon innen és túl.</p>
          <div className="stevan-hero-actions">
            <a href="#gaming" className="stevan-button-primary">GAMING MODE <span>↓</span></a>
            <a href="#interests" className="stevan-button-secondary">CURIOSITY MODE <span>↗</span></a>
            <a href="#about" className="stevan-button-quiet">ABOUT <span>↗</span></a>
          </div>
          <div className="stevan-hero-footnote"><span>01 / PLAYER</span><span>PLAY · THINK · CREATE</span></div>
        </div>
        <div className="stevan-hero-visual">
          <div className="stevan-visual-grid" aria-hidden="true" />
          <div className="stevan-portrait-frame">
            <div className="stevan-portrait-top"><span>PLAYER / 001</span><span>ONLINE PROFILE</span></div>
            <img src="/images/team-nikola-hero.jpg" alt="Nikola Stevan portréja" />
            <div className="stevan-portrait-overlay">
              <span>TEAM NIKOLA</span>
              <b>PLAYER ONE</b>
            </div>
          </div>
          <div className="stevan-hero-controller"><ControllerMark /><span>READY<br/>TO PLAY</span></div>
          <div className="stevan-visual-cross stevan-cross-one">+</div>
          <div className="stevan-visual-cross stevan-cross-two">+</div>
          <span className="stevan-visual-index">TN / 001</span>
        </div>
        <div className="stevan-hero-bottomline"><span>SCROLL TO EXPLORE</span><span>↓</span><span>GAMING · CURIOSITY · EVERYTHING ELSE</span></div>
      </section>

      <section className="stevan-gaming" id="gaming">
        <div className="stevan-section-heading">
          <div><span className="stevan-eyebrow">01 — PLAYER MODE</span><h2>THE GAME <span>ZONE.</span></h2></div>
          <p>Minden menet egy új kihívás.<br/>Minden pálya egy új lehetőség.</p>
        </div>
        <div className="stevan-game-layout">
          <article className="stevan-feature-card">
            <div className="stevan-feature-top"><span>PLAYER AREA</span><span>01 / 03</span></div>
            <div className="stevan-feature-art"><img className="stevan-feature-image" src="/images/team-nikola-secondary.jpg" alt="Team Nikola gaming vizuál" /><div className="stevan-feature-image-shade" /><div className="stevan-feature-word">PLAY<br/><b>HARD.</b></div></div>
            <div className="stevan-feature-bottom"><span>FOCUS MODE</span><span>GAME ON <i>↗</i></span></div>
          </article>
          <div className="stevan-game-cards">
            <article className="stevan-game-card">
              <span className="stevan-card-index">A / 01</span><div className="stevan-game-card-icon">▤</div>
              <div><h3>KEDVENC JÁTÉKOK</h3><p>A fő játékok, kedvenc címek és játékprofilok helye.</p></div><span className="stevan-card-arrow">↗</span>
            </article>
            <article className="stevan-game-card">
              <span className="stevan-card-index">B / 02</span><div className="stevan-game-card-icon">▶</div>
              <div><h3>GAMEPLAY HIGHLIGHTS</h3><p>Videók, klipek és emlékezetes játékpillanatok.</p></div><span className="stevan-card-arrow">↗</span>
            </article>
            <article className="stevan-game-card">
              <span className="stevan-card-index">C / 03</span><div className="stevan-game-card-icon">⌘</div>
              <div><h3>GAMING SETUP</h3><p>Eszközök, perifériák és a saját játékállomás.</p></div><span className="stevan-card-arrow">↗</span>
            </article>
          </div>
        </div>
        <div className="stevan-game-note"><span className="stevan-status-dot" /> A JÁTÉKOK, PROFILOK ÉS VIDEÓK FELTÖLTÉSE KÖVETKEZIK <span className="stevan-game-note-line" /></div>
      </section>

      <section className="stevan-interests" id="interests">
        <div className="stevan-section-heading">
          <div><span className="stevan-eyebrow">02 — CURIOSITY MODE</span><h2>GEEK <span>ZONE.</span></h2></div>
          <p>A játék csak az egyik pálya.<br/>Nézz körül a többi világban is.</p>
        </div>
        <div className="stevan-interest-intro"><span>OTHER INTERESTS</span><span>VÁLASSZ EGYET A RÉSZLETEKHEZ <b>↓</b></span></div>
        <div className="stevan-interest-cloud">
          {interests.map((interest) => (
            <button
              className={`stevan-interest-card stevan-interest-${interest.id} stevan-interest-${interest.size}`}
              key={interest.id}
              type="button"
              onClick={() => setActiveInterest(interest)}
              aria-haspopup="dialog"
            >
              <span className="stevan-interest-number">{interest.number}</span>
              <span className="stevan-interest-mark">{interest.mark}</span>
              <span className="stevan-interest-content"><small>{interest.subtitle}</small><b>{interest.title}</b><em>{interest.description}</em></span>
              <span className="stevan-interest-open">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="stevan-about" id="about">
        <div className="stevan-about-mark">TN<span>01</span></div>
        <div className="stevan-about-copy"><span className="stevan-eyebrow">03 — ABOUT THE PLAYER</span><h2>CURIOUS BY<br/><span>DEFAULT.</span></h2><p>Gaming, sport, zene, stratégia és programozás. Különböző pályák, ugyanaz a kíváncsiság: kipróbálni, megérteni, fejlődni.</p></div>
        <div className="stevan-about-stamp"><ControllerMark /><span>TEAM<br/>NIKOLA</span></div>
      </section>

      <footer className="stevan-footer">
        <a className="stevan-footer-brand" href="#top">TEAM <span>NIKOLA</span></a>
        <span>GAMING · TECH · CURIOSITY</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>

      {activeInterest && <InterestModal interest={activeInterest} onClose={() => setActiveInterest(null)} />}
    </main>
  );
}
