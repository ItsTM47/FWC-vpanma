$(function () {
    const cookieName = "todo_list";
    const $list = $("#ft_list");

    function saveTodos() {
        const todos = $list.children().map(function () {
            return $(this).text();
        }).get();

        document.cookie = cookieName + "=" + encodeURIComponent(JSON.stringify(todos)) +
            "; path=/; max-age=31536000";
    }

    function addTodo(text, addToTop) {
        const $item = $("<div>").text(text).on("click", function () {
            if (confirm("Do you want to remove this TO DO?")) {
                $item.remove();
                saveTodos();
            }
        });

        if (addToTop) $list.prepend($item);
        else $list.append($item);
    }

    $("#new").on("click", function () {
        const text = prompt("New TO DO:");
        if (text !== null && text.trim() !== "") {
            addTodo(text.trim(), true);
            saveTodos();
        }
    });

    const savedCookie = document.cookie.split("; ")
        .find((row) => row.startsWith(cookieName + "="));

    if (savedCookie) {
        try {
            const savedTodos = JSON.parse(decodeURIComponent(savedCookie.slice(cookieName.length + 1)));
            if (Array.isArray(savedTodos)) savedTodos.forEach((todo) => addTodo(String(todo), false));
        } catch (error) {
            // Ignore an invalid or outdated todo cookie.
        }
    }
});
