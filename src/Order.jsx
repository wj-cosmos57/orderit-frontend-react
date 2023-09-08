import React from "react";

import "./Order.css";
import menus from "../Menu.json";
import CloseIcon from "@mui/icons-material/Close";

function Order() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <div className="user_app">
      <div className="order_form">
        <div className="section_order_header">
          <div className="order_header_inner">
            <div className="header_title">주문서</div>
            <a className="button_close" role="button">
              <CloseIcon style={{ width: 30, height: 30 }} className="close" />
            </a>
          </div>
        </div>

        <div className="order_inner">
          <div className="wrap_sections">
            <div className="section_order_menu">
              <div className="menu_list_wrap">
                <ul className="menu_list">
                  {cart.map((cartMenu, index) => {
                    const menuIteminCart = menus.find(
                      (item) => item.menuId === cartMenu.menuId
                    );
                    console.log(menuIteminCart);
                    const menuTitle = menuIteminCart.title;
                    console.log(menuTitle);
                    const menuPrice = menuIteminCart.price;
                    console.log(menuPrice);
                    const menuImage = menuIteminCart.img;
                    const menuQuantity = cartMenu.qty;
                    console.log(menuQuantity);
                    return (
                      <li key={cartMenu.menuId}>
                        <div className="menu">
                          <div className="img_wrap">
                            <img
                              src={menuImage}
                              alt={menuTitle}
                              className="menu-img"
                            ></img>
                          </div>
                          <div className="info_wrap">
                            <strong className="title">{menuTitle}</strong>
                            <a className="delete_button" role="button">
                              X
                            </a>
                            <div className="figure_area">
                              <div className="section_counter">
                                <a className="minus_button" role="button">
                                  -
                                </a>
                                {/* <span className="num">{menuQuantity}</span> */}
                                <a className="plus_button" role="button">
                                  +
                                </a>
                              </div>
                              <div className="price">
                                <div className="text">{menuPrice}원</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="button_add_area">
              button_add_area
              <a className="button_add" role="button"></a>
            </div>
          </div>
          <div className="selection_order_price">
            <strong className="order_title">결제 상세</strong>
            <div className="price_area">
              <div className="price_row">
                <div className="title">주문 금액</div>
                <div className="price">90,000원</div>
              </div>
            </div>
            <div className="total_price_area">
              <div className="price_row">
                <div className="title">총 결제 금액</div>
                <div className="price">
                  <span className="text">90,000d원</span>
                </div>
              </div>
            </div>
            <div className="section_order_extra">
              <strong className="order_title">주문자 정보</strong>
              <div className="request_area">
                <span className="order_sub_title">
                  연락처
                  <em className="required">필수 이모티콘</em>
                </span>
                <div className="input_box">
                  <label className="blind">연락처</label>
                  <input
                    type="tel"
                    id="phone"
                    className="input_text"
                    placeholder="연락처를 입력해주세요."
                  ></input>
                  <div className="gray_info_box">
                    주의 이모티콘
                    <div>
                      <div className="desc_text1">
                        메뉴가 준비되면 전화드려요.
                      </div>
                      <div className="desc_text2">
                        전화로 안내드리면 매장에서 픽업해주세요!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
