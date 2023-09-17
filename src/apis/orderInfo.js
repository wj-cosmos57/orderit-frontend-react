import { post } from "./common";

const orderInfo = async (menus, name) => {
  return await post(
    "table/order",
    {
      menus: menus,
      name: name,
    },
    true
  );
};

export { orderInfo };
