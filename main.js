let products;
let addToCartBtns;
let addToCartSearchBtns;
let numberItemCart;
let cartList = [];


$(document).ready(() => {
  getProducts(products);
  let temp = JSON.parse(localStorage.getItem("cartList"));
  if (temp != null) cartList = temp;

  console.log("CART ON PAGE LOAD");
  console.log(cartList);

  numberItemCart = document.querySelectorAll(".number-item-cart");
  updateNoItemInCart();
});

const getProducts = (item) => {
  let url = 'https://technow-4b3ab.firebaseio.com/.json';
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status == 200) {
      item = JSON.parse(this.responseText).Products;
      //loadProductSection(item, 'CPU');
      loadProductSection(item, 'CPU');
      //loadProductSection(item, 'GamingChair');
      //loadProductSection(item, 'Headphone');
      loadProductSection(item, 'Laptop');
      // loadProductSection(item, 'Laptop');
      // loadProductSection(item, 'Mainboard');
      loadProductSection(item, 'Monitor');
      // loadProductSection(item, 'Mouse');
      // loadProductSection(item, 'PSU');
      // loadProductSection(item, 'RAM');
      // loadProductSection(item, 'SSD');
      // loadProductSection(item, 'Speaker');
      // loadProductSection(item, 'VGA');
      sortingSold(item);

      products = item;
      addToCart();
    }
  }
  xhr.send();
}

const loadProductSection = (item, section) => {
  let sectionObj = item[section];
  //console.log(sectionObj);
  for (let i = 10; i <= 17; i++) {
    let product = sectionObj[section + i];
    let id = section + '.' + section + i;
    //console.log(id);
    //console.log(product);
    let productRating = parseInt(product.rating);
    let starRating = "";
    for (let j = 0; j < productRating; j++) {
      starRating += '<span class="fa fa-star text-warning"></span>';
    }
    for (let j = 0; j < 5 - productRating; j++) {
      starRating += '<span class="fa fa-star"></span>';
    }
    let newData =
      `<div class="col-lg-3 col-6 card-product-wrapper">
        <div class="card product">
          <a href="#" class="img-card"><img class="card-img-top" src="${product.avatarURL}" alt="Card image cap"></a>
        <div class="card-body h-75">
          <h5 class="card-title rounded">${product.name}</h5>
          <div class="rating">
            ${starRating}
            <span>(${product.sold})</span>
          </div>
          <p href="#" class="mb-0 price">${product.price.toLocaleString()} ??</p>
            <div class = "add-cart" id="${id}">
              <i class="bi bi-cart2"></i>
            </div>
          
        </div>

      </div>
    </div>`
    let section_row = '.' + section + '-row';
    $(section_row).append(newData);
  }
}


// add to cart 
function getProductIndexByID(id) {
  return cartList.findIndex(product => {
    return product.id == id;
  });
}

function addToCart() {
  addToCartBtns = document.querySelectorAll(".add-cart");
  addToCartBtns.forEach(addBtn => {
    addBtn.addEventListener("click", () => {
      addProductToCart(addBtn.id);
    });
  });
}

function addToCartSearch() {
  addToCartSearchBtns = document.querySelectorAll(".add-cart-search");
  addToCartSearchBtns.forEach(addSearchBtn => {
    addSearchBtn.addEventListener("click", () => {
      addProductToCart(addSearchBtn.id);
    });
  });
}

function addProductToCart(id) {
  cartList = cartList || [];
  let res = id.split(".");
  if (getProductIndexByID(res[1]) != -1) {
    console.log("DUPLICATE ITEM");
    let index = getProductIndexByID(res[1]);
    cartList[index].quantity++;
  } else {
    console.log("NEW ITEM");
    let product = {
      id: res[1],
      data: products[res[0]][res[1]],
      quantity: 1
    }
    cartList.push(product);
  }
  console.log("CART AFTER ADD");
  console.log(cartList);
  storeLocalStorage(cartList);
  updateNoItemInCart();
  popOver();
}

function storeLocalStorage(cartList) {
  localStorage.setItem("cartList", JSON.stringify(cartList));
}

function getTotalItemsInCart() {
  let total = 0;
  cartList.forEach(product => {
    total += product.quantity;
  });
  return total;
}

function updateNoItemInCart() {
  numberItemCart.forEach(number => {
    number.innerText = getTotalItemsInCart();
  });
}

let cartBtns = document.querySelectorAll(".cart-btn");

cartBtns.forEach(cartBtn => {
  cartBtn.addEventListener("click", () => {
    location.href = "pages/Cart/cart.html";
  });
});

// UI
let popUpNavItems = document.querySelectorAll(".pop-up-items")
let fade = false;

$(document).scroll(function () {
  let y = $(this).scrollTop();
  if (y > 100 && fade == false) {

    fadeIn(popUpNavItems);
    fade = true;
  } else if (y <= 100 && fade == true) {
    fadeOut(popUpNavItems);

    $('#cart-icon-desktop').popover('hide');
    $('#cart-icon-mobile').popover('hide');
    fade = false;
  }

});

function fadeIn(elList) {
  elList.forEach(el => {
    document.querySelector('#dropdownsearchbar').style.opacity = 0;
    el.classList.remove("d-none")

    el.classList.add("d-flex")
    setTimeout(function () {
      el.style = "opacity: 1";
    }, 300);
  });
}

function fadeOut(elList) {
  elList.forEach(el => {
    document.querySelector('#dropdownsearchbar').style.opacity = 1;
    el.style = "opacity: 0";
    setTimeout(function () {
      el.classList.add("d-none")
      el.classList.remove("d-flex")
    }, 300);
  });

}

function popOver() {
  if (screen.width <= 768) {
    $('#cart-icon-mobile').popover('show');
    setTimeout(() => {
      $('#cart-icon-mobile').popover('hide');
    }, 4000);
  }

  else {
    $('#cart-icon-desktop').popover('show');
    setTimeout(() => {
      $('#cart-icon-desktop').popover('hide');
    }, 4000);
  }
}

//top rating
let list = [];

function sortingSold(itemset) {
  for (const catalog in itemset) {
    for (const item in itemset[catalog]) {
      //console.log(item);
      if (Number.isInteger(itemset[catalog][item].sold)) {
        let product = itemset[catalog][item];
        product.id = catalog + '.' + item;
        //console.log(itemset[catalog][item]);
        list.push(product)
      }
      // sort theo t???ng catalog top rating 2 c??i / catalog
      // if (productlist.length == 0 || productlist.length == 1){
      //   productlist.push(item[key][keyinkey]);
      //   continue;
      // }
      // if(item[key][keyinkey].sold >= productlist[0].sold){
      //   productlist.pop();
      //   let prevsold = productlist.pop();
      //   productlist.push(item[key][keyinkey])
      //   productlist.push(prevsold);
      // }
    }
  }

  searchbarfunc();
  list.sort(function (a, b) {
    return b.sold - a.sold;
  })
  let slider = document.querySelector(".my-slider")
  for (let index = 0; index < 20; index++) {

    let newData =
      ` <div class="product card-product-wrapper-ts">
        <div class="card product rounded w-100 h-100">
          <img class="card-img-top" src="${list[index].avatarURL}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title rounded">${list[index].name}</h5>
            <div class="bottom-price-star">
              <div class="rating">
                <span class="fa fa-star text-warning"></span>
                <span class="fa fa-star text-warning"></span>
                <span class="fa fa-star text-warning"></span>
                <span class="fa fa-star text-warning"></span>
                <span class="fa fa-star"></span>
                <span>(${list[index].sold})</span>
              </div>
            </div>
            <p href="#" class="text-danger mb-0 price">${list[index].price.toLocaleString()}??</p>
          </div>
          <div class = "add-cart" id="${list[index].id}">
            <i class="bi bi-cart2"></i>
          </div>
        </div>
      </div>`
    $('.my-slider').append(newData);
  }
  loadSlider();
}

function loadSlider() {
  let slider = tns({
    container: '.my-slider',
    items: 1,
    gutter: 20,
    slideBy: 1,
    autoplay: true,
    controlsContainer: '#controls',
    edgePadding: 20,
    prevButton: '.previous',
    nextButton: '.next',
    autoplayButton: '.auto',
    mouseDrag: true,
    autoplayHoverPause: true,
    nav: false,
    responsive: {
      600: {
        items: 2
      },
      900: {
        items: 3
      },
      1200: {
        items: 4
      },
      1400: {
        items: 4
      }
    },
  });
}
//top rating

//searchbar
function searchbarfunc() {
  let searchval = document.querySelector("#searchbarinp")
  let searchdropdown = document.querySelector('#dropdownsearchbar')
  searchval.addEventListener('click', function (e) {
    if (searchval.value.trim() == '') {
      searchdropdown.style.opacity = 0;
    } else {
      searchdropdown.style.opacity = 1;
    }
  })

  searchval.addEventListener('keyup', function (e) {
    let limit = 5;
    let dropdown = document.querySelector("#dropdownsearchbar");
    dropdown.innerHTML = '';
    let searchstr = removeVietnameseTones(searchval.value).toLowerCase()
    for (let index = 0; index < list.length; index++) {
      if (removeVietnameseTones(list[index].name).toLowerCase().includes(searchstr)) {
        //console.log(removeVietnameseTones(list[index].name).toLowerCase());
        let data = `
        <li>
          <div class="product p-1">
            <div class="card d-flex flex-row product shadow-sm rounded w-100 h-50">
              <img class="card-img-top" src="${list[index].avatarURL}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title rounded">${list[index].name}</h5>
                <div class="bottom-price-star">
              </div>
              <p href="#" class="text-danger mb-0 price">${list[index].price.toLocaleString()}???</p>
            </div>

          </div>
        </li>`
        $("#dropdownsearchbar").append(data)
        console.log(list[index].id);
        limit--;
      }
      if (limit == 0) break;
    }
    if (limit == 5 || searchstr.trim() == '') {
      //kh??ng tim duoc product match search
      searchdropdown.style.opacity = 0;
    } else {
      searchdropdown.style.opacity = 1;
    }
    $("#dropdownsearchbar").addClass("show")
    addToCartSearch();
  })

}

function removeVietnameseTones(str) {
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
  str = str.replace(/??|??|???|???|??/g, "i");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
  str = str.replace(/???|??|???|???|???/g, "y");
  str = str.replace(/??/g, "d");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
  str = str.replace(/??|??|???|???|??/g, "I");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
  str = str.replace(/???|??|???|???|???/g, "Y");
  str = str.replace(/??/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ?? ?? ??  ??, ??, ??, ??, ??
  // Remove extra spaces
  // B??? c??c kho???ng tr???ng li???n nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // B??? d???u c??u, k?? t??? ?????c bi???t
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}

$("#dropdownsearchbar").click(function (e) {
  e.stopPropagation()
});