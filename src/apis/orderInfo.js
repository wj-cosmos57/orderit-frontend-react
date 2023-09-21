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

const isFirstOrder = async () => {
  return await post(
    "table/isFirstOrder",
    {},
    true
  )
}

export { orderInfo, isFirstOrder };
