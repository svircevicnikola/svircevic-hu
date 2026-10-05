import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Ágota Svircevic-Bodnár | SVIRCEVIC.HU",
  description: "Personal and professional profile of Dr. Ágota Svircevic-Bodnár.",
};

const timeline = [
  {
    year: "2022.07 – present",
    title: "Deputy Clerk",
    text: "Mayor's Office of the City of Kecskemét",
  },
  {
    year: "2021.08 – 2022.06",
    title: "Head of the Organisational and Legal Office · Legal Counsel",
    text: "Mayor's Office of the City of Kecskemét",
  },
  {
    year: "2020.03 – 2021.07",
    title: "Head of the Legal Department · Legal Counsel",
    text: "Mayor's Office of the City of Kecskemét",
  },
  {
    year: "2018.06 – 2020.03",
    title: "Head of the Property Management and Procurement Office",
    text: "University of Neumann János, Kecskemét",
  },
  {
    year: "2018.02 – 2018.05",
    title: "Property Management Specialist",
    text: "University of Neumann János, Kecskemét",
  },
  {
    year: "2014.11 – 2018.02",
    title: "Head of the Social Housing and Condominium Management Department",
    text: "KIK-FOR Ltd., Kecskemét",
  },
  {
    year: "2014.03 – 2014.11",
    title: "Head of Legal Department · Property Management Group",
    text: "Mayor's Office of the City of Kecskemét",
  },
  {
    year: "2012.04 – 2014.03",
    title: "Head of Legal Department · Housing Group",
    text: "Mayor's Office of the City of Kecskemét",
  },
  {
    year: "2008.05 – 2012.04",
    title: "Property Management Officer",
    text: "Mayor's Office of the City of Kecskemét",
  },
  {
    year: "2006.09 – 2008.05",
    title: "Lawyer",
    text: "Mayor's Office of the City of Nagykőrös",
  },
];

const focusAreas = [
  { label: "municipal administration", icon: "building" },
  { label: "organisational development", icon: "structure" },
  { label: "property management", icon: "property" },
  { label: "housing and real estate management", icon: "home" },
  { label: "electoral administration", icon: "vote" },
  { label: "coordination and controlling", icon: "coordination" },
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

export default function AgotaEnglishPage() {
  return (
    <main className="agota-page agota-page-en">
      <header className="agota-topbar">
        <a className="back-link" href="https://svircevic.hu" aria-label="Back to homepage">
          <span aria-hidden="true">←</span> Home
        </a>
        <div className="language-switch" aria-label="Language selection">
          <a href="https://agota.bodnar.svircevic.hu" aria-label="Hungarian version">HU</a>
          <span aria-hidden="true">|</span>
          <span className="active">EN</span>
        </div>
      </header>

      <section className="agota-hero">
        <div className="agota-hero-image">
          <img src="/images/agota-hero.jpg" alt="Portrait of Dr. Ágota Svircevic-Bodnár" />
        </div>
        <div className="agota-hero-copy">
          <span className="eyebrow">SVIRCEVIC.HU · PERSONAL PAGE</span>
          <div className="agota-rule" aria-hidden="true" />
          <h1>
            DR. SVIRCEVIC-BODNÁR
            <span>ÁGOTA</span>
          </h1>
          <p className="hero-role">Lawyer · Deputy Clerk · Kecskemét</p>
          <p className="hero-lead">
            As a lawyer and public administration professional, I draw on my experience in legal, organisational, property management and procurement work to support local government operations.
          </p>
          <a className="linkedin-link" href="https://www.linkedin.com/in/agota-svircevic-bodnar/" target="_blank" rel="noreferrer">
            LinkedIn profile <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="agota-intro section-grid">
        <div className="section-index">01</div>
        <div>
          <span className="section-kicker">PROFILE</span>
          <h2>Law, public administration, organisation</h2>
          <div className="agota-intro-body">
            <p>
              My professional career has been centred on legal work and public administration, while property management and real estate management have also been a consistent part of my work. In this field, alongside my work in local government, I gained professional and leadership experience at the municipally owned KIK-FOR Ltd. and later at the Chancellery of the University of Neumann János, including in property management and procurement. Alongside my legal and public administration work, I also obtained a qualification in social sciences and economics translation, and for a short period I taught agricultural law as a university lecturer. I have also long been interested in children's rights; as a volunteer trainer in UNICEF Hungary's Wake-Up Call programme, I conduct children's rights awareness sessions in schools.
            </p>
            <div className="agota-intro-image-secondary">
              <img src="/images/agota-profile.jpg" alt="Dr. Ágota Svircevic-Bodnár" />
            </div>
          </div>
        </div>
      </section>

      <section className="focus-section">
        <div className="section-grid focus-head">
          <div className="section-index">02</div>
          <div>
            <span className="section-kicker">FOCUS</span>
            <h2>Areas of professional focus</h2>
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
            <span className="section-kicker">PROFESSIONAL CAREER</span>
            <h2>Experience and key milestones throughout my career</h2>
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
          <span className="section-kicker">PRINCIPLES</span>
          <div className="quote-line">
            <span className="quote-mark quote-mark-open" aria-hidden="true">„</span>
            <p className="quote-text">Good public administration requires sound legal foundations, precise organisation and a spirit of cooperation and mutual attention.<span className="quote-mark quote-mark-close" aria-hidden="true">”</span></p>
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
