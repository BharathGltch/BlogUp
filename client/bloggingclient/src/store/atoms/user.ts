import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    isLoading: true,
    userID: null as null | number,
    username: null as null | string,
  },
});
