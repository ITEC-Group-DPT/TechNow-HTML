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
            items: 3
        },
        1200: {
            items: 4
        },
        1400: {
            items: 5
        }
    },
});
//end slider

const loadProductSection = (item, section) => {
  let sectionObj = item[section];
  if(section == 'Laptop') section = 'Lap';
  if(section == 'Monitor') section = 'Mon';
  console.log(sectionObj);
  for (let i = 1; i <= 4; i++) {
    let product = sectionObj[section + '0' + i];
    let newData = `<div class="col-lg-3 col-md-6 col-xs-12 rounded">
      <div class="product mt-3 mb-5">
        <div class="card">
        <img class="card-img-top" src="${product.avatarURL}" alt="Card image cap">
        <div class="card-body">
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
