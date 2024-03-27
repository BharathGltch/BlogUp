import { atomFamily } from "recoil";
import { Blog } from "../../types/index";

export const blogState = atomFamily<Blog | null, number>({
  key: "blogState",
  default: null,
});
