const drumFolderId = "1AbUN60lNWcps1BO7tyuGpLqu5KQNLekw";
const siteReferer = "https://nikola.stevan.svircevic.hu/";

type DriveFileList = {
  files?: Array<{ id: string; mimeType?: string }>;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  const { fileId } = await params;
  if (!/^[A-Za-z0-9_-]{20,}$/.test(fileId)) {
    return new Response("Not found", { status: 404 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    return new Response("Video service unavailable", { status: 503 });
  }

  const listUrl = new URL("https://www.googleapis.com/drive/v3/files");
  listUrl.searchParams.set("q", `'${drumFolderId}' in parents and trashed = false`);
  listUrl.searchParams.set("fields", "files(id,mimeType)");
  listUrl.searchParams.set("pageSize", "100");
  listUrl.searchParams.set("key", apiKey);

  try {
    const listResponse = await fetch(listUrl, {
      headers: { Referer: siteReferer },
      next: { revalidate: 300 },
    });
    if (!listResponse.ok) {
      return new Response("Video not found", { status: 404 });
    }

    const fileList = await listResponse.json() as DriveFileList;
    const allowedVideo = (fileList.files ?? []).find(
      (file) => file.id === fileId && file.mimeType?.startsWith("video/"),
    );
    if (!allowedVideo) {
      return new Response("Video not found", { status: 404 });
    }

    const mediaUrl = new URL(`https://www.googleapis.com/drive/v3/files/${fileId}`);
    mediaUrl.searchParams.set("alt", "media");
    mediaUrl.searchParams.set("key", apiKey);

    const upstreamHeaders = new Headers({ Referer: siteReferer });
    const range = request.headers.get("range");
    if (range) upstreamHeaders.set("Range", range);
    const ifRange = request.headers.get("if-range");
    if (ifRange) upstreamHeaders.set("If-Range", ifRange);

    const mediaResponse = await fetch(mediaUrl, {
      headers: upstreamHeaders,
      cache: "no-store",
    });

    if (!mediaResponse.ok && mediaResponse.status !== 206) {
      return new Response("Video unavailable", {
        status: mediaResponse.status,
      });
    }

    const contentType = mediaResponse.headers.get("content-type") ?? allowedVideo.mimeType ?? "video/mp4";
    if (!contentType.startsWith("video/")) {
      return new Response("Invalid video response", { status: 502 });
    }

    const responseHeaders = new Headers({
      "Content-Type": contentType,
      "Content-Disposition": "inline",
      "Cache-Control": "private, no-store, no-cache, must-revalidate",
      "X-Content-Type-Options": "nosniff",
      "Accept-Ranges": mediaResponse.headers.get("accept-ranges") ?? "bytes",
    });

    for (const header of ["content-length", "content-range", "last-modified", "etag"]) {
      const value = mediaResponse.headers.get(header);
      if (value) responseHeaders.set(header, value);
    }

    return new Response(mediaResponse.body, {
      status: mediaResponse.status,
      headers: responseHeaders,
    });
  } catch {
    return new Response("Video unavailable", { status: 502 });
  }
}
