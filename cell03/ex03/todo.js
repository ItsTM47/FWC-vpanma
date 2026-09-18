const list = document.getElementById("ft_list");
const newButton = document.getElementById("new");
const cookieName = "todo_list";

function saveTodos() {
    const todos = Array.from(list.children).map((item) => item.textContent);

    document.cookie =
        cookieName + "=" + encodeURIComponent(JSON.stringify(todos)) +
        "; path=/; max-age=31536000";
}

function addTodo(text, addToTop) {
    const item = document.createElement("div");
    item.textContent = text;

    item.addEventListener("click", function () {
        if (confirm("Do you want to remove this TO DO?")) {
            item.remove();
            saveTodos();
        }
    });

    if (addToTop) {
        list.prepend(item);
    } else {
        list.append(item);
    }
}

newButton.addEventListener("click", function () {
    const text = prompt("New TO DO:");

    if (text !== null && text.trim() !== "") {
        addTodo(text.trim(), true);
        saveTodos();
    }
});

const savedCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName + "="));

if (savedCookie) {
    const savedTodos = JSON.parse(
        decodeURIComponent(savedCookie.split("=")[1])
    );

    savedTodos.forEach((todo) => addTodo(todo, false));
}
