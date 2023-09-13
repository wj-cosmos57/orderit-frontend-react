import React, { useState, useEffect, useRef } from "react";
import "./Mainpage.css";

import { Link, useLocation } from "react-router-dom";

import menus from "../Menu.json";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Bottombar from "./Bottombar.jsx";

function Mainpage() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const firstMenuItem =
    cart.length > 0 ? menus.find((m) => m.menuId === cart[0].menuId) : null; // 담긴 첫번째 메뉴
  const remainingItems = cart.length; // 담긴 메뉴의 종류 수

  let totalQuantityRef = useRef([0, 0]); // [0]: 총메뉴개수 [1]: 총합계

  return (
    <div className="order-app">
      <div className="top-bar">
        <div className="logo-container">
          <img src="../public/logo.png" className="logo"></img>
          {/* <div className='logo-title'>2023 IT대학 대동제 주점</div> */}
        </div>
      </div>

      <div className="menu-bar">
        {menus.map((menu, index) => {
          const menuItemInCart = cart.find(
            (item) => item.menuId === menu.menuId
          );
          const quantityInCart = menuItemInCart ? menuItemInCart.qty : 0;
          const menuPrice = parseInt(menu.price.replace(/,/g, ""), 10);

          totalQuantityRef.current[0] += quantityInCart;
          totalQuantityRef.current[1] += menuPrice * quantityInCart;

          // console.log(totalQuantityRef.current[0]);
          // console.log(totalQuantityRef.current[1]);

          return (
            <Link to={`/${menu.menuId}`} key={index}>
              <div className="menu-item">
                <div className="img-div">
                  <img
                    src={menu.img}
                    alt={menu.title}
                    className="menu-img"
                  ></img>
                </div>
                <div className="menu-details">
                  <div className="menu-title">{menu.title}</div>
                  <div className="menu-price">{menu.price}원</div>
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
      {totalQuantityRef.current[0] > 0 && (
        <Bottombar
          totalCount={totalQuantityRef.current[0]}
          totalMoney={totalQuantityRef.current[1]}
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
