import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Mainpage.css";
// import menus from "../Menu.json";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Bottombar from "./Bottombar.jsx";

import { menu } from "../../apis/menu"; // db의 "/table/menu"에서 db에 있는 메뉴 정보 가져오는 api

function Mainpage() {
  const [menuList, setMenuList] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      let menuRes = await menu();
      console.log(menuRes.statusCode);
      if (menuRes.statusCode == "SSU4001") navigate("/error");
      setMenuList(menuRes.data.menus);
    }
    fetchData();
  }, []);
  console.log(menuList);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // const firstMenuItem =
  //   cart.length > 0 ? menuList.find((m) => m.menuId === cart[0].menuId) : null; // 담긴 첫번째 메뉴
  /*문제) menuList가 처음 렌더링 될 때 'null'이다. useEffect를 사용하여 데이터를 비동기적으로 가져오는 동안,
  컴포넌트는 초기값인 'null'로 렌더링된다. 따라서 menuList가 유효한 배열일 때만 'find() 연산이 수행되게 해야한다.*/
  const firstMenuItem =
    cart.length > 0 && menuList
      ? menuList.find((m) => m.id === Number(cart[0].menuId))
      : null;
  console.log(firstMenuItem);
  const remainingItems = cart.length; // 담긴 메뉴의 종류 수

  let totalQuantity = [0, 0]; // [0]: 카트에 담겨진 총메뉴개수 [1]: 카트에 담겨진 총합계
  //여기서 useRef를 사용하려고 했지만 굳이 그럴 필요 없음. 나는 map을 통해서 렌더링 시마다 합을 더하여 계산해내고 있기 때문에
  //그냥 일반 변수에 담아서 관리하면 됨. 만약 useRef를 사용하여 관리할 경우에는 렌더링 때마다 합계가 누적됨.

  return (
    <div className="order-app">
      <div className="top-bar">
        <div className="logo-container">
          <img src="../public/logo.png" className="logo"></img>
          {/* <div className='logo-title'>2023 IT대학 대동제 주점</div> */}
        </div>
      </div>
      <div className="menu-bar">
        {menuList &&
          menuList.map((menu, index) => {
            const menuItemInCart = cart.find(
              (item) => Number(item.menuId) === menu.id
            );
            const quantityInCart = menuItemInCart ? menuItemInCart.qty : 0;
            // const menuPrice = parseInt(menu.price.replace(/,/g, ""), 10);
            console.log(menu.price);
            console.log(quantityInCart);

            totalQuantity[0] += quantityInCart;
            totalQuantity[1] += menu.price * quantityInCart;

            // console.log(totalQuantity[0]);
            // console.log(totalQuantity[1]);

            return (
              <Link to={`/menu/${menu.id}`} key={index}>
                <div className="menu-item">
                  <div className="img-div">
                    <img
                      src={menu.imgUrl}
                      alt={menu.title}
                      className="menu-img"
                    ></img>
                  </div>
                  <div className="menu-details">
                    <div className="menu-title">{menu.title}</div>
                    <div className="menu-price">
                      {menu.price.toLocaleString()}원
                    </div>
                    <div className="menu-detail">{menu.detail}</div>
                  </div>
                  <div className="menu-purchaseButton">
                    <ShoppingCartOutlinedIcon
                      sx={{ color: "rgb(10, 210, 137)" }}
                    />
                    {quantityInCart > 0 && (
                      <div className="menu-quantity">{quantityInCart}</div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      {totalQuantity[0] > 0 && (
        <Bottombar
          totalCount={totalQuantity[0]}
          totalMoney={totalQuantity[1]}
          firstMenuItem={firstMenuItem}
          remainingItems={remainingItems}
        />
      )}
      {/* <div className='bottom-bar'>
            <div className='purchase-total'>
                <div className='totalCount'>총 주문 개수 : {totalQuantityRef.current[0]} 개</div>
                <div className='totalQuantity'>{totalQuantityRef.current[1].toLocaleString()}원</div>
            </div>
            <div className='purchase-confirmedButton'>
                <button>주문하기</button>
            </div>
        </div> */}
    </div>
  );
}

export default Mainpage;
