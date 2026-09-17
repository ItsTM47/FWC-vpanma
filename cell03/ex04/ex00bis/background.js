$(function () {
    $("#change-color").on("click", function () {
        const color = "#" + Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");

        $("body").css("background-color", color);
    });
});
