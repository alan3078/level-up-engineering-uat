import { atom } from "recoil";

export const price = atom({
  key: "price",
  default: false,
});

export const priceList = atom({
  key: "priceList",
  default: [],
});
