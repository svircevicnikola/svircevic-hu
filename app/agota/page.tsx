import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Svircevic-Bodnár Ágota | SVIRCEVIC.HU",
  description: "Dr. Svircevic-Bodnár Ágota személyes és szakmai oldala.",
};

const timeline = [
  {
    year: "2022.07 – jelenleg",
    title: "Aljegyző",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala.",
  },
  {
    year: "2021.08 – 2022.06",
    title: "Irodavezető, Szervezési és Jogi Iroda · jogtanácsos",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala.",
  },
  {
    year: "2020.03 – 2021.07",
    title: "Osztályvezető, Jogi Osztály · jogtanácsos",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala.",
  },
  {
    year: "2018.06 – 2020.03",
    title: "Irodavezető, Vagyongazdálkodási és Beszerzési Iroda",
    text: "Neumann János Egyetem, Kecskemét.",
  },
  {
    year: "2018.02 – 2018.05",
    title: "Vagyongazdálkodási referens",
    text: "Neumann János Egyetem, Kecskemét.",
  },
  {
    year: "2014.11 – 2018.02",
    title: "Osztályvezető, Bérlakás- és társasházkezelési Osztály",
    text: "KIK-FOR Kft., Kecskemét.",
  },
  {
    year: "2014.03 – 2014.11",
    title: "Csoportvezető, Jogi Osztály · Vagyongazdálkodási Csoport",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala.",
  },
  {
    year: "2012.04 – 2014.03",
    title: "Csoportvezető, Jogi Osztály · Lakás Csoport",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala.",
  },
  {
    year: "2008.05 – 2012.04",
    title: "Vagyongazdálkodási ügyintéző",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala.",
  },
  {
    year: "2006.09 – 2008.05",
    title: "Jogász",
    text: "Nagykőrös Város Polgármesteri Hivatala.",
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
          <img src="/images/agota-hero.jpg" alt="Dr. Svircevic-Bodnár Ágota portréja" />
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
            Jogászként és közigazgatási szakemberként a jogi, szervezési, vagyongazdálkodási és beszerzési területeken szerzett tapasztalataimat hasznosítom a helyi önkormányzati működés támogatásában.
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
          <h2>Jog, közigazgatás, szervezet</h2>
          <p>
            Szakmai pályám középpontjában a jogi munka és a közigazgatás áll, emellett azonban a vagyongazdálkodás és az ingatlankezelés is végigkísérte a pályámat. Ezen a területen az önkormányzatnál végzett munkám mellett az önkormányzati tulajdonú KIK-FOR Kft.-nél, majd a Neumann János Egyetem Kancelláriáján is szereztem szakmai és vezetői tapasztalatot, többek között vagyongazdálkodási és beszerzési területen. Jogi és közigazgatási munkám mellett társadalomtudományi és gazdasági szakfordító képesítést is szereztem, és rövid ideig egyetemi óraadóként agrárjogot oktattam. A gyermekjogok iránt is régóta érdeklődöm; önkéntesként az UNICEF Magyarország Ébresztő Óra programjának trénereként iskolákban tartok gyermekjogi érzékenyítő foglalkozásokat.
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
