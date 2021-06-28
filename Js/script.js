$("#magazine").turn({
    width: (window.innerHeight-5)*1.40,
    height: window.innerHeight,
    gradients: true,
    acceleration: true,
});

$("#prevBtn").click(function() {
    $("#magazine").turn("previous");
});

$("#nextBtn").click(function() {
    $("#magazine").turn("next");
});

