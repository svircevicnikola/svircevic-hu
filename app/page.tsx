const cards = [
  {
    name: (
      <>
        <span className="name-line">DR. SVIRCEVIC</span>
        <span className="name-line">NIKOLA</span>
      </>
    ),
    subtitle: "Személyes oldal · Szakmai pálya",
    image: "/images/nikola.jpg",
    href: "https://nikola.svircevic.hu",
    alt: "Dr. Svircevic Nikola",
    ariaLabel: "Dr. Svircevic Nikola – megnyitás",
  },
  {
    name: (
      <>
        <span className="name-line">DR. SVIRCEVIC-BODNÁR</span>
        <span className="name-line">ÁGOTA</span>
      </>
    ),
    subtitle: "Személyes oldal · Szakmai pálya",
    image: "/images/agota.jpg",
    href: "/agota",
    alt: "Dr. Svircevic-Bodnár Ágota",
    ariaLabel: "Dr. Svircevic-Bodnár Ágota – megnyitás",
  },
  {
    name: (
      <>
        <span className="name-line">SVIRCEVIC</span>
        <span className="name-line">NIKOLA STEVAN</span>
      </>
    ),
    subtitle: "Gaming · Tech · Közösség",
    image: "/images/nikola-stevan.jpg",
    href: "https://nikola.stevan.svircevic.hu",
    alt: "Svircevic Nikola Stevan",
    ariaLabel: "Svircevic Nikola Stevan – megnyitás",
  },
  {
    name: <span className="name-line">CSALÁDUNK</span>,
    subtitle: "Otthon · Élmények · Emlékek",
    image: "/images/family.jpg",
    href: "https://family.svircevic.hu",
    alt: "Svircevic család",
    ariaLabel: "Családunk – megnyitás",
  },
] as const;

export default function Home() {
  return (
    <main className="page-shell">
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
