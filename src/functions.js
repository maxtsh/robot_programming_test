import { enRegex, seRegex, frRegex, instructions } from "./constants";

export function detectLanguage(cmd) {
  let lowerCasedCmd = cmd.toLowerCase();
  let lang = "en";
  if (enRegex.test(lowerCasedCmd)) lang = "en";
  if (seRegex.test(lowerCasedCmd)) lang = "se";
  if (frRegex.test(lowerCasedCmd)) lang = "fr";
  return instructions[lang];
}
