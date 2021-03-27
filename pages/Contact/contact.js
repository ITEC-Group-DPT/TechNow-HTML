let numberItemCart = document.querySelectorAll(".number-item-cart");
let cartList = [];
let cart = document.querySelector(".cart-list");


$(document).ready(function () {
    cartList = JSON.parse(localStorage.getItem("cartList"));
    console.log("CART ON PAGE LOAD");
    console.log(cartList);
    updateNoItemInCart();

    $('.submit-form').submit(function (e) {
        e.preventDefault();
        $('.alert').removeClass('d-none');
        console.log("123132");
        setTimeout(() => {
            window.location.href = '../../index.html'
        }, 2000);
    });
});

function updateNoItemInCart() {
    numberItemCart.forEach(number => {
        number.innerText = getTotalItemsInCart();
    });
}