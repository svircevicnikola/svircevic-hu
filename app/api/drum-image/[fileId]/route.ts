const drumFolderId = "1AbUN60lNWcps1BO7tyuGpLqu5KQNLekw";
const siteReferer = "https://nikola.stevan.svircevic.hu/";

type DriveFileList = { files?: Array<{ id: string; mimeType?: string }> };

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ fileId: string }> }) {
  const { fileId } = await params;
  if (!/^[A-Za-z0-9_-]{20,}$/.test(fileId)) return new Response("Not found", { status: 404 });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
  if (!apiKey) return new Response("Image service unavailable", { status: 503 });

  const listUrl = new URL("https://www.googleapis.com/drive/v3/files");
  listUrl.searchParams.set("q", `'${drumFolderId}' in parents and trashed = false`);
  listUrl.searchParams.set("fields", "files(id,mimeType)");
  listUrl.searchParams.set("pageSize", "100");
  listUrl.searchParams.set("key", apiKey);

  try {
    const listResponse = await fetch(listUrl, { headers: { Referer: siteReferer }, next: { revalidate: 300 } });
    if (!listResponse.ok) return new Response("Image not found", { status: 404 });

    const fileList = await listResponse.json() as DriveFileList;
    const isAllowedImage = (fileList.files ?? []).some((file) => file.id === fileId && file.mimeType?.startsWith("image/"));
    if (!isAllowedImage) return new Response("Image not found", { status: 404 });

    const apiImageUrl = new URL(`https://www.googleapis.com/drive/v3/files/${fileId}`);
    apiImageUrl.searchParams.set("alt", "media");
    apiImageUrl.searchParams.set("key", apiKey);

    let imageResponse = await fetch(apiImageUrl, { headers: { Referer: siteReferer } });
    let contentType = imageResponse.headers.get("content-type") ?? "";

    if (!imageResponse.ok || !contentType.startsWith("image/")) {
      imageResponse = await fetch(`https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`);
      contentType = imageResponse.headers.get("content-type") ?? "";
    }

    if (!imageResponse.ok || !contentType.startsWith("image/")) return new Response("Image unavailable", { status: 502 });

    return new Response(imageResponse.body, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "Content-Disposition": "inline",
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Image unavailable", { status: 502 });
  }
}
