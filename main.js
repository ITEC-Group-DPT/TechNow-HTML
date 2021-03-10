var products;

const getProducts = (item) => {
    let url = 'https://technow-4b3ab.firebaseio.com/.json'
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (this.status == 200) {
            item = JSON.parse(this.responseText);
            console.log(item.Products.Keyboard);
        }
    }
    xhr.send();
}

getProducts(products);
console.log(products);
