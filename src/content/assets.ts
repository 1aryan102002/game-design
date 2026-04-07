type GlobModule = { default: string };

const assetModules = import.meta.glob<GlobModule>("../assets/*.{png,jpg,jpeg,webp,avif,svg}", {
  eager: true,
});

export function resolveAssetUrl(fileNameOrUrl: string): string {
  const cleaned = fileNameOrUrl.trim();
  if (!cleaned) return "";

  for (const [path, mod] of Object.entries(assetModules)) {
    if (path.endsWith(`/${cleaned}`)) return mod.default;
  }
  return cleaned;
}

