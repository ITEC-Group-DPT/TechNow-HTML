var products;
$(document).ready(() => {
  getProducts(products);
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
    let product = sectionObj[section + i]; //hehe boiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    let newData =
      `<div class="col-xl-3 col-lg-6 col-md-12 mb-0 mt-3 mx-0 rounded">
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
    let section_row = '.'+section + '-row';
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
    console.log("fade IN");
    el.style = "display: flex";
    setTimeout(function () {
        el.style = "opacity: 1";
    }, 300);
}

function fadeOut(el) {
    console.log("fade OUT");
    el.style = "opacity: 0";
    setTimeout(function () {
        el.style = "display: none";
    }, 300);
}

//top rating 
function sortingSold(itemset) {
  let list = [];
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
  for (let index = 0; index < 20; index++) {
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
    autoplay: false,
    controlsContainer: '#controls',
    edgePadding: 20,
    prevButton: '.previous',
    nextButton: '.next',
    autoplayButton: '.auto',
    nav: false,
    responsive: {
      640: {
        items: 2
      },
      1200: {
        items: 3
      },
      1400: {
        items: 4
      }
    },
  });
}
//top rating