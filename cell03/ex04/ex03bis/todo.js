$(function () {
    const cookieName = "todo_list";
    const $list = $("#ft_list");

    function saveTodos() {
        const todos = $list.children().map(function () {
            return $(this).text();
        }).get();
        const savedTodos = JSON.stringify(todos);

        try {
            localStorage.setItem(cookieName, savedTodos);
        } catch (error) {
            // Storage may be unavailable when the page is opened as a local file.
        }

        document.cookie = cookieName + "=" + encodeURIComponent(savedTodos) +
            "; path=/; max-age=31536000";
    }

    function loadTodos() {
        try {
            const todos = JSON.parse(localStorage.getItem(cookieName));
            if (Array.isArray(todos)) return todos;
        } catch (error) {
            // Fall back to the cookie if local storage is unavailable or invalid.
        }

        const savedCookie = document.cookie.split("; ")
            .find((row) => row.startsWith(cookieName + "="));

        if (savedCookie) {
            try {
                const todos = JSON.parse(decodeURIComponent(savedCookie.slice(cookieName.length + 1)));
                if (Array.isArray(todos)) return todos;
            } catch (error) {
                // Ignore an invalid or outdated todo cookie.
            }
        }

        return [];
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

    loadTodos().forEach((todo) => addTodo(String(todo), false));
});
