var products;

const getProducts = (item) => {
    let url = 'https://technow-4b3ab.firebaseio.com/.json'
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (this.status == 200) {
            item = JSON.parse(this.responseText);
            console.log(item.Products.Keyboard);
            console.log(item.Products.CPU.CPU01);
        }
    }
    xhr.send();
}

getProducts(products);
console.log(products);

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

