window.addEventListener('DOMContentLoaded', function () {
    if (window.innerHeight > 1000) {
        $("#magazine").turn({
            width: 800,
            height: 570,
            gradients: true,
            acceleration: true,
        });
    }
    else if (window.innerHeight < 1000) {
        $("#magazine").turn({
            width: 707,
            height: 500,
            gradients: true,
            acceleration: true,
        });
    }
    else if (window.innerHeight < 640 ) {
        $("#magazine").turn({
            width: 636,
            height: 450,
            gradients: true,
            acceleration: true,
        });
    }
    else if (window.innerHeight < 400){
        $("#magazine").turn({
            width: 537,
            height: 380,
            gradients: true,
            acceleration: true,
        });
    }
});