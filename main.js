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