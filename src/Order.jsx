import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import "./Order.css";
import menus from "../Menu.json";
import * as cartModule from "./cartModule";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Order() {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);

  const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);
  let totalRef = 0; //useRef(0); 총합계

  const decreaseQuantity = (menuId) => {
    let editQuantity = 1;
    console.log(menuId);
    if (menuId) {
      cartModule.addCart(menuId, editQuantity, "minus");
    } else {
      alert("최소주문 개수 입니다");
      return;
    }

    const newCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(newCart);
  };

  const increaseQuantity = (menuId) => {
    let editQuantity = 1;
    cartModule.addCart(menuId, editQuantity, "plus");
    window.location.reload();
  };

  const removeFromCart = (menuId) => {
    const updatedCart = cart.filter((item) => item.menuId !== menuId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  const deleteQuantity = () => {};

  const toggleDeveloperInfo = () => {
    setShowDeveloperInfo(!showDeveloperInfo);
  };

  return (
    <div className="user_app">
      <div className="order_form">
        <div className="section_order_header">
          <div className="order_header_inner">
            <div className="header_title">주문서</div>
            <Link to="/" className="button_close" role="button">
              <CloseIcon
                style={{ width: 30, height: 30 }}
                className="close_page"
              />
            </Link>
          </div>
        </div>

        <div className="order_inner">
          {/* 주문 상태 */}
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
                    totalRef +=
                      parseInt(menuPrice.replace(/,/g, ""), 10) * menuQuantity;
                    // console.log(totalRef.current);
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
                            <strong className="menu_title">{menuTitle}</strong>
                            <CloseIcon
                              className="close_menu"
                              onClick={() =>
                                removeFromCart(menuIteminCart.menuId)
                              }
                            />

                            <div className="figure_area">
                              <div className="section_counter">
                                <a
                                  className="minus_button"
                                  role="button"
                                  onClick={() =>
                                    decreaseQuantity(
                                      menuQuantity > 1
                                        ? menuIteminCart.menuId
                                        : null
                                    )
                                  }
                                >
                                  -
                                </a>
                                <span className="menu_quantity">
                                  {menuQuantity}
                                </span>
                                <a
                                  className="plus_button"
                                  role="button"
                                  onClick={() =>
                                    increaseQuantity(menuIteminCart.menuId)
                                  }
                                >
                                  +
                                </a>
                              </div>
                              <div className="menu_price">
                                <div className="price_text">{menuPrice}원</div>
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
              <Link to="/" className="button_add" role="button">
                <div className="add_menu">+</div>
                메뉴추가
              </Link>
            </div>
          </div>

          {/* 결제 상세 */}
          <div className="selection_order_price">
            <strong className="order_title">결제 상세</strong>
            <div className="order_price_area">
              <div className="order_price_row">
                <div className="order_title2">주문 금액</div>
                <div className="order_price">{totalRef.toLocaleString()}원</div>
              </div>
            </div>
            <div className="total_price_area">
              <div className="total_price_row">
                <div className="total_title">총 결제 금액</div>
                <div className="total_price">
                  <span className="total_text">
                    {totalRef.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 주문자 정보 */}
          <div className="selection_order_extra">
            <strong className="extra_order_title">주문자 정보</strong>

            <div className="extra_request_area">
              {/* 이름 */}
              <div>
                <span className="extra_order_sub_title">
                  이름
                  <em className="extra_required">(필수)</em>
                  <div className="extra_input_box">
                    <label className="extra_blind">연락처</label>
                    <input
                      type="tel"
                      id="phone"
                      className="extra_input_text"
                      placeholder="이름을 입력해주세요."
                    ></input>
                  </div>
                </span>
              </div>

              {/* 연락처 */}
              <div>
                <span className="extra_order_sub_title">
                  연락처
                  <em className="extra_required">(필수)</em>
                </span>

                <div className="extra_input_box">
                  <label className="extra_blind">연락처</label>
                  <input
                    type="tel"
                    id="phone"
                    className="extra_input_text"
                    placeholder="연락처를 입력해주세요."
                  ></input>

                  <div className="extra_gray_info_box">
                    <ErrorOutlineIcon style={{ width: 20, height: 20 }} />
                    <div>
                      <div className="extra_desc_text1">
                        이름은 송금인의 이름과 일치하게 해주세요!
                      </div>
                      <div className="extra_desc_text2">
                        입력된 이름과 송금인의 이름을 자동 비교하여 결제를
                        확인합니다. 일치하지 않을 경우 결제가 완료되지 않습니다.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 요청사항 */}
          <div className="section_order_extra2">
            <strong className="extra2_order_title">요청사항</strong>
            <div className="extra2_request_area">
              <div className="extra2_input_box">
                <lable htmlFor="message" className="extra2_blind">
                  요청사항
                </lable>
                <textarea
                  id="message"
                  className="extra2_textarea_text"
                  rows="1"
                  placeholder="추가 요청사항이 있다면 입력해주세요."
                  maxLength="150"
                ></textarea>
              </div>
            </div>
          </div>

          {/* 개발자 정보 */}
          <div className="developer_section">
            <a className="developer_card_header">
              <h3 className="developers_title">개발자 정보</h3>
              {showDeveloperInfo ? (
                <KeyboardArrowUpIcon
                  onClick={toggleDeveloperInfo}
                  className="developer_open_button"
                />
              ) : (
                <KeyboardArrowDownIcon
                  onClick={toggleDeveloperInfo}
                  className="developer_open_button"
                />
              )}
            </a>

            {showDeveloperInfo && (
              <div className="developer_info_body">
                <div className="developer_info">
                  <ul className="developer_info_list">
                    <li className="wooju">
                      <div className="developer_title">Frontend</div>
                      <div className="developer_text">
                        제27대 컴퓨터학부 학생회장 이우주
                      </div>
                    </li>
                    <li className="jongho">
                      <div className="developer_title">Backend</div>
                      <div className="developer_text">
                        제27대 컴퓨터학부 부학생회장 김종호
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* 주문하기 버튼 */}
          <div className="button_pay_disabled">주문하기</div>

          {/* 위로 올라가기 버튼 */}
          <div className="goto_top">
            <Link
              className="top_link"
              onClick={(e) => {
                e.preventDefault(); // 기본 동작을 방지
                window.scrollTo({
                  // 화면의 최상단으로 스클롤
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              TOP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
