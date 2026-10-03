# SVIRCEVIC.HU – Vercel-ready homepage

Ez a projekt a `svircevic.hu` kezdőoldala. A négy kártya a következő címekre mutat:

- https://nikola.svircevic.hu
- https://agota.bodnar.svircevic.hu
- https://nikola.stevan.svircevic.hu
- https://family.svircevic.hu

A négy feltöltött eredeti fénykép változtatás nélkül került a `public/images` mappába.

## Vercelre feltöltés

### A legegyszerűbb út – GitHub + Vercel

1. Hozz létre GitHubon egy új repository-t, például `svircevic-hu` néven.
2. A projekt teljes tartalmát töltsd fel a repository-ba.
3. Vercelben: **Add New → Project → Import Git Repository**.
4. Válaszd ki a `svircevic-hu` repository-t.
5. Framework: **Next.js** (a Vercel automatikusan felismeri).
6. Deploy.

A kész oldal először egy `*.vercel.app` címen lesz elérhető.

## Saját domain

A Vercel projektben a **Settings → Domains** alatt add hozzá:

`www.svircevic.hu`

majd a Forpsi DNS-ben állítsd be a Vercel által kért rekordot.

A gyerek / család / személyes külön aldomainjeit később külön Vercel projektekhez vagy ugyanahhoz a kódalaphoz is hozzá lehet kötni, de ez a kezdőlap már most a végleges címekre mutat.

## Helyi futtatás

Node.js 22 vagy újabb ajánlott.

```bash
npm install
npm run dev
```

Ezután: http://localhost:3000

## Fontos

A Vercelre feltöltés előtt a saját domain DNS-beállításait és az aldomain-projekteket külön kell létrehozni; a kártyák linkjei már a kívánt végleges URL-ekre mutatnak.
