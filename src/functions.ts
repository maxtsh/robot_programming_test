type Lang = "en" | "fr" | "se";

const enRegex = /^[flr\flr]+$/;
const seRegex = /^[vhg\vhg]+$/;
const frRegex = /^[dag\dag]+$/;

const instructions = {
  en: {
    left: "l",
    right: "r",
    forward: "f",
  },
  se: {
    left: "v",
    right: "h",
    forward: "g",
  },
  fr: {
    left: "g",
    right: "d",
    forward: "a",
  },
};

export function detectLanguage(cmd: string) {
  let lang: Lang = "en";

  if (enRegex.test(cmd)) lang = "en";
  if (seRegex.test(cmd)) lang = "se";
  if (frRegex.test(cmd)) lang = "fr";

  return instructions?.[lang];
}
