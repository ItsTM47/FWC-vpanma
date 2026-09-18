const form = document.getElementById("calculator");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const leftText = document.getElementById("left").value.trim();
    const rightText = document.getElementById("right").value.trim();
    const operator = document.getElementById("operator").value;

    if (!/^\d+$/.test(leftText) || !/^\d+$/.test(rightText)) {
        alert("Error :(");
        return;
    }

    const left = Number(leftText);
    const right = Number(rightText);

    if ((operator === "/" || operator === "%") && right === 0) {
        alert("It's over 9000!");
        return;
    }

    let result;

    switch (operator) {
        case "+":
            result = left + right;
            break;
        case "-":
            result = left - right;
            break;
        case "*":
            result = left * right;
            break;
        case "/":
            result = left / right;
            break;
        case "%":
            result = left % right;
            break;
    }

    alert(result);
    console.log(result);
});

setInterval(function () {
    alert("Please, use me...");
}, 30000);
