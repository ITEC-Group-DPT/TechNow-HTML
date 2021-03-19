//variables
let popUpNavItems = document.querySelector(".pop-up-items")
let fade = false;
let dropdownMenu = document.querySelector(".dropdown");
let dropdownIcon = document.querySelector(".dropdown .nav-link")
let numberItemCart = document.querySelectorAll(".number-item-cart");

let cartList = [];
let cart = document.querySelector(".cart-list");
let removeBtns;

$(document).ready(() => {
  cartList = JSON.parse(localStorage.getItem("cartList"));

  console.log("CART ON PAGE LOAD");
  console.log(cartList);
  updateNoItemInCart();
  outputCartList(cartList);
  removeBtns = document.querySelectorAll(".remove-btn");

  removeBtns.forEach(removeBtn => {
    removeBtn.addEventListener("click", () => {
      removeProductUI(removeBtn);
      removeProduct(removeBtn.id);
    });
  });

});

//cart functions
function outputCartList(cartList) {
  $(".cart-list").empty();
  cartList.forEach((product, index) => {
    let data = `
      <li>
        <div class="product p-1">
          <div class="card d-flex flex-row product shadow-sm rounded w-100 h-50">
            <img class="card-img-top" src="${product.data.avatarURL}" alt="Card image cap" style="width: 200px">
            <div class="card-body">
              <h5 class="card-title rounded">${product.data.name}</h5>
              <div class="bottom-price-star">
              <div class="rating">
                <span class="fa fa-star text-warning"></span>
                <span class="fa fa-star text-warning"></span>
                <span class="fa fa-star text-warning"></span>
                <span class="fa fa-star text-warning"></span>
                <span class="fa fa-star"></span>
                <span>(${product.data.sold})</span>
              </div>
            </div>
            <p href="#" class="text-danger mb-0 price">${product.data.price.toLocaleString()}₫</p>
          </div>
          <button type="button" class="btn btn-danger remove-btn" id="${product.id}">Remove</button>
        </div>
      </li>`

    $(".cart-list").append(data);
  });

}

function removeProduct(id) {

  console.log('id ' + id);
  let index = cartList.findIndex(product => {
    return product.id == id;
  });

  cartList.splice(index, 1);
  console.log("CART AFTER REMOVE");
  console.log(cartList);
  updateNoItemInCart();
  storeLocalStorage(cartList);
}

function storeLocalStorage(cartList) {
  localStorage.setItem("cartList", JSON.stringify(cartList));
  //console.log(JSON.stringify(cartList));
}

// UI functions

function removeProductUI(removeBtn) {
  removeBtn.parentElement.parentElement.parentElement.remove();
}

function updateNoItemInCart() {
  numberItemCart.forEach(number => {
    number.innerText = cartList.length;
  });
}

allowHover(true);

$(document).scroll(function () {
  let y = $(this).scrollTop();
  if (y > 100 && fade == false) {
    fadeIn(popUpNavItems);
    fade = true;
  } else if (y <= 100 && fade == true) {
    fadeOut(popUpNavItems);
    fade = false;
  }

});


function allowHover(boolVal) {
  if (boolVal == true) {
    dropdownMenu.classList.add("hoverable");
    dropdownIcon.classList.add("dropdown-toggle");
    dropdownIcon.classList.remove("disabled");
  } else {
    dropdownMenu.classList.remove("hoverable");
    dropdownIcon.classList.remove("dropdown-toggle");
    dropdownIcon.classList.add("disabled");
  }
}

function fadeIn(el) {
  document.querySelector('#dropdownsearchbar').style.opacity = 0
  el.style = "display: flex";
  setTimeout(function () {
    el.style = "opacity: 1";
  }, 300);
}

function fadeOut(el) {
  document.querySelector('#dropdownsearchbar').style.opacity = 1
  el.style = "opacity: 0";
  setTimeout(function () {
    el.style = "display: none";
  }, 300);
}