import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import "./Menudetail.css";
import menus from "../../../Menu.json";
import { menu as fetchMenu } from "../../apis/menu";

import * as cartModule from "../../cartModule";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Menudetail() {
  const moveMenuDetail = useNavigate();
  const moveError = useNavigate();

  const { menuId } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let menuRes = await fetchMenu();
      if (menuRes.statusCode == "SSU4001") moveError("/error");
      console.log(menuRes);
      setMenuData(menuRes.data.menus.find((m) => m.id === Number(menuId)));
      console.log(menuId);
      console.log(menuData);
    }
    fetchData();
  }, []);
  console.log(menuData);

  // json 파일 사용할 때의 코드
  // menuId를 사용하여 해당 메뉴의 정보를 찾아서 표시
  // const menu = menus.find((m) => m.id === menuId);
  // if (!menu) return <div>메뉴를 찾을 수 없습니다.</div>;
  if (!menuData) return <div>데이터를 불러오는 중...</div>;

  const goMainpage = () => {
    if (quantity > 0) cartModule.addCart(+menuId, quantity, "plus");
    moveMenuDetail("/" /*, { state: { [menu.title]: quantity } }*/);
  };

  return (
    <div className="menu-detail-wrapper">
      <div className="navigation-link">
        <Link to="/">
          <button className="back_to_menu">
            <ArrowBackIcon className="back_to_menu_icon" />
            메인화면으로 돌아가기
          </button>
        </Link>
      </div>
      <div className="menu-info">
        <img
          src={menuData.imgUrl}
          alt={menuData.title}
          className="menu-image"
        />
        <h1 className="menu-detail-title">{menuData.title}</h1>
        <p className="menu-detail-price">{menuData.price.toLocaleString()}원</p>
        <p className="menu-detail-text">{menuData.detail}</p>
        <div className="quantity-controller">
          <button
            className="quantity-decrement"
            onClick={() => {
              if (quantity > 0) setQuantity((prev) => prev - 1);
              else alert("음수값을 입력할 수 없습니다.");
            }}
          >
            -
          </button>
          {quantity >= 0 && <div className="quantity-info">{quantity}</div>}
          <button
            className="quantity-increment"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <div className="order-button-wrapper">
          <button className="order-button" onClick={goMainpage}>
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default Menudetail;
