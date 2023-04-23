import { enRegex, seRegex, frRegex, instructions } from "./constants";

export function detectLanguage(cmd) {
  let lang = "en";

  if (enRegex.test(cmd)) lang = "en";
  if (seRegex.test(cmd)) lang = "se";
  if (frRegex.test(cmd)) lang = "fr";

  return instructions[lang];
}
