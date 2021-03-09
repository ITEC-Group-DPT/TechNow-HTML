var products;

const getProducts = (item) => {
    let url = 'https://api.jsonbin.io/b/604786ab7ea6546cf3d83dc4'
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (this.status == 200) {
            item = JSON.parse(this.responseText);
            console.log(item.Products.CPU.CPU01);
        }
    }
    xhr.send();
}

getProducts(products);
console.log(products);