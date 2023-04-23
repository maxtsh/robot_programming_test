import { nanoid } from "nanoid";

export const enRegex = /^[flr\flr]+$/;
export const seRegex = /^[vhg\vhg]+$/;
export const frRegex = /^[dag\dag]+$/;

const size = 6;
export const dirs = ["N", "E", "S", "W"];
export const arrY = [...Array(size)].map(() => nanoid());
export const arrX = [...Array(size)].map(() => nanoid());

export const instructions = {
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
