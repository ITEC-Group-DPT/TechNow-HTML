var products;

$(document).ready(() => {
  
  getProducts(products);
 
  //Add event listener
})

const getProducts = (item) => {
  console.log('hehe');
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

    }
  }
  xhr.send();
}

const loadProductSection = (item, section) => {
  let sectionObj = item[section];
  console.log(sectionObj);
  for (let i = 10; i <= 17; i++) {
    let product = sectionObj[section + i];
    let newData =
      `<div class="col-lg-3 col-6 card-product-wrapper mb-0 mt-3 mx-0 rounded">
        <div class="card product shadow-sm rounded">
          <a href="#" class="img-card"><img class="card-img-top" src="${product.avatarURL}" alt="Card image cap"></a>
        <div class="card-body h-75">
          <h5 class="card-title rounded">${product.name}</h5>
          <div class="rating">
            <span class="fa fa-star text-warning"></span>
            <span class="fa fa-star text-warning"></span>
            <span class="fa fa-star text-warning"></span>
            <span class="fa fa-star text-warning"></span>
            <span class="fa fa-star"></span>
            <span>(${product.sold})</span>
          </div>
          <p href="#" class="text-danger mb-0 price">${product.price.toLocaleString()}₫</p>
        </div>
      </div>
    </div>`
    let section_row = '.' + section + '-row';
    $(section_row).append(newData);
  }
}

// UI
let popUpNavItems = document.querySelector(".pop-up-items")
let fade = false;
let dropdownMenu = document.querySelector(".dropdown");
let dropdownIcon = document.querySelector(".dropdown .nav-link")

$(document).scroll(function () {
  let y = $(this).scrollTop();
  if (y > 100 && fade == false) {
    fadeIn(popUpNavItems);
    fade = true;
  } else if (y <= 100 && fade == true) {
    fadeOut(popUpNavItems);
    fade = false;
  }

  if (y > 600) allowHover(true);
  else allowHover(false);
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
  console.log("fade IN");
  el.style = "display: flex";
  setTimeout(function () {
    el.style = "opacity: 1";
  }, 300);
}

function fadeOut(el) {
  document.querySelector('#dropdownsearchbar').style.opacity = 1
  console.log("fade OUT");
  el.style = "opacity: 0";
  setTimeout(function () {
    el.style = "display: none";
  }, 300);
}

//top rating 
let list = [];
function sortingSold(itemset) {
  console.log("hello");
  for (const catalog in itemset) {
    for (const item in itemset[catalog]) {
      if (Number.isInteger(itemset[catalog][item].sold)) {
        list.push(itemset[catalog][item])
      }
      // sort theo từng catalog top rating 2 cái / catalog
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
  console.log(list);

  list.sort(function (a, b) {
    return b.sold - a.sold;
  })
  console.log(list);
  let slider = document.querySelector(".my-slider")
  for (let index = 0; index < 2; index++) {
    let newData = `
      <div class="product">
        <div class="card product shadow-sm rounded w-100 h-100">
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
          <p href="#" class="text-danger mb-0 price">${list[index].price.toLocaleString()}₫</p>
          </div>
        </div>
        </div>`
    $('.my-slider').append(newData);
  }
  loadSlider();
}

function loadSlider() {
  console.log('slider');
  let slider = tns({
    container: '.my-slider',
    items: 1,
    gutter: 20,
    slideBy: 2,
    autoplay: true,
    controlsContainer: '#controls',
    edgePadding: 20,
    prevButton: '.previous',
    nextButton: '.next',
    autoplayButton: '.auto',
    autoplayHoverPause: true,
    nav: false,
    responsive: {
      640: {
        items: 1
      },
      1200: {
        items: 1
      },
      1400: {
        items: 1
      }
    },
  });
}
//top rating

//searchbar

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}

// $("#searchbarinp").on('click', function (e) {
//   if ($("#searchbarinp").val().length == 0) {
//     $("#searchbarinp").css = 0;
//   }
// })
