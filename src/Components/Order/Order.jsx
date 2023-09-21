import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { menu } from "../../apis/menu";
import { isFirstOrder, orderInfo } from "../../apis/orderInfo";

import "./Order.css";
import menus from "../../../Menu.json";
import * as cartModule from "../../cartModule";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

function Order() {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);

  const [menuList, setMenuList] = useState(null);
  const [orderer, setOrderer] = useState("");
  // const [buttonDisable, setbuttonDisable] = useState(false);
  const [loadingBoolean, setLoadingBoolean] = useState(false);
  const orderRef = useRef(null);
  const [orderHeight, setOrderHeight] = useState(0);
  const [firstOrder, setFirstOrder] = useState(null);

  const moveMainPage = useNavigate();
  const moveError = useNavigate();
  //메뉴 api 연동
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      let menuRes = await menu();
      //accessToken 없이 접속하는 경우
      if (menuRes.statusCode == "SSU4001") moveError("/error");
      setMenuList(menuRes.data.menus);

      let qtyCnt = 0;
      for await(let cartItem of cart){
        qtyCnt += cartItem.qty;
      }
      let isFirstOrderRes = await isFirstOrder();
      setFirstOrder(isFirstOrderRes.data);
      if(isFirstOrderRes.data && qtyCnt < 2){
        Swal.fire({
          icon: "warning",
          title: "상품을 더 담아주세요!",
          text: "첫 주문 시 최소 2개의 상품을 주문하셔야 합니다.",
        }).then((result) => {
            moveMainPage("/");
          
        });
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (orderRef.current) {
      console.log("Hi");
      setOrderHeight(orderRef.current.offsetHeight);
    }
  });

  const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);
  let totalRef = 0; //useRef(0)로 총합계 를 쓰려고 함. 하지만 useState로 렌더링을 하기 때문에 useRef로 관리할 필요 없음

  //메뉴 추가
  const decreaseQuantity = (menuId) => {
    let editQuantity = 1;
    console.log(menuId);
    if (menuId) {
      cartModule.addCart(menuId, editQuantity, "minus");
    } else {
      Swal.fire({
        icon: "error",
        title: "안내",
        text: "수량을 1 미만으로 변경하실 수 없습니다.",
      });
      return;
    }

    const newCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(newCart);

    let qtyCnt = 0;
    for (let cartItem of newCart){
      qtyCnt += cartItem.qty;
    }
    if(firstOrder && qtyCnt < 2){
      Swal.fire({
        icon: "warning",
        title: "상품을 더 담아주세요!",
        text: "첫 주문 시 최소 2개의 상품을 주문하셔야 합니다.",
      }).then((result) => {
          moveMainPage("/");
        
      });
    }
  };
  //메뉴 감소
  const increaseQuantity = (menuId) => {
    let editQuantity = 1;
    cartModule.addCart(menuId, editQuantity, "plus");

    const newCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(newCart);
  };
  //메뉴 삭제
  const removeFromCart = (menuId) => {
    const updatedCart = cart.filter((item) => item.menuId !== menuId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const newCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(newCart);

    let qtyCnt = 0;
    for (let cartItem of newCart){
      qtyCnt += cartItem.qty;
    }
    if(firstOrder && qtyCnt < 2){
      Swal.fire({
        icon: "warning",
        title: "상품을 더 담아주세요!",
        text: "첫 주문 시 최소 2개의 상품을 주문하셔야 합니다.",
      }).then((result) => {
          moveMainPage("/");
        
      });
    }
  };

  // 개발자 정보
  const toggleDeveloperInfo = () => {
    setShowDeveloperInfo(!showDeveloperInfo);
  };

  //주문 api 연동
  const handleInputChange = (e) => {
    setOrderer(e.target.value);
  };
  const handleOrder = async () => {
    const name = orderer;

    if (name == "") {
      Swal.fire({
        icon: "error",
        title: "주문 실패",
        text: "입금자명을 입력해주세요.",
      });
      return;
    }
    // setbuttonDisable(true);
    setLoadingBoolean(true);
    const menus = cart.map((item) => ({
      menuId: item.menuId,
      qty: item.qty,
    }));
    console.log(menus);
    console.log(name);

    let orderRes = await orderInfo(menus, name);
    console.log(orderRes);
    if (orderRes.statusCode == "SSU2030") {
      // setbuttonDisable(false);
      setLoadingBoolean(false);
      Swal.fire({
        icon: "success",
        title: "주문 성공",
        text: "주문이 완료되었습니다!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("cart");
          moveMainPage("/");
        }
      });
    } else if (orderRes.statusCode == "SSU4030") {
      setLoadingBoolean(false);
      alert("Menu not found");
    } else if (orderRes.statusCode == "SSU4031") {
      setLoadingBoolean(false);
      Swal.fire({
        icon: "error",
        title: "주문 실패",
        html: "<font style='font-size: 20px;'>입금 내역이 확인되지 않았습니다.<br/>입금을 먼저 진행해주세요.</font>",
      });
    } else if (orderRes.statusCode == "SSU4001") {
      //accessTocken 없음, 잘못됨, 또는 만료
      localStorage.clear();
      setLoadingBoolean(false);
      moveError("/error");
    } else if (orderRes.statusCode === "SSU0000") {
      setLoadingBoolean(false);
      Swal.fire("ErrorCode:0000", "Failed to connect to server", "question");
    } else {
      setLoadingBoolean(false);
      Swal.fire(
        "Error",
        "알 수 없는 오류입니다. 직원에게 문의해주세요.",
        "question"
      );
    }
  };

  if (!menuList) return <>...loading</>;
  return (
    <div className="user_app" ref={orderRef}>
      {console.log(orderHeight)}
      {loadingBoolean && <Loading overlayHeight={orderHeight} />}
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
                    const menuIteminCart = menuList.find(
                      (item) => item.id === +cartMenu.menuId
                    );
                    console.log({ cart, menuList, menuIteminCart });
                    const menuTitle = menuIteminCart.title;
                    console.log(menuTitle);
                    const menuPrice = menuIteminCart.price;
                    console.log(menuPrice);
                    const menuImage = menuIteminCart.imgUrl;
                    const menuQuantity = cartMenu.qty;
                    console.log(menuQuantity);
                    totalRef += menuPrice * menuQuantity;
                    // parseInt(menuPrice.replace(/,/g, ""), 10) * menuQuantity;
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
                              onClick={() => removeFromCart(menuIteminCart.id)}
                            />

                            <div className="figure_area">
                              <div className="section_counter">
                                <a
                                  className="minus_button"
                                  role="button"
                                  onClick={() =>
                                    decreaseQuantity(
                                      menuQuantity > 1
                                        ? menuIteminCart.id
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
                                    increaseQuantity(menuIteminCart.id)
                                  }
                                >
                                  +
                                </a>
                              </div>
                              <div className="menu_price">
                                <div className="price_text">
                                  {menuPrice.toLocaleString()}원
                                </div>
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
            <strong className="extra_order_title">결제 정보</strong>

            <div className="extra_request_area">
              {/* 이름 */}
              <div>
                <span className="extra_order_sub_title">
                  입금자명
                  <div className="extra_required">(필수)</div>
                  <div className="extra_input_box">
                    <label className="extra_blind">이름</label>
                    <input
                      type="text"
                      id="name"
                      className="extra_input_text"
                      placeholder="입금자명을 입력해주세요."
                      value={orderer}
                      onChange={handleInputChange}
                    ></input>
                  </div>
                </span>
              </div>
            </div>
          </div>

          {/* 입금 계좌 정보 */}
          <div className="section_order_extra2">
            <strong className="extra2_order_title">입금 계좌 정보</strong>
            <div className="extra_gray_info_box">
                  {/* <ErrorOutlineIcon style={{ width: 30, height: 30 }} /> */}
                  <div>
                    <div className="extra_desc_text1">
                      입력하신 입금자명과 표시된 정확한 금액을 입금해주세요.
                    </div>
                    <div className="extra_desc_text2">
                      <li>입력하신 입금자명과 금액을 통해 입금 여부를 확인합니다.</li>
                      <li>분할 입금, 초과 입금 불가능합니다. 표시된 정확한 금액을 입금해주세요.</li>
                      <li>입금하신 입금자명과 금액이 일치하지 않으면 입금이 확인되지 않습니다.</li>
                      <li>입금이 확인되지 않으면 고객센터 테이블로 문의해주세요.</li>
                      <li>은행 점검 시간에는 고객센터 테이블에서 카드결제를 도와드립니다.</li>
                    </div>
                  </div>
                </div>
            <div className="extra2_request_area">
            <div className="extra2_request_area_inner">
                <div className="extra2_orderer">입금자명 : {orderer}</div>
                <div className="extra2_totalmoney">
                  금액 : {totalRef.toLocaleString()} 원
                </div>
              </div>
              <div className="bank_section">
                <div className="bank_info_area">
                  <div className="bank_info">
                    <div className="bank_item">
                      <span className="bank_label">은행명</span>
                      <span className="bank_content">우리은행</span>
                    </div>
                    <div className="bank_item">
                      <span className="bank_label">예금주</span>
                      <span className="bank_content">이유준</span>
                    </div>
                    <div className="bank_item">
                      <span className="bank_label">계좌번호</span>
                      <span className="bank_content">1002-358-421069</span>
                    </div>
                  </div>
                </div>
              </div>
              <br/>
              <div className="extra_desc_text1">
                아직 주문이 완료되지 않았습니다!<br/>입금 후 이 화면으로 돌아와 주문하기 버튼을 눌러주세요.
              </div>
            </div>
          </div>

          {/* 개발자 정보 */}
          <div className="developer_section" onClick={toggleDeveloperInfo}>
            <a className="developer_card_header">
              <h3 className="developers_title">개발자 정보</h3>
              {showDeveloperInfo ? (
                <KeyboardArrowUpIcon
                  className="developer_open_button"
                />
              ) : (
                <KeyboardArrowDownIcon
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

          <br/>
          {/* 주문하기 버튼 */}
          <button
            // disabled={buttonDisable}
            className="button_pay_disabled"
            onClick={handleOrder}
          >
            주문하기
          </button>

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
