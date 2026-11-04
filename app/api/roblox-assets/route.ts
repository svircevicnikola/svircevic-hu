const USER_ID = "2651064775";
const GAME_PLACE_IDS = [
  "126815230666914",
  "18687417158",
  "17625359962",
  "8455137364",
  "79546208627805",
  "86022723355936",
];

type RobloxThumbnailResponse = {
  data?: Array<{
    targetId?: number;
    state?: string;
    imageUrl?: string | null;
  }>;
};

async function getJson(url: string): Promise<RobloxThumbnailResponse | null> {
  const response = await fetch(url, {
    next: { revalidate: 3600 },
    headers: { Accept: "application/json" },
  });
  if (!response.ok) return null;
  return (await response.json()) as RobloxThumbnailResponse;
}

export async function GET() {
  const avatarUrl = new URL("https://thumbnails.roblox.com/v1/users/avatar");
  avatarUrl.search = new URLSearchParams({
    userIds: USER_ID,
    size: "420x420",
    format: "Png",
    isCircular: "false",
  }).toString();

  const gamesUrl = new URL("https://thumbnails.roblox.com/v1/places/gameicons");
  gamesUrl.search = new URLSearchParams({
    placeIds: GAME_PLACE_IDS.join(","),
    size: "512x512",
    format: "Png",
    isCircular: "false",
  }).toString();

  try {
    const [avatar, gameIcons] = await Promise.all([
      getJson(avatarUrl.toString()),
      getJson(gamesUrl.toString()),
    ]);

    const games: Record<string, string> = {};
    for (const item of gameIcons?.data ?? []) {
      if (item.targetId && item.imageUrl && item.state === "Completed") {
        games[String(item.targetId)] = item.imageUrl;
      }
    }

    return Response.json(
      {
        avatar: avatar?.data?.[0]?.imageUrl ?? null,
        games,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return Response.json(
      { avatar: null, games: {} },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
