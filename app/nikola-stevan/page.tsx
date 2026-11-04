"use client";

import { useEffect, useState } from "react";
import "./stevan.css";

type InterestId = "math" | "science" | "drums" | "basketball" | "kayak" | "chess" | "code" | "hiking";
type GamePanel = "games" | "highlights" | "setup";

const robloxGames = [
  { title: "Forsaken Combat", href: "https://www.roblox.com/games/126815230666914/Forsaken-Combat", image: "https://tr.rbxcdn.com/180DAY-12174c302f10e7ac87727fdd0f18de2e/500/280/Image/Jpeg/noFilter" },
  { title: "Forsaken", href: "https://www.roblox.com/games/18687417158/Forsaken", image: "https://static.wikia.nocookie.net/forsaken2024/images/4/42/JasonIcon.webp/revision/latest?cb=20250620161357" },
  { title: "RIVALS", href: "https://www.roblox.com/games/17625359962/RIVALS", image: "https://tr.rbxcdn.com/180DAY-0379e61f5a8aebd28371e80dd76189a6/500/280/Image/Jpeg/noFilter" },
  { title: "The Backrooms With Guns", href: "https://www.roblox.com/games/8455137364/The-Backrooms-With-Guns", image: "https://tr.rbxcdn.com/180DAY-bf93048a8b5b21d6a958beea6ef85504/500/280/Image/Jpeg/noFilter" },
  { title: "99 Nights in the Forest", href: "https://www.roblox.com/games/6316982564/99-Nights-in-the-Forest", image: "https://fnaffree.io/data/image/game/99-nights-in-the-forest/99-nights-in-the-forest.png" },
  { title: "Last: Memories", href: "https://www.roblox.com/games/86022723355936/Last-Memories", image: "https://tr.rbxcdn.com/180DAY-7c784e5b519599cf6b9dd0eaad26ad02/500/280/Image/Jpeg/noFilter" }
] as const;

const steamGames = [
  { title: "Geometry Dash", href: "https://store.steampowered.com/app/322170/", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/322170/header.jpg" },
  { title: "Might & Magic: Heroes VI", href: "https://store.steampowered.com/app/48220/", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/48220/header.jpg" },
  { title: "Bloons TD 6", href: "https://store.steampowered.com/app/960090/", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/960090/header.jpg" },
  { title: "Baldur's Gate 3", href: "https://store.steampowered.com/app/1086940/", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg" },
  { title: "Heroes of Might and Magic: Olden Era", href: "https://store.steampowered.com/app/3105440/", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3105440/header.jpg" }
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


function PlatformMark({ platform }: { platform: "roblox" | "xbox" | "steam" }) {
  if (platform === "roblox") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><g transform="rotate(18 24 24)"><rect x="6" y="6" width="36" height="36" rx="2" fill="currentColor"/><rect x="18" y="18" width="12" height="12" fill="#071012"/></g></svg>;
  }
  if (platform === "xbox") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="currentColor"/><path d="M10 12c6 0 11 4 14 8 3-4 8-8 14-8-4 4-7 9-9 13 3 4 6 8 9 12-6 0-11-4-14-8-3 4-8 8-14 8 3-4 6-8 9-12-2-4-5-9-9-13Z" fill="#081315"/></svg>;
  }
  return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="5"/><circle cx="18" cy="19" r="7" fill="none" stroke="currentColor" strokeWidth="4"/><path d="M22 23 33 33m-3-8 6-6m-9 3 6-6" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><circle cx="18" cy="19" r="2" fill="currentColor"/></svg>;
}

function MixControllerArt() {
  return <svg viewBox="0 0 280 170" fill="none" aria-hidden="true"><path d="M69 39h142c19 0 31 11 37 30l20 62c6 20-9 30-25 19l-42-31H79l-42 31c-16 11-31 1-25-19l20-62c6-19 18-30 37-30Z" stroke="currentColor" strokeWidth="7" strokeLinejoin="round"/><path d="M75 66v38M56 85h38" stroke="currentColor" strokeWidth="9" strokeLinecap="round"/><circle cx="188" cy="72" r="7" fill="currentColor"/><circle cx="211" cy="91" r="7" fill="currentColor"/><circle cx="166" cy="91" r="7" fill="currentColor"/><circle cx="188" cy="110" r="7" fill="currentColor"/></svg>;
}

function GameExpansion({ panel, onClose }: { panel: GamePanel; onClose: () => void }) {
  return (
    <div className="stevan-game-expansion" id="stevan-game-expansion" key={panel}>
      {panel === "games" ? (
        <>
          <header className="stevan-mix-header">
            <div className="stevan-mix-header-icon"><MixControllerArt /></div>
            <div className="stevan-mix-header-copy">
              <span>TEAM NIKOLA / PLAYER COLLECTION</span>
              <h2>GAMES IN THE <b>MIX.</b></h2>
              <p>Játékok, platformok, élmények — egy helyen.</p>
            </div>
            <div className="stevan-mix-header-art"><MixControllerArt /></div>
            <button className="stevan-mix-close" type="button" onClick={onClose} aria-label="Tartalom bezárása">CLOSE ×</button>
          </header>

          <div className="stevan-mix-body">
            <aside className="stevan-mix-sidebar">
              <div className="stevan-mix-player">
                <img src="https://www.roblox.com/headshot-thumbnail/image?userId=2651064775&width=420&height=420&format=png" alt="TeamNikola Roblox-avatárja" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                <span className="stevan-mix-online-dot" />
                <h3>TeamNikola</h3>
                <p>GAMER PROFILE</p>
              </div>
              <nav className="stevan-mix-nav" aria-label="Játékplatformok">
                <a href="#mix-roblox"><PlatformMark platform="roblox"/><span>ROBLOX</span><i>↗</i></a>
                <a href="#mix-xbox"><PlatformMark platform="xbox"/><span>XBOX / MINECRAFT</span><i>↗</i></a>
                <a href="#mix-steam"><PlatformMark platform="steam"/><span>STEAM</span><i>↗</i></a>
              </nav>
              <div className="stevan-mix-sidebar-foot"><span className="stevan-status-dot"/> PLAY · THINK · CREATE</div>
            </aside>

            <div className="stevan-platform-grid">
              <section className="stevan-platform-card stevan-platform-roblox" id="mix-roblox" aria-label="Roblox játékok">
                <div className="stevan-platform-heading">
                  <div className="stevan-platform-brand"><PlatformMark platform="roblox"/><span>ROBLOX</span></div>
                  <a className="stevan-platform-account" href="https://www.roblox.com/users/2651064775/profile" target="_blank" rel="noreferrer">
                    <b>TeamNikola</b><small>@snikola32</small>
                  </a>
                </div>
                <div className="stevan-roblox-games-grid">
                  {robloxGames.map((game) => (
                    <a className="stevan-roblox-game" href={game.href} key={game.title} target="_blank" rel="noreferrer">
                      <img src={game.image} alt={game.title + " Roblox-játék képe"} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                      <span>{game.title}</span>
                    </a>
                  ))}
                </div>
              </section>

              <section className="stevan-platform-card stevan-platform-xbox" id="mix-xbox" aria-label="Xbox játékok">
                <div className="stevan-platform-heading">
                  <div className="stevan-platform-brand"><PlatformMark platform="xbox"/><span>XBOX</span></div>
                  <span className="stevan-platform-account"><b>TeamNikola</b></span>
                </div>
                <div className="stevan-xbox-featured">
                  <a className="stevan-xbox-game stevan-xbox-game-large" href="https://www.xbox.com/en-US/games/store/minecraft/9MVXMVT8ZKWC" target="_blank" rel="noreferrer">
                    <img src="https://www.nintendo.com/eu/media/images/11_square_images/games_18/nintendo_switch_5/SQ_NSwitch_Minecraft.jpg" alt="Minecraft" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                    <span>MINECRAFT</span>
                  </a>
                  <a className="stevan-xbox-game stevan-xbox-game-large" href="https://www.xbox.com/en-US/games/store/minecraft-dungeons-ii/9P5786PJB9RP" target="_blank" rel="noreferrer">
                    <img src="https://www.minecraft.net/content/dam/minecraftnet/games/spicewood/key-art/Homepage_Discover-our-games_MC-Spicewood-KeyArt_864x864.jpg.jpg" alt="Minecraft Dungeons II" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                    <span>DUNGEONS II</span>
                  </a>
                </div>
                <div className="stevan-xbox-secondary">
                  <a className="stevan-xbox-game stevan-xbox-game-small" href="https://www.xbox.com/en-US/games/store/minecraft-dungeons/9N8NJ74FZTG9" target="_blank" rel="noreferrer">
                    <img src="https://www.minecraft.net/content/dam/minecraftnet/games/dungeons/key-art/Homepage_Discover-our-games_MC-Dungeons-KeyArt_864x864.jpg" alt="Minecraft Dungeons" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                    <span>DUNGEONS</span>
                  </a>
                  <a className="stevan-xbox-game stevan-xbox-game-small" href="https://www.minecraft.net/en-us/download" target="_blank" rel="noreferrer">
                    <img src="https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/logos/icon_javaedition.jpg" alt="Minecraft Java Edition" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                    <span>MINECRAFT JAVA</span>
                  </a>
                </div>
              </section>

              <section className="stevan-platform-card stevan-platform-steam" id="mix-steam" aria-label="Steam játékok">
                <div className="stevan-platform-heading">
                  <div className="stevan-platform-brand"><PlatformMark platform="steam"/><span>STEAM</span></div>
                  <span className="stevan-platform-account"><b>TeamNikola</b></span>
                </div>
                <div className="stevan-steam-games-grid">
                  {steamGames.map((game) => (
                    <a className="stevan-steam-game" href={game.href} key={game.title} target="_blank" rel="noreferrer">
                      <img src={game.image} alt={game.title + " Steam-borító"} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                      <span>{game.title}</span>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="stevan-game-expansion-top">
            <span>{panel === "highlights" ? "PLAYER MODE / HIGHLIGHTS" : "PLAYER MODE / SETUP"}</span>
            <button type="button" onClick={onClose} aria-label="Tartalom bezárása">CLOSE ×</button>
          </div>
          {panel === "highlights" ? (
            <div className="stevan-game-empty">
              <span>GAMEPLAY HIGHLIGHTS</span><h3>CLIPS. MOMENTS. WINS.</h3>
              <p>Videók, klipek és emlékezetes játékpillanatok helye.</p>
              <small>HIGHLIGHTS CAN BE ADDED HERE</small>
            </div>
          ) : (
            <div className="stevan-game-empty">
              <span>GAMING SETUP</span><h3>THE PLAYER STATION.</h3>
              <p>Eszközök, perifériák és a saját játékállomás bemutatása.</p>
              <small>SETUP DETAILS CAN BE ADDED HERE</small>
            </div>
          )}
        </>
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
        <a className="stevan-footer-brand" href="#top">TEAM <span>NIKOLA</span></a>
        <span>GAMING · TECH · CURIOSITY</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>

      {activeInterest && <InterestModal interest={activeInterest} onClose={() => setActiveInterest(null)} />}
    </main>
  );
}
