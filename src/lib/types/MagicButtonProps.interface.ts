export default interface MagicButtonProps {
  provider: "netflix" | "paramount+" | "hulu" | "youtube" | null;
  showName: string;
}

export function isValidMagicButtonServiceProvider(s: string): boolean {
  return ["netflix", "paramount+", "hulu", "youtube"].includes(s);
}
