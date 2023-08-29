import React, { useState, useEffect } from 'react'
import './Mainpage.css';

import{ Link, useLocation } from "react-router-dom";

import menus from '../Menu.json'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Mainpage() {

    const [ list, setList ] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if(location.state) {
            const menu_key = Object.keys(location.state)[0]
            const menu_quantity = location.state[menu_key]
            console.log(menu_quantity)
        }
    })
    
  return (
    <div className='order-app'>
        <div className='top-bar'>
            <div className='logo-container'>
                <img src='/public/Vis_logo.png'></img>
                <h3>orderit</h3>
            </div>
        </div>
        <div className='menu-bar'>
            {
                menus.map( (menu, index) => (
                    <Link to={`/${menu.menuId}`} key={index} >
                        <div className='menu-item'>
                            <img 
                                src={menu.img} 
                                alt={menu.title} 
                                className='menu-img'
                            ></img>
                            <div className='menu-details'>
                                <div className='menu-title'>{menu.title}</div>
                                <div className='menu-price'>{menu.price}</div>
                                <div className='menu-detail'>{menu.detail}</div>
                            </div>
                            <div className='menu-purchaseButton'>
                                <ShoppingCartIcon />
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
        <div className='bottom-bar'>
            bottom
            <div className='purchase-total'>
                {list.map(item => (
                    <div key={item.title}>
                        {item.title}: {item.quantity}
                    </div>
                ))}
            </div>
            <div className='purchase-confirmedButton'>
                <div>주문하기</div>
            </div>
        </div>
    </div>
  )
}

export default Mainpage;