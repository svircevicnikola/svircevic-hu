"use client";

import { useEffect, useRef, useState } from "react";
import "./nikola.css";

const career = [
  { period: "2022.10. – jelenleg", role: "Megyei aljegyző", org: "Bács-Kiskun Vármegyei Önkormányzati Hivatal", text: "Jogi, szervezeti és igazgatási feladatok, közgyűlési előkészítés, pályázati és beszerzési ügyek, területi koordináció." },
  { period: "2020.02. – 2022.10.", role: "Jegyző", org: "Jászkarajenői Polgármesteri Hivatal", text: "Hivatalvezetés, szervezet- és intézményfejlesztés, projektek törvényességi felügyelete." },
  { period: "2021.03. – 2022.09.", role: "Ügyvezető", org: "Jászkarajenői Szolgáltató Nonprofit Kft.", text: "Önkormányzati tulajdonú társaság vezetése, vállalkozás üzemeltetés, projektmenedzsment." },
  { period: "2020.03. – jelenleg", role: "Kamarai jogtanácsos", org: "Kecskeméti Ügyvédi Kamara", text: "Jogi képviselet és tanácsadás, peres képviselet." },
  { period: "2017.01. – 2020.01.", role: "Jogi szakreferens", org: "Bács-Kiskun Megyei Kormányhivatal", text: "Jogszerűségi ellenőrzés, Compliance, Vezetőtámogatás." },
  { period: "2006.02. – 2016.12.", role: "Jogi referens, kérelmezési szakreferens", org: "Mezőgazdasági és Vidékfejlesztési Hivatal (MVH)", text: "Uniós és hazai agrártámogatások adminisztratív ellenőrzése, jogorvoslati kérelmek elbírálása." },
];

const areas = [
  ["KÖZIGAZGATÁS", "ÉS ÖNKORMÁNYZATOK"],
  ["UNIÓS FORRÁSOK", "ÉS PROJEKTEK"],
  ["KÖZBESZERZÉS", "ÉS ELLENŐRZÉS"],
  ["JOGI TANÁCSADÁS", "ÉS JOGVÉDELEM"],
  ["SZERVEZÉS", "ÉS EGYÜTTMŰKÖDÉS"],
] as const;

export default function NikolaPage() {
  const stageRef = useRef<HTMLElement | null>(null);
  const [stageHeight, setStageHeight] = useState(0);
  useEffect(() => {
    const update = () => setStageHeight(stageRef.current?.scrollHeight || 0);
    update();
    const observer = stageRef.current ? new ResizeObserver(update) : null;
    if (stageRef.current && observer) observer.observe(stageRef.current);
    window.addEventListener("resize", update);
    return () => { observer?.disconnect(); window.removeEventListener("resize", update); };
  }, []);
  const scale = typeof window !== "undefined" && window.matchMedia("(pointer: fine) and (min-width: 901px)").matches ? 0.9 : 1;
  return (
    <div className="nikola-viewport" style={scale < 1 && stageHeight ? { height: stageHeight * scale } : undefined}>
      <main ref={stageRef} className="nikola-page" style={{ transform: `scale(${scale})` }}>
        <nav className="nikola-nav" aria-label="Fő navigáció">
          <a className="monogram" href="/">SN</a>
          <div className="nav-links"><a href="#rolam">RÓLAM</a><a href="#palya">PÁLYA</a><a href="#teruletek">SZAKMAI TERÜLETEK</a><a href="#publikaciok">PUBLIKÁCIÓK</a><a href="#kapcsolat">KAPCSOLAT</a></div>
          <div className="nav-lang"><span /> HU <b>|</b> EN</div>
        </nav>
        <section className="nikola-hero">
          <div className="hero-photo"><img src="/images/nikola-hero-reference.png" alt="Dr. Svircevic Nikola" /></div>
          <div className="hero-copy"><span className="eyebrow">DR.</span><h1>SVIRCEVIC<br />NIKOLA</h1><div className="gold-rule" /><div className="qualification">JOGÁSZ-KÖZGAZDÁSZ</div><p>Több mint húsz éve dolgozom jogi és közigazgatási területen. Pályám során önkormányzati, területi államigazgatási és szakértői feladatokban egyaránt szereztem tapasztalatot. Érdeklődési területeim a közigazgatás működése, a jog, a gazdasági összefüggések, az uniós források és a közbeszerzések.</p><div className="hero-actions"><a className="primary" href="#rolam">RÓLAM →</a><a className="secondary" href="#kapcsolat">KAPCSOLAT</a></div></div>
        </section>
        <section className="expertise-strip" aria-label="Szakmai fókusz"><SkillItem kind="book" top="JOGI" bottom="SZAKÉRTELEM" /><SkillItem kind="document" top="KÖZIGAZGATÁSI" bottom="TAPASZTALAT" /><SkillItem kind="layers" top="PROJEKTEK" bottom="ÉS PÁLYÁZATOK" /><SkillItem kind="handshake" top="KÖZBESZERZÉS" bottom="ÉS ELLENŐRZÉS" /><SkillItem kind="people" top="EGYÜTTMŰKÖDÉS" bottom="ÉS SZERVEZÉS" /></section>
        <section className="about-section" id="rolam"><div className="about-copy"><SectionTitle title="RÓLAM" /><p>Jogász-közgazdász végzettségű szakember vagyok, aki több mint húsz éve dolgozik a közigazgatás különböző szintjein. Tapasztalatot szereztem önkormányzati, területi államigazgatási és szakértői feladatokban.</p><p>A munkám során fontosnak tartom a jogi és gazdasági szempontok együttes érvényesítését, a szabályozott, átlátható működést, valamint a projektek és fejlesztések hatékony megvalósítását.</p><div className="stats"><Stat number="20+" label="év szakmai tapasztalat" /><Stat number="3" label="szintű közigazgatási rálátás" /><Stat number="4" label="év projektvezetői gyakorlat" /><Stat number="2" label="év cégvezetői tapasztalat" /></div></div><div className="about-photo"><img src="/images/kecskemet-styled.jpg" alt="Kecskemét" /></div></section>
        <section className="career-section" id="palya"><div className="career-main"><SectionTitle title="PÁLYA" /><div className="timeline">{career.map((item) => <div className="career-item" key={`${item.period}-${item.role}`}><div className="period">{item.period}</div><div><h3>{item.role}</h3><strong>{item.org}</strong><p>{item.text}</p></div></div>)}</div></div><aside className="quote-panel" aria-label="Idézet"><div className="quote-content"><div className="quote-mark">„</div><p>A jog, a közigazgatás és a gazdasági szemlélet egymást kiegészítve adnak valódi megoldásokat a mindennapi feladatokhoz.</p><div className="gold-rule" /></div></aside></section>
        <section className="areas-section" id="teruletek"><SectionTitle title="SZAKMAI TERÜLETEK" dark /><div className="areas-grid">{areas.map(([a,b]) => <article key={a}><div className="area-image" aria-hidden="true" /><h3><span>{a}</span><span>{b}</span></h3></article>)}</div></section>
        <footer className="nikola-footer" id="kapcsolat"><span><a className="footer-home" href="/">← VISSZA A FŐOLDALRA</a><span className="footer-name">DR. SVIRCEVIC NIKOLA</span></span><span className="footer-rule" /><span>KECSKEMÉT</span><span>|</span><a className="footer-linkedin" id="publikaciok" href="https://www.linkedin.com/in/nikola-svircevic" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profil">in</a></footer>
      </main>
    </div>
  );
}
function SectionTitle({ title, dark = false }: { title: string; dark?: boolean }) { return <div className={`section-title${dark ? " dark" : ""}`}><h2>{title}</h2><span /></div>; }
function Stat({ number, label }: { number: string; label: string }) { return <div className="stat"><strong>{number}</strong><span>{label}</span></div>; }
function SkillItem({ kind, top, bottom }: { kind: "book" | "document" | "layers" | "handshake" | "people"; top: string; bottom: string }) { return <div><SkillIcon kind={kind} /><span className="skill-label"><strong>{top}</strong><span>{bottom}</span></span></div>; }
function SkillIcon({ kind }: { kind: "book" | "document" | "layers" | "handshake" | "people" }) {
  const common = { width: 34, height: 34, viewBox: "0 0 34 34", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "skill-icon", "aria-hidden": true } as const;
  if (kind === "book") return <svg {...common}><path d="M5 7.5c4.5-2 8.5-1.2 12 1.7v17c-3.5-2.9-7.5-3.7-12-1.7v-17Z" stroke="currentColor" strokeWidth="1.5"/><path d="M29 7.5c-4.5-2-8.5-1.2-12 1.7v17c-3.5-2.9-7.5-3.7-12-1.7v-17Z" stroke="currentColor" strokeWidth="1.5"/><path d="M17 9.2v16.9" stroke="currentColor" strokeWidth="1.5"/></svg>;
  if (kind === "document") return <svg {...common}><path d="M8 4h12l6 6v20H8V4Z" stroke="currentColor" strokeWidth="1.5"/><path d="M20 4v7h6M12 15h10M12 20h10M12 25h7" stroke="currentColor" strokeWidth="1.5"/></svg>;
  if (kind === "layers") return <svg {...common}><path d="m17 5 12 7-12 7L5 12l12-7Z" stroke="currentColor" strokeWidth="1.5"/><path d="m7 17 10 6 10-6M7 23l10 6 10-6" stroke="currentColor" strokeWidth="1.5"/></svg>;
  if (kind === "handshake") return <svg {...common}><path d="m4 12 6-5 6 4 4-3 10 7-5 7-7-5-4 4-10-9Z" stroke="currentColor" strokeWidth="1.5"/><path d="m10 15 4 3 3-3m-7 4 2 2m7-9 4 3" stroke="currentColor" strokeWidth="1.5"/></svg>;
  return <svg {...common}><circle cx="17" cy="9" r="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="7.5" cy="14" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="26.5" cy="14" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M9 29c.7-5.1 3.3-8 8-8s7.3 2.9 8 8M2 28c.4-3.5 2.2-5.5 5.5-5.5 1.2 0 2.2.3 3 .8M32 28c-.4-3.5-2.2-5.5-5.5-5.5-1.2 0-2.2 3 .?" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
