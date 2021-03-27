$(document).ready(function () {
    console.log('helo');
    $('.submit-form').submit(function (e) {
        e.preventDefault();
        $('.alert').removeClass('d-none');
        console.log("123132");
        setTimeout(() => {
            window.location.href = '../../index.html'
        }, 2000);
    });
});
