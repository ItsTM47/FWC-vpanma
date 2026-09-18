$(function () {
    let size = 200;
    let colorIndex = 0;
    const colors = ["red", "green", "blue"];
    const $balloon = $("#balloon");

    function updateBalloon() {
        $balloon.css({
            width: size + "px",
            height: size + "px",
            backgroundColor: colors[colorIndex]
        });
    }

    $balloon.on("click", function () {
        size += 10;
        if (size > 420) size = 200;
        colorIndex = (colorIndex + 1) % colors.length;
        updateBalloon();
    });

    $balloon.on("mouseleave", function () {
        size = Math.max(200, size - 5);
        colorIndex = (colorIndex - 1 + colors.length) % colors.length;
        updateBalloon();
    });
});
