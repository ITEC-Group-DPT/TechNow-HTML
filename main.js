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

// UI
let test = document.querySelector(".pop-up-items")
let fade = false;
let dropdownMenu = document.querySelector(".dropdown");
console.log(dropdownMenu);
//dropdownMenu.classList.add("hoverable");

$(document).scroll(function () {
    let y = $(this).scrollTop();
    if (y > 100 && fade == false) {
        fadeIn(test);
        fade = true;
    } else if (y <= 100 && fade == true) {
        fadeOut(test);
        fade = false;
    }
});

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