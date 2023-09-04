import React, { useState, useEffect, useRef } from 'react'
import './Mainpage.css';

import{ Link, useLocation } from "react-router-dom";

import menus from '../Menu.json'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Mainpage() {

    // const [ list, setList ] = useState([]);
    // const [ orderList, setOrderList ] = useState([]);
    // const location = useLocation();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart)
    let totalQuantityRef = useRef([0, 0]);
    // let totalQuantity = 0; totalQuantity 이런식으로 관리하면 렌더링 될때마다 초기화 됨. 따라서 useRef로 관리해야함.

    //useEffect사용해서 초기화 계속 렌더링 되게하기
  return (
    <div className='order-app'>
        <div className='top-bar'>
            <div className='logo-container'>
                <img src='/public/Vis_logo.png'></img>
                <p>2023 IT대학 대동제 주점</p>
            </div>
            <div className='reset'>
                <button className='reset-button' onClick={() => {localStorage.clear();}}>초기화</button>
            </div>
        </div>
        <div className='menu-bar'>
            {
                menus.map( (menu, index) => {
                    const menuItemInCart = cart.find(item => item.menuId === menu.menuId);
                    const quantityInCart = menuItemInCart ? menuItemInCart.qty : 0;
                    
                    const menuPrice = parseInt(menu.price.replace(/,/g, ''), 10);
                    console.log(menuPrice)
                    totalQuantityRef.current[0] += quantityInCart;
                    console.log(menu.price)
                    totalQuantityRef.current[1] += menuPrice * quantityInCart;
                    console.log(totalQuantityRef.current);

                    return (
                        <Link to={`/${menu.menuId}`} key={index} >
                            <div className='menu-item'>
                                <img 
                                    src={menu.img} 
                                    alt={menu.title} 
                                    className='menu-img'
                                ></img>
                                <div className='menu-details'>
                                    <div className='menu-title'>{menu.title}</div>
                                    <div className='menu-price'>{menu.price}원</div>
                                    <div className='menu-detail'>{menu.detail}</div>
                                </div>
                                <div className='menu-purchaseButton'>
                                    <ShoppingCartIcon/>
                                    {quantityInCart > 0 && <div className='menu-quantity'>{quantityInCart}</div>}
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
        <div className='bottom-bar'>
            <div className='purchase-total'>
                <div className='totalCount'>총 주문 개수 : {totalQuantityRef.current[0]} 개</div>
                <div className='totalQuantity'>{totalQuantityRef.current[1].toLocaleString()}원</div>
            </div>
            <div className='purchase-confirmedButton'>
                <button>주문하기</button>
            </div>
        </div>
    </div>
  )
}

export default Mainpage;