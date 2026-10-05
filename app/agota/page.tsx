import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Svircevic-Bodnár Ágota | SVIRCEVIC.HU",
  description: "Dr. Svircevic-Bodnár Ágota személyes és szakmai oldala.",
};

const timeline = [
  {
    year: "2006",
    title: "Jogi diploma",
    text: "A Szegedi Tudományegyetem Állam- és Jogtudományi Karán szerzett jogi diplomát.",
  },
  {
    year: "2011",
    title: "Jogi szakvizsga",
    text: "A jogi szakvizsga megszerzésével a klasszikus jogászi pályán szerzett képzettsége teljessé vált.",
  },
  {
    year: "2010-es évek",
    title: "Önkormányzati és vagyonkezelési tapasztalat",
    text: "Kecskeméten önkormányzati munkakörökben, többek között vagyonkezelési és lakásgazdálkodási területen szerzett szakmai tapasztalatot.",
  },
  {
    year: "2020–2022",
    title: "Jogi és szervezeti vezetői feladatok",
    text: "A Kecskeméti Polgármesteri Hivatalban a Jogi Osztály, majd a Szervezési és Jogi Iroda vezetőjeként dolgozott.",
  },
  {
    year: "2022–",
    title: "Aljegyző",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatalának aljegyzőjeként vesz részt a hivatal szakmai és szervezeti működésében.",
  },
];

const focusAreas = [
  "önkormányzati igazgatás",
  "jogi és szervezeti ügyek",
  "vagyongazdálkodás",
  "lakás- és ingatlangazdálkodás",
  "szervezeti működés és koordináció",
  "választási igazgatás",
];

export default function AgotaPage() {
  return (
    <main className="agota-page">
      <header className="agota-topbar">
        <a className="back-link" href="https://svircevic.hu" aria-label="Vissza a főoldalra">
          <span aria-hidden="true">←</span> Főoldal
        </a>
        <div className="language-switch" aria-label="Nyelvválasztó">
          <span className="active">HU</span>
          <span aria-hidden="true">|</span>
          <span aria-disabled="true">EN</span>
        </div>
      </header>

      <section className="agota-hero">
        <div className="agota-hero-image">
          <img src="/images/agota.jpg" alt="Dr. Svircevic-Bodnár Ágota portréja" />
        </div>
        <div className="agota-hero-copy">
          <span className="eyebrow">SVIRCEVIC.HU · SZEMÉLYES OLDAL</span>
          <div className="agota-rule" aria-hidden="true" />
          <h1>
            DR. SVIRCEVIC-BODNÁR
            <span>ÁGOTA</span>
          </h1>
          <p className="hero-role">Jogász · aljegyző · Kecskemét</p>
          <p className="hero-lead">
            A jogi szakmai pálya, az önkormányzati igazgatás és a szervezeti vezetés metszetében szerzett tapasztalat.
          </p>
          <a className="linkedin-link" href="https://www.linkedin.com/in/agota-svircevic-bodnar/" target="_blank" rel="noreferrer">
            LinkedIn profil <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="agota-intro section-grid">
        <div className="section-index">01</div>
        <div>
          <span className="section-kicker">BEMUTATKOZÁS</span>
          <h2>Jogászi szemlélet, közszolgálati tapasztalat.</h2>
          <p>
            Dr. Svircevic-Bodnár Ágota szakmai pályája a jogi végzettségre épülő önkormányzati munkától a szervezeti és vezetői feladatokig ível. Pályája során a jogi tudás, az önkormányzati működés, a vagyongazdálkodás és a hivatali szervezés területei kapcsolódtak össze.
          </p>
          <p>
            Kecskeméti munkájának fontos eleme a jogszerű, kiszámítható és együttműködésre épülő hivatali működés támogatása. Jelenleg a Kecskeméti Polgármesteri Hivatal aljegyzőjeként dolgozik.
          </p>
        </div>
      </section>

      <section className="focus-section">
        <div className="section-grid focus-head">
          <div className="section-index">02</div>
          <div>
            <span className="section-kicker">SZAKMAI FÓKUSZ</span>
            <h2>Területek, ahol a jog és a szervezet találkozik.</h2>
          </div>
        </div>
        <div className="focus-grid">
          {focusAreas.map((area, index) => (
            <article className="focus-card" key={area}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{area}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-grid">
          <div className="section-index">03</div>
          <div>
            <span className="section-kicker">SZAKMAI PÁLYA</span>
            <h2>Egy pálya, amelyben a szakmai felelősség fokozatosan épült vezetői szereppé.</h2>
          </div>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="timeline-item" key={item.year + item.title}>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="agota-quote">
        <div className="quote-mark" aria-hidden="true">“</div>
        <p>
          A jó hivatali működéshez egyszerre van szükség biztos jogi alapokra, pontos szervezésre és egymásra figyelő együttműködésre.
        </p>
        <span>— szakmai hitvallásként megfogalmazott gondolat</span>
      </section>

      <section className="agota-contact section-grid">
        <div className="section-index">04</div>
        <div className="contact-panel">
          <span className="section-kicker">KAPCSOLÓDÁS</span>
          <h2>Professzionális profil és szakmai jelenlét.</h2>
          <p>A részletes szakmai háttér, aktuális munkakapcsolatok és a pálya további állomásai a LinkedIn-profilon érhetők el.</p>
          <a className="linkedin-link large" href="https://www.linkedin.com/in/agota-svircevic-bodnar/" target="_blank" rel="noreferrer">
            LinkedIn · Dr. Svircevic-Bodnár Ágota <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer className="agota-footer">
        <a href="https://svircevic.hu">SVIRCEVIC.HU</a>
        <span>KECSKEMÉT · HUNGARY</span>
      </footer>
    </main>
  );
}
