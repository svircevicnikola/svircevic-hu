import "./nikola.css";

const career = [
  { period: "2022.10. – jelenleg", role: "Megyei aljegyző", org: "Bács-Kiskun Vármegyei Önkormányzati Hivatal", text: "Jogi, szervezeti és igazgatási feladatok, közgyűlési előkészítés, pályázati és beszerzési ügyek, területi koordináció." },
  { period: "2020.02. – 2022.10.", role: "Jegyző", org: "Jászkarajenői Polgármesteri Hivatal", text: "Hivatalszervezés, munkáltatói jogkör, önkormányzati feladatok ellátása." },
  { period: "2021.03. – 2022.09.", role: "Ügyvezető", org: "Jászkarajenői Szolgáltató Nonprofit Kft.", text: "Önkormányzati tulajdonú társaság vezetése, projektmenedzsment." },
  { period: "2020.03. – jelenleg", role: "Kamarai jogtanácsos", org: "Kecskeméti Ügyvédi Kamara", text: "Jogi képviselet és tanácsadás, peres képviselet." },
  { period: "2017.01. – 2020.01.", role: "Jogi szakreferens", org: "Bács-Kiskun Megyei Kormányhivatal", text: "Jogi feladatok, kérelemkezelés, szabályzatok, ellenőrzés." },
  { period: "2006.02. – 2016.12.", role: "Jogi referens, kérelmezési szakreferens", org: "Mezőgazdasági és Vidékfejlesztési Hivatal (MVH)", text: "EU-s és hazai agrártámogatások kérelmezése, jogorvoslati feladatok." },
];

const areas = [
  ["KÖZIGAZGATÁS", "ÉS ÖNKORMÁNYZATOK", "/area1-img.svg"],
  ["UNIÓS FORRÁSOK", "ÉS PROJEKTEK", "/area2-img.svg"],
  ["KÖZBESZERZÉS", "ÉS ELLENŐRZÉS", "/area3-img.svg"],
  ["JOGI TANÁCSADÁS", "ÉS JOGVÉDELEM", "/area4-img.svg"],
  ["SZERVEZÉS", "ÉS EGYÜTTMŰKÖDÉS", "/area5-img.svg"],
];

export default function NikolaPage() {
  return (
    <main className="nikola-page">
      <nav className="nikola-nav" aria-label="Fő navigáció">
        <a className="monogram" href="/">SN</a>
        <div className="nav-links"><a href="#rolam">RÓLAM</a><a href="#palya">PÁLYA</a><a href="#teruletek">SZAKMAI TERÜLETEK</a><a href="#teruletek">TERÜLETEK</a><a href="#publikaciok">PUBLIKÁCIÓK</a><a href="#kapcsolat">KAPCSOLAT</a></div>
        <div className="nav-lang"><span /> HU <b>|</b> EN</div>
      </nav>

      <section className="nikola-hero">
        <div className="hero-photo"><img src="/nikola-hero.svg" alt="Dr. Svircevic Nikola" /></div>
        <div className="hero-copy"><span className="eyebrow">DR.</span><h1>SVIRCEVIC<br />NIKOLA</h1><div className="gold-rule" /><div className="qualification">JOGÁSZ-KÖZGAZDÁSZ</div><p>Több mint húsz éve dolgozom jogi és közigazgatási területen. Pályám során önkormányzati, területi államigazgatási és szakértői feladatokban egyaránt szereztem tapasztalatot. Érdeklődési területeim a közigazgatás működése, a jog, a gazdasági összefüggések, az uniós források és a közbeszerzések.</p><div className="hero-actions"><a className="primary" href="#rolam">RÓLAM →</a><a className="secondary" href="#kapcsolat">KAPCSOLAT</a></div></div>
      </section>

      <section className="expertise-strip" aria-label="Szakmai fókusz"><div><strong>JOGI</strong><span>SZAKÉRTELEM</span></div><div><strong>KÖZIGAZGATÁSI</strong><span>TAPASZTALAT</span></div><div><strong>PROJEKTEK</strong><span>ÉS PÁLYÁZATOK</span></div><div><strong>KÖZBESZERZÉS</strong><span>ÉS ELLENŐRZÉS</span></div><div><strong>EGYÜTTMŰKÖDÉS</strong><span>ÉS SZERVEZÉS</span></div></section>

      <section className="about-section" id="rolam">
        <div className="about-copy"><SectionTitle title="RÓLAM" /><p>Jogász-közgazdász végzettségű szakember vagyok, aki több mint húsz éve dolgozik a közigazgatás különböző szintjein. Tapasztalatot szereztem önkormányzati, területi államigazgatási és szakértői feladatokban.</p><p>A munkám során fontosnak tartom a jogi és gazdasági szempontok együttes érvényesítését, a szabályozott, átlátható működést, valamint a projektek és fejlesztések hatékony megvalósítását.</p><div className="stats"><Stat number="20+" label="év szakmai tapasztalat" /><Stat number="3" label="szintű közigazgatási rálátás" /><Stat number="4" label="év projektértékelői gyakorlat" /><Stat number="2" label="év cégvezetői tapasztalat" /></div></div>
        <div className="about-photo"><img src="/kecskemet.svg" alt="Kecskemét" /></div>
      </section>

      <section className="career-section" id="palya"><div className="career-main"><SectionTitle title="PÁLYA" /><div className="timeline">{career.map((item) => <div className="career-item" key={`${item.period}-${item.role}`}><div className="period">{item.period}</div><div><h3>{item.role}</h3><strong>{item.org}</strong><p>{item.text}</p></div></div>)}</div></div><aside className="quote-panel"><div className="quote-mark">„</div><p>A jog, a közigazgatás és a gazdasági szemlélet egymást kiegészítve adnak valódi megoldásokat a mindennapi feladatokhoz.</p><div className="gold-rule" /></aside></section>

      <section className="areas-section" id="teruletek"><SectionTitle title="SZAKMAI TERÜLETEK" dark /><div className="areas-grid">{areas.map(([a,b,image]) => <article key={a}><div className="area-image"><img src={image} alt="" /></div><h3>{a}<br />{b}</h3></article>)}</div></section>
      <footer className="nikola-footer" id="kapcsolat"><span>DR. SVIRCEVIC NIKOLA</span><span className="footer-rule" /><span>KECSKEMÉT</span><span>|</span><span id="publikaciok">in</span></footer>
    </main>
  );
}

function SectionTitle({ title, dark = false }: { title: string; dark?: boolean }) { return <div className={`section-title${dark ? " dark" : ""}`}><h2>{title}</h2><span /></div>; }
function Stat({ number, label }: { number: string; label: string }) { return <div className="stat"><strong>{number}</strong><span>{label}</span></div>; }
