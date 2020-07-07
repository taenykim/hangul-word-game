import { types, consonants, vowels } from "./generator";
const Hangul = require("hangul-js");
console.log(Hangul.assemble("아", "ㅂ"));

export default function hangulgen([type1, type2]) {
  if (vowels.indexOf(type1) >= 0 && vowels.indexOf(type2) >= 0) {
    if ((type1 == "ㅏ" && type2 == "ㅣ") || (type1 == "ㅣ" && type2 == "ㅏ")) {
      return ["ㅐ", false];
    }
    if ((type1 == "ㅑ" && type2 == "ㅣ") || (type1 == "ㅣ" && type2 == "ㅑ")) {
      return ["ㅒ", false];
    }
    if ((type1 == "ㅓ" && type2 == "ㅣ") || (type1 == "ㅣ" && type2 == "ㅓ")) {
      return ["ㅔ", false];
    }
    if ((type1 == "ㅕ" && type2 == "ㅣ") || (type1 == "ㅣ" && type2 == "ㅕ")) {
      return ["ㅖ", false];
    }
    if (Hangul.assemble([...type1, ...type2]).length === 1) {
      return [Hangul.assemble([...type1, ...type2]), false];
    }
    if (Hangul.assemble([...type2, ...type1]).length === 1) {
      return [Hangul.assemble([...type2, ...type1]), false];
    }
  }
  if (consonants.indexOf(type1) >= 0 && consonants.indexOf(type2) >= 0) {
    if (type1 == "ㄱ" && type2 == "ㄱ") {
      return ["ㄲ", false];
    }
    if (type1 == "ㄷ" && type2 == "ㄷ") {
      return ["ㄸ", false];
    }
    if (type1 == "ㅂ" && type2 == "ㅂ") {
      return ["ㅃ", false];
    }
    if (type1 == "ㅅ" && type2 == "ㅅ") {
      return ["ㅆ", false];
    }
    if (type1 == "ㅈ" && type2 == "ㅈ") {
      return ["ㅉ", false];
    }
    if (Hangul.assemble([...type1, ...type2]).length === 1) {
      return [Hangul.assemble([...type1, ...type2]), false];
    }
    if (Hangul.assemble([...type2, ...type1]).length === 1) {
      return [Hangul.assemble([...type2, ...type1]), false];
    }
  }
  if (types.indexOf(type1) == -1) {
    type1 = Hangul.disassemble(type1);
  }
  if (types.indexOf(type2) == -1) {
    type2 = Hangul.disassemble(type2);
  }
  if (Hangul.assemble([...type1, ...type2]).length === 1 && Hangul.assemble([...type1, ...type2]) !== type1 && Hangul.assemble([...type1, ...type2]) !== type2) {
    return [Hangul.assemble([...type1, ...type2]), true];
  }
  if (Hangul.assemble([...type2, ...type1]).length === 1 && Hangul.assemble([...type2, ...type1]) !== type1 && Hangul.assemble([...type2, ...type1]) !== type2) {
    return [Hangul.assemble([...type2, ...type1]), true];
  }
  return [false, false];
}
