var products;

const getProducts = (item) => {
    let url = 'https://firebasestorage.googleapis.com/v0/b/technow-4b3ab.appspot.com/o/products.json?alt=media&token=d3feae38-3cad-42a2-a997-21cabc744dd9'
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send({ 'request': 'd3feae38-3cad-42a2-a997-21cabc744dd9' });
    xhr.onload = function () {
        if (this.status == 200) {
            log
            console.log(this.responseText);
            item = JSON.parse(this.responseText);
        }
    }
    xhr.send();
}

getProducts(products);
console.log(products);