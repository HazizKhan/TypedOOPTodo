var todos = [];
var Todo = (function () {
    function Todo(task, status) {
        this.task = task;
        this.status = status;
    }
    Todo.prototype.get = function (index) {
        document.querySelector("tbody").innerHTML += "\n        <tr>\n            <td>\n                <input type=\"checkbox\" " + this.status + " id=\"" + index + "\" onclick=\"Todo.statusChanger(this)\">\n            </td>\n            <td class=\"" + this.status + "\">\n                <span id=\"span" + index + "\">" + this.task + "</span>\n                <input type=\"text\" value=\"" + this.task + "\" id=\"input" + index + "\" style=\"display:none;\">\n            </td>\n            <td>\n                <button data-index=\"" + index + "\" onclick=\"Todo.edit(this)\">Edit</button>\n                <button data-index=\"" + index + "\" onclick=\"Todo.delete(this)\">Delete</button>\n            </td>\n        </tr>\n        ";
    };
    Todo.set = function (input) {
        if (input.value !== "") {
            todos.unshift(new Todo(input.value, "unchecked"));
            document.querySelector("tbody").innerHTML = "";
            showTodos();
        }
    };
    Todo.statusChanger = function (checkbox) {
        if (todos[checkbox.id].status === "checked") {
            todos[checkbox.id].status = "unchecked";
            document.querySelector("tbody").innerHTML = "";
            showTodos();
        }
        else {
            todos[checkbox.id].status = "checked";
            document.querySelector("tbody").innerHTML = "";
            showTodos();
        }
    };
    Todo.delete = function (btn) {
        todos.splice(btn.dataset.index, 1);
        document.querySelector("tbody").innerHTML = "";
        showTodos();
    };
    Todo.edit = function (btn) {
        var input = document.getElementById("input" + btn.dataset.index);
        var span = document.getElementById("span" + btn.dataset.index);
        if (btn.innerHTML === "Edit") {
            btn.innerHTML = "Update";
            input.removeAttribute("style");
            span.setAttribute("style", "display:none;");
        }
        else {
            if (input.value !== "") {
                todos[btn.dataset.index].task = input.value;
                document.querySelector("tbody").innerHTML = "";
                showTodos();
            }
        }
    };
    return Todo;
}());
todos.unshift(new Todo("Checked", "checked"));
todos.unshift(new Todo("Unchecked", "unchecked"));
function showTodos() {
    for (var i = 0; i < todos.length; i++) {
        todos[i].get(i);
    }
}
showTodos();
// (<HTMLFormElement>document.querySelector("form")).onsubmit = function(){
//     let input = (<HTMLInputElement>document.getElementById("input"));
//     if(input.value !== ""){
//         todos.unshift(new Todo(input.value, "unchecked"));
//         document.querySelector("table").innerHTML = "";    
//         showTodos();
//     }
// };
var input = document.getElementById("input");
document.querySelector("form").setAttribute("onsubmit", "Todo.set(input);");
//# sourceMappingURL=app.js.map