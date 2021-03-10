var products;

$(document).ready(() => {
    getProducts(products);
})
const getProducts = (item) => {
    console.log('hehe');
    let url = 'https://technow-4b3ab.firebaseio.com/.json'
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (this.status == 200) {
            item = JSON.parse(this.responseText).Products;
            loadProductSection(item, 'CPU');
            loadProductSection(item, 'Case');
        }
    }
    xhr.send();
}

const loadProductSection = (item, section) => {
    let sectionObj = item[section];
    console.log(sectionObj);

    for (let i = 1; i <= 4; i++) {
        let product = sectionObj[section + '0' + i];
        let newData = `<div class="col-lg-3 col-md-6 col-xs-12">
        <div class="product mt-3 mb-5">
            <div class="card">
                <img class="card-img-top"
                    src="${product.avatarURL}"
                    alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <div class="rating">
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star"></span>
                    <span>(${product.sold})</span>
                    </div>
                    <p href="#" class="text-danger mb-0">${product.price} đ</p>
                </div>
                </div>
        </div>`

        let section_row = '.'+section + '-row'; 
        $(section_row).append(newData);
    }
}