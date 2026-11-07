"use client";

import { useEffect, useState } from "react";
import "./stevan.css";

type InterestId = "math" | "science" | "drums" | "basketball" | "kayak" | "chess" | "code" | "hiking";
type GamePanel = "games" | "highlights" | "setup";

const robloxGames = [
  { title: "Forsaken Combat", placeId: "126815230666914", href: "https://www.roblox.com/games/126815230666914/Forsaken-Combat" },
  { title: "Forsaken", placeId: "18687417158", href: "https://www.roblox.com/games/18687417158/Forsaken" },
  { title: "RIVALS", placeId: "17625359962", href: "https://www.roblox.com/games/17625359962/RIVALS" },
  { title: "The Backrooms With Guns", placeId: "8455137364", href: "https://www.roblox.com/games/8455137364/The-Backrooms-With-Guns" },
  { title: "99 Nights in the Forest", placeId: "79546208627805", href: "https://www.roblox.com/games/79546208627805/99-Nights-in-the-Forest" },
  { title: "Last: Memories", placeId: "86022723355936", href: "https://www.roblox.com/games/86022723355936/Last-Memories" }
] as const;

const steamGames = [
  { title: "Geometry Dash", href: "https://store.steampowered.com/app/322170/", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/322170/header.jpg" },
  { title: "Bloons TD 6", href: "https://store.steampowered.com/app/960090/", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/960090/header.jpg" },
  { title: "Baldur's Gate 3", href: "https://store.steampowered.com/app/1086940/", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg" },
  { title: "Heroes of Might and Magic: Olden Era", href: "https://store.steampowered.com/app/3105440/", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3105440/header.jpg" },
  { title: "Might & Magic: Heroes VI", href: "https://store.steampowered.com/app/48220/", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/48220/header.jpg" }
] as const;

const gamingSetupItems = [
  { icon: "cpu", category: "PROCESSZOR", name: "AMD Ryzen 9 9900X", detail: "AMD Ryzen 9000 Series", href: "https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-9-9900x.html" },
  { icon: "board", category: "ALAPLAP", name: "ASUS TUF GAMING B850M-PLUS", detail: "AMD B850 · AM5", href: "https://www.asus.com/hu/motherboards-components/motherboards/tuf-gaming/tuf-gaming-b850m-plus/" },
  { icon: "memory", category: "MEMÓRIA", name: "Kingston FURY Beast", detail: "32 GB KIT · DDR5 · 6000 MT/s · CL30 · Black EXPO", href: "https://www.kingston.com/en/memory/gaming/kingston-fury-beast-ddr5-memory" },
  { icon: "gpu", category: "VIDEÓKÁRTYA", name: "PowerColor Hellhound White RX 9070 XT", detail: "16 GB · RX9070XT 16G-L/OC-WH PCX", href: "https://www.powercolor.com/product-detail232.htm" },
  { icon: "cooling", category: "FOLYADÉKHŰTÉS", name: "MSI MAG CORELIQUID A13 360", detail: "360 mm · 306-7ZWDA11-L80", href: "https://www.msi.com/Liquid-Cooling/MAG-CORELIQUID-A13-360" },
  { icon: "ssd", category: "SSD", name: "Kingston KC3000", detail: "1 TB · M.2 2280 · NVMe · SKC3000S/1024G", href: "https://www.kingston.com/en/ssd/kc3000-nvme-m2-solid-state-drive" },
  { icon: "power", category: "TÁPEGYSÉG", name: "GIGABYTE AORUS ELITE", detail: "GP-AE1000PM PG5 · 1000 W · 80+ Platinum", href: "https://www.gigabyte.com/Power-Supply/GP-AE1000PM-PG5-rev-10" },
  { icon: "case", category: "HÁZ", name: "ENDORFY Arx 700 ARGB", detail: "ARGB", href: "https://endorfy.com/en/product/arx-700-argb/" },
  { icon: "monitor", category: "MONITOR", name: "MSI G27CQ4 E2", detail: "27 hüvelykes · ívelt monitor", href: "" },
  { icon: "console", category: "KONZOL", name: "Xbox One", detail: "Játékkonzol", href: "" }
] as const;

const contactChannels = [
  { id: "messenger", label: "Messenger", kind: "PROFIL / KAPCSOLAT", hint: "Messenger-profil vagy elérési link" },
  { id: "discord", label: "Discord", kind: "FELHASZNÁLÓNÉV", hint: "Discord felhasználónév" },
  { id: "roblox", label: "Roblox", kind: "FELHASZNÁLÓNÉV", hint: "Roblox azonosító" },
  { id: "xbox", label: "Xbox", kind: "GAMERTAG", hint: "Xbox gamertag" },
  { id: "minecraft", label: "Minecraft", kind: "SZERVER", hint: "Minecraft szervercím vagy IP" }
] as const;

type ContactId = (typeof contactChannels)[number]["id"];

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

type MathResult = {
  competition: string;
  details: string[];
};

type MathResultsByGrade = {
  grade: string;
  results: MathResult[];
};

type DrumVideo = { id: string; fileName: string; fileId: string };
type GoogleDriveFileList = { files?: Array<{ id: string; name: string; mimeType?: string }> };

function drumPerformanceTitle(fileName: string) {
  const date = fileName.match(/(\d{4})(\d{2})(\d{2})/);
  return date ? `Fellépés · ${date[1]}. ${date[2]}. ${date[3]}.` : "Fellépés";
}

const drumFolderId = "1AbUN60lNWcps1BO7tyuGpLqu5KQNLekw";

const scienceChannels = [
  { title: "Tanulom Magam", href: "https://www.youtube.com/@TanulomMagam", topics: "Érdekes kérdések, ember és világ", language: "MAGYAR" },
  { title: "Zseni Leszek", href: "https://www.youtube.com/results?search_query=Zseni+Leszek", topics: "Tanulás és tudomány", language: "MAGYAR" },
  { title: "Szertár", href: "https://www.youtube.com/results?search_query=Szert%C3%A1r", topics: "Kísérletek és tudomány", language: "MAGYAR" },
  { title: "Zanza TV", href: "https://www.youtube.com/results?search_query=Zanza+TV", topics: "Tudás röviden, érthetően", language: "MAGYAR" },
  { title: "Vicc Elek", href: "https://www.youtube.com/results?search_query=Vicc+Elek", topics: "Érdekes és vicces videók", language: "MAGYAR" },
  { title: "Tízes Lista", href: "https://www.youtube.com/@tizeslista_hu", topics: "Tudomány, történelem, érdekességek", language: "MAGYAR" },
  { title: "Kurzgesagt – In a Nutshell", href: "https://www.youtube.com/@kurzgesagt", topics: "Tudomány, űrkutatás, biológia, technológia", language: "ANGOL", description: "Látványos animációk és igényes magyarázatok a világ működéséről, a fekete lyukakról és a jövő technológiájáról." },
  { title: "TED-Ed", href: "https://www.youtube.com/@TEDEd", topics: "Tudomány, történelem, logika", language: "ANGOL", description: "Rövid, animált magyarázatok érdekes kérdésekről, gyakran meglepő válaszokkal." },
  { title: "Veritasium", href: "https://www.youtube.com/@veritasium", topics: "Fizika, matematika, kísérletek", language: "ANGOL", description: "Látványos kísérletek és tudományos magyarázatok, amelyek gondolkodásra késztetnek." },
  { title: "Mark Rober", href: "https://www.youtube.com/@MarkRober", topics: "Mérnöki tudomány, fizika, robotika", language: "ANGOL", description: "Látványos kísérletek, szerkezetek és mérnöki megoldások, szórakoztatóan." },
  { title: "SmarterEveryDay", href: "https://www.youtube.com/@smartereveryday", topics: "Fizika, technológia, mérnöki tudomány", language: "ANGOL", description: "Hétköznapi jelenségek tudományos szemmel, gyakran lassított felvételekkel." },
  { title: "SciShow", href: "https://www.youtube.com/@SciShow", topics: "Biológia, kémia, fizika, tudomány", language: "ANGOL", description: "Változatos, közérthető tudományos magyarázatok." },
] as const;

const mathResultsByGrade: MathResultsByGrade[] = [
  {
    grade: "4. évfolyam",
    results: [
      {
        competition: "XXII. Bonifert Domonkos Nemzetközi Matematikaverseny",
        details: ["Kiemelt 1. helyezés"],
      },
      {
        competition: "MATEGYE Megyei Matematikaverseny",
        details: ["1. helyezés"],
      },
      {
        competition: "Agyban Nagy Matematikaverseny",
        details: ["Országos · 3. helyezés"],
      },
      {
        competition: "Kalmár László Matematikaverseny",
        details: ["Vármegyei · 3. helyezés", "Országos · 22. helyezés"],
      },
      {
        competition: "Bolyai Matematika Csapatverseny",
        details: ["Vármegyei csapatverseny · 2. helyezés"],
      },
      {
        competition: "Nemzetközi Kenguru Matematikaverseny",
        details: ["Vármegyei · 5. helyezés"],
      },
      {
        competition: "Abacus Matematikai Pontverseny",
        details: ["27. helyezés"],
      },
    ],
  },
  {
    grade: "3. évfolyam",
    results: [
      {
        competition: "Kalmár László Matematikaverseny",
        details: ["Vármegyei forduló · 1. helyezés", "Országos · 14. helyezés"],
      },
      {
        competition: "Nemzetközi Kenguru Matematikaverseny",
        details: ["Országos · 15. helyezés", "6. legmagasabb pontszám"],
      },
      {
        competition: "Zrínyi Ilona Matematikaverseny",
        details: ["Vármegyei csoportos · 1. helyezés", "Egyéni · 4. helyezés"],
      },
      {
        competition: "MATEGYE Vármegyei Matematikaverseny",
        details: ["7. helyezés", "6. legmagasabb pontszám"],
      },
      {
        competition: "MATEGYE Internetes verseny",
        details: ["Országos · 16. helyezés"],
      },
      {
        competition: "Agyban Nagy Matematikaverseny",
        details: ["Országos csapatverseny · 5. helyezés"],
      },
      {
        competition: "Bendegúz Akadémia – V. MatekÁSZ tanulmányi verseny",
        details: ["Vármegyei forduló · 1. helyezés", "Országos · 24. helyezés"],
      },
      {
        competition: "Bendegúz Akadémia – Tudásbajnokság, matematika",
        details: ["Vármegyei forduló · 2. helyezés", "Arany fokozat"],
      },
      {
        competition: "Abacus Matematikai Pontverseny",
        details: ["200/210 pont", "16. helyezés"],
      },
    ],
  },
  {
    grade: "2. évfolyam",
    results: [
      {
        competition: "Bendegúz Akadémia – Tudásbajnokság, matematika (2. tárgy)",
        details: ["Vármegyei forduló · 2. helyezés", "Arany fokozatú elismerés · 2023–2024-es versenyév", "Szeged · 2024. március 22."],
      },
      {
        competition: "Bendegúz Gyermek- és Ifjúsági Akadémia – IV. matekÁSZ",
        details: ["Vármegyei forduló · 1. helyezés", "2024. február 23."],
      },
    ],
  },
];

const interests: Interest[] = [
  {
    id: "math", number: "01", title: "Matematika", subtitle: "LOGIC · CHALLENGE", mark: "∑",
    size: "large", description: "Logika, koncentráció, problémamegoldás.",
    detail: "Matekpályák teljesítve — jöhetnek az eredmények!"
  },
  {
    id: "science", number: "02", title: "Természettudomány", subtitle: "SCIENCE · DISCOVERY", mark: "⚛",
    size: "small", description: "Kérdések, kísérletek, felfedezések.",
    detail: "Érdekes témák, kísérletek, felfedezések és olyan kérdések, amelyekre érdemes utánajárni."
  },
  {
    id: "drums", number: "03", title: "Dob", subtitle: "RHYTHM · MUSIC", mark: "◖))",
    size: "small", description: "Ritmus, zene és gyakorlás.",
    detail: "Próba, fellépés, kedvenc ritmusok — válassz egy videót, és indul."
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
    detail: "A terv: saját játék. Még tanulom, hogyan rakjam össze."
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

function ContactIcon({ id }: { id: ContactId }) {
  if (id === "messenger") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3C8.8 3 3 8.4 3 15.1c0 3.7 1.8 7 4.8 9.2V29l4.5-2.5c1.2.3 2.4.5 3.7.5 7.2 0 13-5.4 13-12S23.2 3 16 3Z"/><path d="m8.5 19 6-6.3 4.1 3.1 4.9-3.1-6 6.3-4.1-3.1-4.9 3.1Z" fill="#071012"/></svg>;
  }
  if (id === "discord") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M25.7 7.2A24 24 0 0 0 20 5.5l-.7 1.4a21 21 0 0 0-6.6 0L12 5.5a24 24 0 0 0-5.7 1.7C2.7 12.5 1.7 17.7 2.2 22.8a23 23 0 0 0 7 3.5l1.5-2.4-2.3-1.1.6-.5c4.4 2 9.2 2 13.5 0l.6.5-2.3 1.1 1.5 2.4a23 23 0 0 0 7-3.5c.6-5.9-1-11-3.6-15.6ZM11.8 19.3c-1.3 0-2.3-1.2-2.3-2.6s1-2.6 2.3-2.6 2.4 1.2 2.3 2.6c0 1.4-1 2.6-2.3 2.6Zm8.4 0c-1.3 0-2.3-1.2-2.3-2.6s1-2.6 2.3-2.6 2.4 1.2 2.3 2.6c0 1.4-1 2.6-2.3 2.6Z"/></svg>;
  }
  if (id === "roblox") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><g transform="rotate(18 16 16)" fill="none" stroke="currentColor" strokeWidth="4"><rect x="5" y="5" width="22" height="22" rx="1"/><rect x="12" y="12" width="8" height="8" rx=".5" strokeWidth="3"/></g></svg>;
  }
  if (id === "xbox") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2.4"/><path d="M8 8c4.6.2 7.2 3.2 8 4.2.8-1 3.4-4 8-4.2M8 24c2.1-4.8 5.4-8.6 8-10.2 2.6 1.6 5.9 5.4 8 10.2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>;
  }
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 28 9.8v12.4L16 29 4 22.2V9.8L16 3Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M4.8 10.2 16 16.6l11.2-6.4M16 16.6V28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="m10 6.5 12 6.9" stroke="currentColor" strokeWidth="1.5" opacity=".7"/></svg>;
}

function InterestModal({ interest, onClose }: { interest: Interest; onClose: () => void }) {
  const [selectedDrumVideoId, setSelectedDrumVideoId] = useState<string | null>(null);
  const [drumVideos, setDrumVideos] = useState<DrumVideo[]>([]);
  const [drumVideosLoading, setDrumVideosLoading] = useState(false);
  const [drumVideosError, setDrumVideosError] = useState(false);
  const selectedDrumVideo = selectedDrumVideoId ? drumVideos.find((video) => video.id === selectedDrumVideoId) : undefined;
  const drumVideoSrc = selectedDrumVideo && process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY
    ? `https://www.googleapis.com/drive/v3/files/${selectedDrumVideo.fileId}?alt=media&key=${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY}`
    : null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    if (interest.id !== "drums") return;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
    if (!apiKey) {
      setDrumVideosError(true);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      q: `'${drumFolderId}' in parents and trashed = false`,
      fields: "files(id,name,mimeType)",
      pageSize: "100",
      key: apiKey,
    });

    setDrumVideosLoading(true);
    setDrumVideosError(false);
    fetch(`https://www.googleapis.com/drive/v3/files?${params}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("A Drive-mappa nem érhető el.");
        return response.json() as Promise<GoogleDriveFileList>;
      })
      .then((data) => {
        const videos = (data.files ?? [])
          .filter((file) => file.mimeType?.startsWith("video/"))
          .map((file) => ({ id: file.id, fileName: file.name, fileId: file.id }))
          .sort((a, b) => b.fileName.localeCompare(a.fileName));
        setDrumVideos(videos);
        setSelectedDrumVideoId(null);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setDrumVideosError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setDrumVideosLoading(false);
      });

    return () => controller.abort();
  }, [interest.id]);

  return (
    <div className="stevan-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className={interest.id === "math" ? "stevan-modal stevan-modal-math" : interest.id === "drums" ? "stevan-modal stevan-modal-drums" : interest.id === "science" ? "stevan-modal stevan-modal-science" : interest.id === "code" ? "stevan-modal stevan-modal-code" : "stevan-modal"} role="dialog" aria-modal="true" aria-labelledby="interest-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="stevan-modal-close" type="button" onClick={onClose} aria-label="Ablak bezárása">×</button>
        <div className="stevan-modal-mark">{interest.mark}</div>
        <span className="stevan-eyebrow">A JÁTÉKON TÚL · {interest.number}</span>
        <h2 id="interest-modal-title">{interest.title}</h2>
        <p className="stevan-modal-subtitle">{interest.subtitle}</p>
        {interest.id !== "science" && <p className="stevan-modal-copy">{interest.detail}</p>}
        {interest.id === "math" ? (
          <div className="stevan-math-results">
            <div className="stevan-math-results-heading">
              <span>VERSENYEREDMÉNYEK</span>
              <p>Évfolyamonkénti bontás</p>
            </div>
            {mathResultsByGrade.map((grade) => (
              <section className="stevan-math-grade" key={grade.grade} aria-label={grade.grade}>
                <header className="stevan-math-grade-heading">
                  <h3>{grade.grade}</h3>
                  <span>{grade.results.length} adat</span>
                </header>
                <ul className="stevan-math-results-grid">
                  {grade.results.map((result, index) => (
                    <li className="stevan-math-result" key={result.competition + index}>
                      <h4>{result.competition}</h4>
                      <ul className="stevan-math-result-details">
                        {result.details.map((detail) => <li key={detail}>{detail}</li>)}
                      </ul>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : interest.id === "science" ? (
          <div className="stevan-science-channels">
            <section className="stevan-science-group" aria-labelledby="science-hu-heading">
              <h3 id="science-hu-heading"><span>01</span> MAGYAR CSATORNÁK</h3>
              <div className="stevan-science-grid">
                {scienceChannels.filter((channel) => channel.language === "MAGYAR").map((channel) => (
                  <a className="stevan-science-card" href={channel.href} key={channel.title} target="_blank" rel="noreferrer">
                    <span className="stevan-science-card-top"><small>{channel.language}</small><b aria-hidden="true">↗</b></span>
                    <strong>{channel.title}</strong>
                    <span className="stevan-science-topics">{channel.topics}</span>
                  </a>
                ))}
              </div>
            </section>
            <section className="stevan-science-group" aria-labelledby="science-en-heading">
              <h3 id="science-en-heading"><span>02</span> ANGOL CSATORNÁK</h3>
              <div className="stevan-science-grid">
                {scienceChannels.filter((channel) => channel.language.startsWith("ANGOL")).map((channel) => (
                  <a className="stevan-science-card stevan-science-card-english" href={channel.href} key={channel.title} target="_blank" rel="noreferrer">
                    <span className="stevan-science-card-top"><small>{channel.language}</small><b aria-hidden="true">↗</b></span>
                    <strong>{channel.title}</strong>
                    <span className="stevan-science-topics">{channel.topics}</span>
                    {"description" in channel && <span className="stevan-science-description">{channel.description}</span>}
                  </a>
                ))}
              </div>
            </section>
          </div>
        ) : interest.id === "drums" ? (
          <div className="stevan-drum-video">
            <div className="stevan-drum-gallery">
              <div className="stevan-drum-gallery-heading">
                <span>VIDEÓGALÉRIA</span>
                <span>{drumVideosLoading ? "BETÖLTÉS…" : `${drumVideos.length} VIDEÓ`}</span>
              </div>
              <div className="stevan-drum-gallery-grid" aria-label="Dobos videók">
                {drumVideos.map((video) => (
                  <button
                    className={`stevan-drum-gallery-card${video.id === selectedDrumVideoId ? " is-selected" : ""}`}
                    type="button"
                    key={video.id}
                    aria-pressed={video.id === selectedDrumVideoId}
                    onClick={() => setSelectedDrumVideoId(video.id)}
                  >
                    <span className="stevan-drum-gallery-play" aria-hidden="true">▶</span>
                    <span className="stevan-drum-gallery-card-copy">
                      <strong>{drumPerformanceTitle(video.fileName)}</strong>
                    </span>
                    <span className="stevan-drum-gallery-arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </div>
            {drumVideosError && <p className="stevan-drum-empty" role="status">A videómappát most nem sikerült betölteni.</p>}
            {!drumVideosLoading && !drumVideosError && drumVideos.length === 0 && <p className="stevan-drum-empty" role="status">Még nincs videó a mappában.</p>}
            {selectedDrumVideo && drumVideoSrc ? (
              <>
                <span className="stevan-drum-video-label">{drumPerformanceTitle(selectedDrumVideo.fileName)}</span>
                <video key={selectedDrumVideo.id} autoPlay controls playsInline preload="metadata" aria-label={drumPerformanceTitle(selectedDrumVideo.fileName)}>
                  <source src={drumVideoSrc} type="video/mp4" />
                  A böngésző nem tudja lejátszani ezt a videót.
                </video>
              </>
            ) : (
              <p className="stevan-drum-empty" role="status">Kattints egy felvételre, és indul.</p>
            )}
          </div>
        ) : interest.id === "code" ? (
          <div className="stevan-code-content">
            <div className="stevan-code-status">AI status: AFK, saját build készül...</div>
            <section className="stevan-code-section" aria-labelledby="code-tools-heading">
              <h3 id="code-tools-heading">AMIVEL ISMERKEDEM</h3>
              <div className="stevan-code-tools">
                <article className="stevan-code-tool">
                  <strong>Scratch</strong>
                  <span>Vizuális programozás</span>
                </article>
                <article className="stevan-code-tool">
                  <strong>Python</strong>
                  <span>Programozási nyelv</span>
                </article>
                <article className="stevan-code-tool">
                  <strong>C# <small>(C-sharp)</small></strong>
                  <span>Programozási nyelv</span>
                </article>
                <article className="stevan-code-tool">
                  <strong>Visual Studio</strong>
                  <span>Fejlesztőkörnyezet</span>
                </article>
                <article className="stevan-code-tool">
                  <strong>Blender</strong>
                  <span>3D modellezés és animáció</span>
                </article>
              </div>
            </section>
            <section className="stevan-code-projects" aria-labelledby="code-projects-heading">
              <h3 id="code-projects-heading">ELSŐ PROJEKTEK</h3>
              <p>Ahogy elkészülnek az első játékötletek és próbálkozások, itt kapnak helyet.</p>
            </section>
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


function PlatformMark({ platform }: { platform: "roblox" | "xbox" | "steam" }) {
  const src = {
    roblox: "https://cdn.simpleicons.org/roblox/FFFFFF",
    xbox: "/images/platform-xbox.svg",
    steam: "https://cdn.simpleicons.org/steam/FFFFFF"
  }[platform];
  return <img className="stevan-platform-logo" src={src} alt="" aria-hidden="true" />;
}

type RobloxAssetData = { games: Record<string, string> };

function MetricIcon({ kind }: { kind: "gamepad" | "clock" | "trophy" }) {
  if (kind === "gamepad") return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M12 11h16c4.2 0 6.6 2.4 7.5 6.2l2.1 8.4c.8 3.3-1.6 5.4-4.4 3.4l-5.8-4.2H12.6l-5.8 4.2c-2.8 2-5.2-.1-4.4-3.4l2.1-8.4C5.4 13.4 7.8 11 12 11Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
      <path d="M12 17v8M8 21h8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
      <circle cx="27" cy="18" r="1.7" fill="currentColor"/><circle cx="31" cy="22" r="1.7" fill="currentColor"/>
    </svg>
  );
  if (kind === "clock") return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M20 10v10l7 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M13 5h14v7a7 7 0 0 1-14 0V5ZM13 9H7v3a7 7 0 0 0 7 7M27 9h6v3a7 7 0 0 1-7 7M20 19v9m-7 7h14m-7-7v7m-7-7h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function XboxSocialMetric({ value, label, people = false }: { value: string; label: string; people?: boolean }) {
  return (
    <div className="stevan-xbox-social-metric">
      {people && <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="5.5" r="3" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M3.5 17v-1.2a6.5 6.5 0 0 1 13 0V17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>}
      <b>{value}</b><small>{label}</small>
    </div>
  );
}

function GamePlatformCollection({ onClose }: { onClose: () => void }) {
  const [robloxAssets, setRobloxAssets] = useState<RobloxAssetData>({ games: {} });

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/roblox-assets", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Roblox játékikonok nem tölthetők be.");
        return response.json() as Promise<RobloxAssetData>;
      })
      .then((data) => setRobloxAssets({ games: data.games ?? {} }))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="stevan-game-expansion stevan-mix-showcase" id="stevan-game-expansion">
      <button className="stevan-mix-close" type="button" onClick={onClose} aria-label="Tartalom bezárása">×</button>
      <div className="stevan-mix-body">
        <aside className="stevan-mix-sidebar">
          <div className="stevan-mix-player">
            <img className="stevan-mix-player-logo" src="/images/Logo3.png" alt="TeamNikola logó" loading="eager" decoding="async"/>
            <span className="stevan-mix-online-dot"/>
            
          </div>
          <nav className="stevan-mix-nav" aria-label="Játékplatformok">
            <a href="#mix-roblox"><PlatformMark platform="roblox"/><span>ROBLOX</span><i>↗</i></a>
            <a href="#mix-xbox"><PlatformMark platform="xbox"/><span>XBOX / MINECRAFT</span><i>↗</i></a>
            <a href="#mix-steam"><PlatformMark platform="steam"/><span>STEAM</span><i>↗</i></a>
            <a href="https://store.epicgames.com/" target="_blank" rel="noreferrer"><img className="stevan-platform-logo" src="https://cdn.simpleicons.org/epicgames/FFFFFF" alt="" aria-hidden="true"/><span>EPIC GAMES</span><i>↗</i></a>
          </nav>
          <div className="stevan-mix-sidebar-foot"><span className="stevan-status-dot"/> PLAY · THINK · CREATE</div>
        </aside>

        <div className="stevan-platform-grid">
          <section className="stevan-platform-card stevan-platform-roblox" id="mix-roblox" aria-label="Roblox játékok">
            <header className="stevan-platform-heading">
              <div className="stevan-platform-brand"><PlatformMark platform="roblox"/><span>ROBLOX</span></div>
              <a className="stevan-platform-account" href="https://www.roblox.com/users/2651064775/profile" target="_blank" rel="noreferrer">
                <b>TeamNikola</b><small>@snikola32 <i>↗</i></small>
              </a>
            </header>
            <a className="stevan-roblox-hero" href="https://www.roblox.com/users/2651064775/profile" target="_blank" rel="noreferrer" aria-label="TeamNikola Roblox-profilja">
              <img className="stevan-roblox-hero-background" src="/images/roblox-calm-banner.webp" alt="" loading="eager" decoding="async"/>
              <span className="stevan-roblox-hero-shade"/>
              <img className="stevan-roblox-hero-avatar" src="/images/noFilter.webp" alt="TeamNikola Roblox-avatárja" loading="eager" decoding="async"/>
              <i>↗</i>
            </a>
            <div className="stevan-platform-subheading"><span>Kiemelt játékok</span></div>
            <div className="stevan-roblox-games-grid">
              {robloxGames.map((game) => {
                const image = robloxAssets.games[game.placeId];
                return (
                  <a className="stevan-roblox-game" href={game.href} key={game.placeId} target="_blank" rel="noreferrer">
                    <span className="stevan-roblox-game-image">
                      {image ? <img src={image} alt={game.title + " Roblox-játék képe"} loading="lazy" decoding="async"/> : <span className="stevan-roblox-image-loading">LOADING</span>}
                    </span>
                    <span className="stevan-roblox-game-title">{game.title}</span>
                  </a>
                );
              })}
            </div>
          </section>

          <section className="stevan-platform-card stevan-platform-xbox" id="mix-xbox" aria-label="Xbox profil és játékok">
            <header className="stevan-platform-heading">
              <div className="stevan-platform-brand"><PlatformMark platform="xbox"/><span>XBOX</span></div>
              <span className="stevan-platform-account stevan-platform-account-plain"><b>TeamNikola <i>↗</i></b></span>
            </header>
            <div className="stevan-xbox-profile">
              <img className="stevan-xbox-avatar" src="/images/xboxavatar.png" alt="TeamNikola Xbox-avatarja" loading="eager" decoding="async"/>
              <div className="stevan-xbox-profile-main">
                <div className="stevan-xbox-online"><span/>Online</div>
                <div className="stevan-xbox-score"><b>G</b><strong>8 160</strong></div>
              </div>
              <div className="stevan-xbox-social">
                <XboxSocialMetric value="8" label="Barát" people/>
                <XboxSocialMetric value="8" label="Követés"/>
                <XboxSocialMetric value="28" label="Követő"/>
              </div>
            </div>
            <div className="stevan-platform-subheading stevan-xbox-games-heading"><span>Minecraft</span></div>
            <div className="stevan-xbox-featured">
              <a className="stevan-xbox-game stevan-xbox-game-large" href="https://www.xbox.com/en-US/games/store/minecraft/9MVXMVT8ZKWC" target="_blank" rel="noreferrer">
                <img src="https://www.nintendo.com/eu/media/images/11_square_images/games_18/nintendo_switch_5/SQ_NSwitch_Minecraft.jpg" alt="Minecraft" loading="lazy" decoding="async"/>
                <span>MINECRAFT</span>
              </a>
              <a className="stevan-xbox-game stevan-xbox-game-large stevan-xbox-game-dungeons-two" href="https://www.xbox.com/en-us/games/store/_/9P5786PJB9RP" target="_blank" rel="noreferrer">
                <img src="https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/homepage_discover_our_games_mc_dungeons_ii_key_art_864x864.jpg" alt="Minecraft Dungeons II" loading="lazy" decoding="async"/>
                <span>DUNGEONS II</span>
              </a>
            </div>
            <div className="stevan-xbox-secondary">
              <a className="stevan-xbox-game stevan-xbox-game-small" href="https://www.xbox.com/en-US/games/store/minecraft-dungeons/9N8NJ74FZTG9" target="_blank" rel="noreferrer">
                <img src="https://www.minecraft.net/content/dam/minecraftnet/games/dungeons/key-art/Homepage_Discover-our-games_MC-Dungeons-KeyArt_864x864.jpg" alt="Minecraft Dungeons" loading="lazy" decoding="async"/>
                <span>DUNGEONS</span>
              </a>
              <a className="stevan-xbox-game stevan-xbox-game-small" href="https://www.minecraft.net/en-us/download" target="_blank" rel="noreferrer">
                <img src="https://images.igdb.com/igdb/image/upload/t_1080p_2x/co8fu6.webp" alt="Minecraft Java Edition" loading="lazy" decoding="async"/>
                <span>MINECRAFT JAVA EDITION</span>
              </a>
            </div>
          </section>

          <section className="stevan-platform-card stevan-platform-steam" id="mix-steam" aria-label="Steam profil és játékok">
            <header className="stevan-platform-heading">
              <div className="stevan-platform-brand"><PlatformMark platform="steam"/><span>STEAM</span></div>
              <span className="stevan-platform-account stevan-platform-account-plain"><b>TeamNikola <i>↗</i></b></span>
            </header>
            <div className="stevan-steam-summary" aria-label="Steam statisztikák">
              <div className="stevan-steam-metric"><MetricIcon kind="gamepad"/><span><b>40</b><small>Játék</small></span></div>
              <div className="stevan-steam-metric"><MetricIcon kind="clock"/><span><b>4</b><small>Nemrég játszott</small></span></div>
              <div className="stevan-steam-metric"><MetricIcon kind="trophy"/><span><b>0</b><small>Teljesített</small></span></div>
            </div>
            <div className="stevan-platform-subheading stevan-steam-games-heading"><span>Kiemelt játékok</span></div>
            <div className="stevan-steam-games-grid">
              {steamGames.map((game, index) => (
                <a className="stevan-steam-game" href={game.href} key={game.title} target="_blank" rel="noreferrer">
                  <img src={game.image} alt={game.title + " Steam-borító"} loading="lazy" decoding="async"/>
                  <span className="stevan-steam-game-copy">
                    <b>{game.title}</b>
                    <i aria-hidden="true"><span style={{ width: ["72%","46%","34%","9%","13%"][index] }}/></i>
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

type HardwareIconKind = "cpu" | "board" | "memory" | "gpu" | "cooling" | "ssd" | "power" | "case" | "monitor" | "console";

function HardwareIcon({ kind }: { kind: HardwareIconKind }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === "cpu" && (
        <>
          <rect x="12" y="12" width="24" height="24" rx="3"/>
          <rect x="18" y="18" width="12" height="12" rx="1.5"/>
          <path d="M18 5v7m6-7v7m6-7v7M18 36v7m6-7v7m6-7v7M5 18h7m-7 6h7m-7 6h7m24-12h7m-7 6h7m-7 6h7"/>
        </>
      )}
      {kind === "board" && (
        <>
          <rect x="8" y="7" width="32" height="34" rx="2.5"/>
          <rect x="14" y="13" width="12" height="12" rx="1.5"/>
          <path d="M30 13h5m-5 4h5m-5 4h5M14 30h20M14 34h12M12 7V4m6 3V4m6 3V4m6 3V4m6 3V4M12 41v3m8-3v3m8-3v3m8-3v3"/>
          <circle cx="33" cy="31" r="2"/>
        </>
      )}
      {kind === "memory" && (
        <>
          <rect x="5" y="15" width="38" height="17" rx="2.5"/>
          <path d="M11 20h5v7h-5zm9 0h5v7h-5zm9 0h5v7h-5zM10 32v4m6-4v4m6-4v4m6-4v4m6-4v4m6-4v4"/>
          <circle cx="38" cy="19" r="1"/>
        </>
      )}
      {kind === "gpu" && (
        <>
          <path d="M5 14h31l7 6v13H5z"/>
          <circle cx="18" cy="25" r="7"/>
          <circle cx="18" cy="25" r="2"/>
          <path d="M18 18v5m-6-1 4 3m7-3-4 3m-1 7v-5m-6 1 4-3m7 3-4-3M36 20v10m-26 7h26"/>
        </>
      )}
      {kind === "cooling" && (
        <>
          <rect x="5" y="10" width="38" height="28" rx="2.5"/>
          <circle cx="15" cy="24" r="8"/>
          <circle cx="15" cy="24" r="2"/>
          <path d="M15 16v6m-6 2h6m0 0v-6m0 6 5 4m5-14v20m5-20v20m5-20v20M43 16h2m-2 16h2"/>
        </>
      )}
      {kind === "ssd" && (
        <>
          <rect x="7" y="16" width="34" height="16" rx="2.5"/>
          <circle cx="12" cy="24" r="1.5"/>
          <rect x="18" y="20" width="8" height="8" rx="1"/>
          <rect x="29" y="20" width="7" height="8" rx="1"/>
          <path d="M40 20h4v8h-4M9 32v4m5-4v4m5-4v4m5-4v4m5-4v4m5-4v4"/>
        </>
      )}
      {kind === "power" && (
        <>
          <rect x="7" y="9" width="34" height="30" rx="3"/>
          <circle cx="23" cy="24" r="10"/>
          <circle cx="23" cy="24" r="2"/>
          <path d="M23 14v8m-8 2h8m0 0v-8m0 8 7 5m3-15-5 6m-13 6 7-5m-2 11 2-8"/>
        </>
      )}
      {kind === "case" && (
        <>
          <rect x="12" y="5" width="24" height="38" rx="2.5"/>
          <path d="M17 10h14v28H17z"/>
          <circle cx="24" cy="19" r="4.5"/>
          <circle cx="24" cy="19" r="1.2"/>
          <circle cx="24" cy="31" r="4.5"/>
          <circle cx="24" cy="31" r="1.2"/>
          <path d="M31 8h2"/>
        </>
      )}
      {kind === "monitor" && (
        <>
          <rect x="5" y="8" width="38" height="25" rx="2.5"/>
          <path d="M24 33v7m-8 3h16m-8-10-4 7h8l-4-7"/>
          <path d="M10 13h28v15H10z"/>
        </>
      )}
      {kind === "console" && (
        <>
          <path d="M13 17h22c4 0 6 3 7 8l1 7c.5 3-2 4.5-4.5 2.5L32 31H16l-6.5 3.5C7 36 4.5 34.5 5 31l1-7c1-4 3-7 7-7Z"/>
          <path d="M15 22v8m-4-4h8"/>
          <circle cx="31" cy="23" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="36" cy="27" r="1.5" fill="currentColor" stroke="none"/>
        </>
      )}
    </svg>
  );
}

function GameSetupPanel() {
  return (
    <div className="stevan-setup-panel">
      <div className="stevan-setup-intro">
        <span>TEAM NIKOLA / HARDWARE</span>
        <h3>THE PLAYER STATION.</h3>
        <p>A konfiguráció alkatrészei és a játékhoz használt eszközök.</p>
      </div>
      <div className="stevan-setup-grid">
        {gamingSetupItems.map((item) => {
          const content = (
            <>
              <span className="stevan-setup-icon"><HardwareIcon kind={item.icon} /></span>
              <span className="stevan-setup-copy">
                <span className="stevan-setup-category">{item.category}</span>
                <strong>{item.name}</strong>
                <small>{item.detail}</small>
              </span>
              {item.href && <span className="stevan-setup-link-mark" aria-hidden="true">↗</span>}
            </>
          );
          return item.href ? (
            <a className="stevan-setup-item" href={item.href} key={item.category} target="_blank" rel="noreferrer">
              {content}
            </a>
          ) : (
            <div className="stevan-setup-item" key={item.category}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GameExpansion({ panel, onClose }: { panel: GamePanel; onClose: () => void }) {
  if (panel === "games") return <GamePlatformCollection onClose={onClose} />;
  return (
    <div className="stevan-game-expansion" id="stevan-game-expansion">
      <div className="stevan-game-expansion-top">
        <span>{panel === "highlights" ? "PLAYER MODE / HIGHLIGHTS" : "PLAYER MODE / SETUP"}</span>
        <button type="button" onClick={onClose} aria-label="Tartalom bezárása">CLOSE ×</button>
      </div>
      {panel === "highlights" ? (
        <div className="stevan-highlights-panel stevan-highlights-banner">
          <img
            className="stevan-highlights-banner-image"
            src="/images/gameplay-highlights-banner.webp"
            alt="Gameplay Highlights – Clips. Moments. Wins. TeamNikola"
            width="1686"
            height="167"
          />
          <a className="stevan-highlights-hit stevan-highlights-hit-play" href="https://www.youtube.com/@TeamNikola/videos" target="_blank" rel="noreferrer" aria-label="TeamNikola videók megnyitása" />
          <a className="stevan-highlights-hit stevan-highlights-hit-youtube" href="https://www.youtube.com/@TeamNikola" target="_blank" rel="noreferrer" aria-label="YouTube – @TeamNikola" />
          <a className="stevan-highlights-hit stevan-highlights-hit-twitch" href="https://www.twitch.tv/teamnikola" target="_blank" rel="noreferrer" aria-label="Twitch – teamnikola" />
        </div>
      ) : (
        <GameSetupPanel />
      )}
    </div>
  );
}

export default function NikolaStevanPage() {
  const [activeInterest, setActiveInterest] = useState<Interest | null>(null);
  const [activeContact, setActiveContact] = useState<ContactId | null>(null);
  const [activeGamePanel, setActiveGamePanel] = useState<GamePanel | null>(null);

  return (
    <main className="stevan-site">
      <div className="stevan-noise" aria-hidden="true" />
      <header className="stevan-header">
        <a className="stevan-brand" href="#top" aria-label="Team Nikola – főoldal">
          <span className="stevan-brand-icon"><img src="/images/Logo3.png" alt="" /></span>
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
            <button className={`stevan-game-card stevan-game-card-button${activeGamePanel === "games" ? " is-active" : ""}`} type="button" onClick={() => setActiveGamePanel(activeGamePanel === "games" ? null : "games")} aria-expanded={activeGamePanel === "games"} aria-controls="stevan-game-expansion">
              <span className="stevan-game-card-icon">▤</span>
              <span className="stevan-game-card-copy"><h3>GAMES IN THE MIX</h3><p>Játékok, platformok és kedvencek egy helyen.</p></span><span className="stevan-card-arrow">↗</span>
            </button>
            <button className={`stevan-game-card stevan-game-card-button${activeGamePanel === "highlights" ? " is-active" : ""}`} type="button" onClick={() => setActiveGamePanel(activeGamePanel === "highlights" ? null : "highlights")} aria-expanded={activeGamePanel === "highlights"} aria-controls="stevan-game-expansion">
              <span className="stevan-game-card-icon">▶</span>
              <span className="stevan-game-card-copy"><h3>GAMEPLAY HIGHLIGHTS</h3><p>Videók, klipek és emlékezetes játékpillanatok.</p></span><span className="stevan-card-arrow">↗</span>
            </button>
            <button className={`stevan-game-card stevan-game-card-button${activeGamePanel === "setup" ? " is-active" : ""}`} type="button" onClick={() => setActiveGamePanel(activeGamePanel === "setup" ? null : "setup")} aria-expanded={activeGamePanel === "setup"} aria-controls="stevan-game-expansion">
              <span className="stevan-game-card-icon">⌘</span>
              <span className="stevan-game-card-copy"><h3>GAMING SETUP</h3><p>Eszközök, perifériák és a saját játékállomás.</p></span><span className="stevan-card-arrow">↗</span>
            </button>
          </div>
        </div>
        {activeGamePanel && <GameExpansion panel={activeGamePanel} onClose={() => setActiveGamePanel(null)} />}
      </section>

      <section className="stevan-interests" id="interests">
        <div className="stevan-section-heading">
          <div><span className="stevan-eyebrow">02 — CURIOSITY MODE</span><h2>GEEK <span>ZONE.</span></h2></div>
          <p>A játék csak az egyik pálya!<br/>Kíváncsi vagy, mi érdekel még? Nézz körül.</p>
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
        <div className="stevan-about-social">
          <div className="stevan-about-logo-window">
            <img className="stevan-about-logo" src="/images/team-nikola-logo2.png" alt="Team Nikola embléma" />
          </div>
          <div className="stevan-contact-icons" aria-label="Kapcsolati és játékos azonosítók">
            {contactChannels.map((channel) => (
              <button
                className={`stevan-contact-button stevan-contact-${channel.id}${activeContact === channel.id ? " is-active" : ""}`}
                key={channel.id}
                type="button"
                onClick={() => setActiveContact(activeContact === channel.id ? null : channel.id)}
                aria-label={channel.label + " adatok"}
                aria-pressed={activeContact === channel.id}
                aria-expanded={activeContact === channel.id}
                aria-controls="stevan-contact-detail"
              >
                <span className="stevan-contact-icon"><ContactIcon id={channel.id} /></span>
                <span className="stevan-contact-label">{channel.label}</span>
              </button>
            ))}
          </div>
          {activeContact && (
            <div className="stevan-contact-detail" id="stevan-contact-detail" aria-live="polite">
              <span className="stevan-contact-detail-kind">{contactChannels.find((channel) => channel.id === activeContact)?.kind}</span>
              <b>{contactChannels.find((channel) => channel.id === activeContact)?.label}</b>
              <p>{contactChannels.find((channel) => channel.id === activeContact)?.hint}</p>
              <small>AZONOSÍTÓ MÉG NINCS MEGADVA</small>
            </div>
          )}
        </div>
      </section>

      <footer className="stevan-footer">
        <a className="stevan-footer-brand" href="#top">
          <img src="/images/Logo4.png" alt="" />
          <span>TEAM <em>NIKOLA</em></span>
        </a>
        <span>GAMING · TECH · CURIOSITY</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>

      {activeInterest && <InterestModal interest={activeInterest} onClose={() => setActiveInterest(null)} />}
    </main>
  );
}




