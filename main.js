var products;

$(document).ready(() => {
  getProducts(products);
})


const getProducts = (item) => {
  let url = 'https://technow-4b3ab.firebaseio.com/.json';
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status == 200) {
      item = JSON.parse(this.responseText).Products;
      loadProductSection(item, 'CPU');
      loadProductSection(item, 'Case');
      loadProductSection(item, 'GamingChair');
      loadProductSection(item, 'Headphone');
      // loadProductSection(item, 'Keyboard');
      // loadProductSection(item, 'Laptop');
      // loadProductSection(item, 'Mainboard');
      // loadProductSection(item, 'Monitor');
      // loadProductSection(item, 'Mouse');
      // loadProductSection(item, 'PSU');
      // loadProductSection(item, 'RAM');
      // loadProductSection(item, 'SSD');
      // loadProductSection(item, 'Speaker');
      // loadProductSection(item, 'VGA');
    }
  }
  xhr.send();
}

// slider
let slider = tns({
  container: '.my-slider',
  items: 1,
  gutter: 15,
  slideBy: 2,
  autoplay: true,
  controlsContainer: '#controls',
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
//end slider

const loadProductSection = (item, section) => {
  let sectionObj = item[section];
  if (section == 'Laptop') section = 'Lap';
  if (section == 'Monitor') section = 'Mon';
  console.log(sectionObj);
  for (let i = 1; i <= 4; i++) {
    let padding = '';
    if (i == 1) padding = 'pl-0'
    if (i == 4) padding = 'pr-0'

    let product = sectionObj[section + '0' + i];
    let newData =
      `<div class="col-lg-3 col-md-6 col-xs-12 my-3 mx-0 ${padding} rounded">
        <div class="card product w-100 h-100">
        <img class="card-img-top" src="${product.avatarURL}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title rounded">${product.name}</h5>
          <div class="bottom-price-star">
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
