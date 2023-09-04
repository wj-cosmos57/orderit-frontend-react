import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './Menudetail.css';
import menus from '../Menu.json'

import * as cartModule from './cartModule';

function Menudetail() {
  const { menuId } = useParams();
  const [ quantity, setQuantity ] = useState(0);
  const movePage = useNavigate();

  // menuId를 사용하여 menus 배열에서 해당 메뉴의 정보를 찾아서 표시

  const menu = menus.find(m => m.menuId === menuId);
  if (!menu) return <div>메뉴를 찾을 수 없습니다.</div>;

  const goMainpage = () => {
    cartModule.addCart( menuId, quantity )
    movePage("/"/*, { state: { [menu.title]: quantity } }*/);
  }


  return (
    <div className='menu-detail-wrapper'>
        <div className='menu-info'>
            <img src={menu.img} alt={menu.title} className='menu-image'/>
            <h1 className='menu-detail-title'>{menu.title}</h1>
            <p className='menu-detail-price'>{menu.price}원</p>
            <p className='menu-detail-text'>{menu.detail}</p>
        </div>
        <div className='quantity-controller'>
            <button className='quantity-increment' onClick={() => setQuantity(prev => prev + 1)}>+</button>
            <button className='quantity-decrement' onClick={() => setQuantity(prev => prev - 1)}>-</button>
        </div>
        <div className='order-button-wrapper'>
            <button className='order-button' onClick={goMainpage}>주문하기</button>
        </div>
    </div>
    
  );
}
export default Menudetail;