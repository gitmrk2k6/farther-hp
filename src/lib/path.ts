/**
 * public配下のアセットパスにbasePathを付与する
 * next/imageのunoptimizedモードではbasePathが自動適用されないため
 */
export function assetPath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
