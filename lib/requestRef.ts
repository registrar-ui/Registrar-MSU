export function generateReference(title: string): string {
  const letters =
    title
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 3) || "DR";
  const digits = Math.floor(10000 + Math.random() * 90000); // 5 digits
  return `${letters}-${digits}`;
}