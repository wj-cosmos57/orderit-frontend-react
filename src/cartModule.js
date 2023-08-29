const addCart = async (menuId, qty) => {
    let cart = localStorage.getItem('cart');
    if(cart == null)
        cart = [];
    else
        cart = JSON.parse(cart);

    let index = cart.findIndex(menu => menu.menuId === menuId);
    //카트에 이미 메뉴가 있음
    if(index !== -1){
        cart[index].qty += qty;
    }
    //카트에 메뉴가 없음 
    else{
        cart.push({
            menuId: menuId,
            qty: qty
        })
    }

    console.log(cart);
    cart = JSON.stringify(cart);
    localStorage.setItem('cart', cart);
}

export {
    addCart
};