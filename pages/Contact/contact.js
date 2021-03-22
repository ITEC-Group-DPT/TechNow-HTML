$(document).ready(function () {
    console.log('helo');
    $('#form').submit(function (e) {
        e.preventDefault();
        $('.alert').removeClass('d-none')
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 2000);
    });
});