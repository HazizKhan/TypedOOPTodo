let todos = []
class Todo{
    task: string;
    status: string;
    constructor(task, status){
        this.task = task;
        this.status = status;
    }
    get(index){
        document.querySelector("tbody").innerHTML +=  `
        <tr>
            <td>
                <input type="checkbox" ${this.status} id="${index}" onclick="Todo.statusChanger(this)">
            </td>
            <td class="${this.status}">
                <span id="span${index}">${this.task}</span>
                <input type="text" value="${this.task}" id="input${index}" style="display:none;">
            </td>
            <td>
                <button data-index="${index}" onclick="Todo.edit(this)">Edit</button>
                <button data-index="${index}" onclick="Todo.delete(this)">Delete</button>
            </td>
        </tr>
        `;
    }
    static set(input){
        if(input.value !== ""){
        todos.unshift(new Todo(input.value, "unchecked"));
        document.querySelector("tbody").innerHTML = "";    
        showTodos();
        }
        
    }
    static statusChanger(checkbox: HTMLInputElement){
        if(todos[checkbox.id].status === "checked"){
            todos[checkbox.id].status = "unchecked";
            document.querySelector("tbody").innerHTML = "";    
            showTodos();
        } else {
            todos[checkbox.id].status = "checked";
            document.querySelector("tbody").innerHTML = "";    
            showTodos();
        }
    }
    static delete(btn: HTMLButtonElement){
        todos.splice((<any>btn.dataset).index,1);
        document.querySelector("tbody").innerHTML = "";    
        showTodos();
    }
    static edit(btn : HTMLButtonElement){
        let input = (<HTMLInputElement>document.getElementById("input"+(<any>btn.dataset).index));
        let span = document.getElementById("span"+(<any>btn.dataset).index);
        if(btn.innerHTML === "Edit"){
            btn.innerHTML = "Update";
            input.removeAttribute("style");
            span.setAttribute("style", "display:none;")
        } else{
            if(input.value !== ""){
                todos[(<any>btn.dataset).index].task = input.value;
                document.querySelector("tbody").innerHTML = "";    
                showTodos();
            }
        }
    }
}
todos.unshift(new Todo("Checked", "checked"));
todos.unshift(new Todo("Unchecked", "unchecked"));
function showTodos(){
    for (let i = 0; i < todos.length; i++){
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
let input = (<HTMLInputElement>document.getElementById("input"));
(<HTMLFormElement>document.querySelector("form")).setAttribute("onsubmit", "Todo.set(input);");
