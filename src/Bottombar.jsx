import React from 'react'

import './Bottombar.css'
import menus from '../Menu.json'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Bottombar(props) {
    const { totalCount, totalMoney, firstMenuItem, remainingItems } = props;

    const handleReset = () => {
        localStorage.clear();
        window.location.reload();
    }
    console.log(firstMenuItem);

  return (
    <div className='order_flow_wrap'>
        <div className='order_btn_area'>
            <div className='order_box1'>
                <div className='order_info_area'>
                    <div className='order_info'>
                        <div className='info_tit'>
                            <span className='total'>{totalCount}개</span>
                            {remainingItems > 1 ? `${firstMenuItem.title} 외 ` : `${firstMenuItem.title} `}
                        </div>
                        <div className='info_price'>{totalMoney.toLocaleString()}</div>
                    </div>
                    <div className='btn_reset'>
                        <button className='reset_button' onClick={handleReset}><DeleteForeverIcon /></button>
                    </div>
                    <a className='btn_order'>
                        주문하기
                        <div className='btn_box'>
                            <ShoppingCartIcon className='ico_cart' viewBox='0 0 25 25' fill='#0AD289' aria-hidden='true'/>
                            <span className='num' aria-label='주문수'>{totalCount}</span>
                        </div>
                    </a>                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Bottombar