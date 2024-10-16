export const MAX_MESSAGE_LENGTH = 4096;
export function splitMessage(message: string): string[] {
  const parts: string[] = [];
  let currentPart = "";

  const lines = message.split("\n");
  for (const line of lines) {
    if (currentPart.length + line.length + 1 > MAX_MESSAGE_LENGTH) {
      parts.push(currentPart.trim());
      currentPart = "";
    }
    currentPart += line + "\n";
  }

  if (currentPart.trim().length > 0) {
    parts.push(currentPart.trim());
  }

  return parts;
}
