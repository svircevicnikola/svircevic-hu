import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Svircevic-Bodnár Ágota | SVIRCEVIC.HU",
  description: "Dr. Svircevic-Bodnár Ágota személyes és szakmai oldala.",
};

const timeline = [
  {
    year: "2022.07 – jelenleg",
    title: "Aljegyző",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala",
  },
  {
    year: "2021.08 – 2022.06",
    title: "Irodavezető, Szervezési és Jogi Iroda · jogtanácsos",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala",
  },
  {
    year: "2020.03 – 2021.07",
    title: "Osztályvezető, Jogi Osztály · jogtanácsos",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala",
  },
  {
    year: "2018.06 – 2020.03",
    title: "Irodavezető, Vagyongazdálkodási és Beszerzési Iroda",
    text: "Neumann János Egyetem, Kecskemét",
  },
  {
    year: "2018.02 – 2018.05",
    title: "Vagyongazdálkodási referens",
    text: "Neumann János Egyetem, Kecskemét",
  },
  {
    year: "2014.11 – 2018.02",
    title: "Osztályvezető, Bérlakás- és társasházkezelési Osztály",
    text: "KIK-FOR Kft., Kecskemét",
  },
  {
    year: "2014.03 – 2014.11",
    title: "Csoportvezető, Jogi Osztály · Vagyongazdálkodási Csoport",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala",
  },
  {
    year: "2012.04 – 2014.03",
    title: "Csoportvezető, Jogi Osztály · Lakás Csoport",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala",
  },
  {
    year: "2008.05 – 2012.04",
    title: "Vagyongazdálkodási ügyintéző",
    text: "Kecskemét Megyei Jogú Város Polgármesteri Hivatala",
  },
  {
    year: "2006.09 – 2008.05",
    title: "Jogász",
    text: "Nagykőrös Város Polgármesteri Hivatala",
  },
];

const focusAreas = [
  { label: "önkormányzati igazgatás", icon: "building" },
  { label: "szervezetfejlesztés", icon: "structure" },
  { label: "vagyongazdálkodás", icon: "property" },
  { label: "lakás- és ingatlangazdálkodás", icon: "home" },
  { label: "választási igazgatás", icon: "vote" },
  { label: "koordináció és kontrolling", icon: "coordination" },
] as const;

function FocusIcon({ kind }: { kind: "building" | "structure" | "property" | "home" | "vote" | "coordination" }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  } as const;

  if (kind === "building") {
    return <svg {...common}><path d="M4 20V5h16v15M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2M10 20v-4h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (kind === "structure") {
    return <svg {...common}><rect x="9" y="3" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="3" y="16" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="15" y="16" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><path d="M12 8v4M6 16v-4h12v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (kind === "property") {
    return <svg {...common}><path d="m4 10 8-6 8 6M6 9v10h12V9M9 19v-6h6v6M4 21h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (kind === "home") {
    return <svg {...common}><path d="m4 11 8-7 8 7v9H4v-9ZM9 20v-5h6v5M8 11h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (kind === "vote") {
    return <svg {...common}><path d="M6 4h12v5H6zM4 9h16v11H4zM8 14l2 2 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  return <svg {...common}><circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.4"/><circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.4"/><path d="M8.2 6h7.6M7.3 7.7l3.3 8.1M16.7 7.7l-3.3 8.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
}

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
        <div className="agota-intro-main">
          <div className="agota-intro-copy">
            <span className="section-kicker">BEMUTATKOZÁS</span>
            <h2>Jog, közigazgatás, szervezet</h2>
            <p>
              Szakmai pályám középpontjában a jogi munka és a közigazgatás áll, emellett azonban a vagyongazdálkodás és az ingatlankezelés is végigkísérte a pályámat. Ezen a területen az önkormányzatnál végzett munkám mellett az önkormányzati tulajdonú KIK-FOR Kft.-nél, majd a Neumann János Egyetem Kancelláriáján is szereztem szakmai és vezetői tapasztalatot, többek között vagyongazdálkodási és beszerzési területen. Jogi és közigazgatási munkám mellett társadalomtudományi és gazdasági szakfordító képesítést is szereztem, és rövid ideig egyetemi óraadóként agrárjogot oktattam. A gyermekjogok iránt is régóta érdeklődöm; önkéntesként az UNICEF Magyarország Ébresztő Óra programjának trénereként iskolákban tartok gyermekjogi érzékenyítő foglalkozásokat.
            </p>
          </div>
          <div className="agota-intro-image-secondary">
            <img src="/images/agota-profile.jpg" alt="Dr. Svircevic-Bodnár Ágota" />
          </div>
        </div>
      </section>

      <section className="focus-section">
        <div className="section-grid focus-head">
          <div className="section-index">02</div>
          <div>
            <span className="section-kicker">FÓKUSZ</span>
            <h2>Szakmai munkám fókuszterületei</h2>
          </div>
        </div>
        <div className="focus-grid">
          {focusAreas.map((area) => (
            <article className="focus-card" key={area.label}>
              <span className="focus-icon" aria-hidden="true">
                <FocusIcon kind={area.icon} />
              </span>
              <h3>{area.label}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-grid">
          <div className="section-index">03</div>
          <div>
            <span className="section-kicker">SZAKMAI PÁLYA</span>
            <h2>A pályám során szerzett tapasztalatok és fontosabb állomások</h2>
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

      <section className="agota-quote section-grid">
        <div className="section-index">04</div>
        <div className="quote-content">
          <span className="section-kicker">HITVALLÁS</span>
          <div className="quote-line">
            <span className="quote-mark quote-mark-open" aria-hidden="true">„</span>
            <p className="quote-text">A jó hivatali működéshez egyszerre van szükség biztos jogi alapokra, pontos szervezésre és egymásra figyelő együttműködésre.<span className="quote-mark quote-mark-close" aria-hidden="true">”</span></p>
          </div>
        </div>
      </section>

      <footer className="agota-footer">
        <a href="https://svircevic.hu">SVIRCEVIC.HU</a>
        <a href="https://www.linkedin.com/in/agota-svircevic-bodnar/" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
        <span>KECSKEMÉT · HUNGARY</span>
      </footer>
    </main>
  );
}
