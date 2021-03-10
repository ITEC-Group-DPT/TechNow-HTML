var products;

const getProducts = () => {
    let url = 'https://technow-4b3ab.firebaseio.com/.json'
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (this.status == 200) {
            products = JSON.parse(this.responseText);
            console.log(products.Products.CPU.CPU02);
        }
    }
    xhr.send();
}

getProducts(products);