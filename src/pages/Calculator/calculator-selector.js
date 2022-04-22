import { selector } from "recoil";
import { priceList } from "./calculator-atom";

const totalPrice = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const list = get(priceList);
    const prices = list.map((k) => k.price);
    return prices.reduce((x, y) => x + y, 0);
  },
});

export default totalPrice;
