import { post } from "./common";

const menu = async () => {
  return await post("table/menu", {}, true);
};

export { menu };
