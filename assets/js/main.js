async function getApi(url) {
    const response = await fetch(url);
    var data = await response.json();
    show(data);
    // console.log(data)
}
function show(data) {
    let htmlDisplayBox = ""
    let totalTask = 0
    if (data.length == 0) {
        htmlDisplayBox = `<div class="row g-3 m-auto">
          <div class="col">
            <h3 class = "text-center mt-5">No task Added</h3>
          </div>
        </div>`
    } else {
        for (let todo of data) {
            if (todo.finished) {
            }
            else {
                totalTask = totalTask + 1
            }
            let oneTodo =
                `<div class="mt-5">
                    <div class="row">
                        <div class="col-10 ms-auto me-auto">
                            ${statusShower(todo.finished, todo.id)}
                        </div>
                        <div class="col-2 ms-auto">
                            <button data-todo-id="${todo.id}" onclick="deleteTodo(this);" class="btn btn-outline-danger">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <form onsubmit="updateTask(${todo.id})">
                        <div class="row mt-3">
                            <div class="col-12">
                                <input class="h4 text-field border-0 h-75 w-100" required value="${todo.title}" type="text" onfocus = "showSaveButton(${todo.id})" id="taskTitle${todo.id}" />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-5">
                                <p class="text-success"> Created Date  :   ${displayableDate(todo.createdAt)} </p>
                            </div>
                            <div class="col-5">
                                <p class="text-danger"> Due Date  :      ${displayableDate(todo.due_date)} </p>
                            </div>
                            <div class="col-2">
                                <button id="saveButton${todo.id}" type="submit" style = "display : none;" class="btn btn-outline-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                    <hr />
                </div > `
            htmlDisplayBox = htmlDisplayBox + oneTodo
        }
    }
    document.getElementById("contant").innerHTML = htmlDisplayBox
    console.log(totalTask)
    if (totalTask != null) {
        // const numberOfTasks = `<p class="text-secondary text-center"> Pending Task(s) : ${totalTask}   </p>`
        // document.getElementById("userTaskStatus").innerHTML = numberOfTasks;
        // console.log(totalTask)
    }
}
function displayableDate(date) {
    dueObject = new Date(date)
    let dueYear = dueObject.getFullYear().toString().slice(2)
    let dueMonth = dueObject.toLocaleString('default', { month: 'short' })
    dueDate = dueObject.getDate()
    let dueDisplayString = `${dueDate}  ${dueMonth} ${dueYear} `
    return dueDisplayString
}
function statusShower(statusIsCompleted, id) {
    if (statusIsCompleted) {
        const returnTag = `<button class="btn btn-success" disabled> Completed </button>`
        return returnTag
    }
    else {
        const returnTag = `<button data-todo-id="${id}" onclick = "updateTodo(this)" class="btn btn-outline-success" > Mark as completed </button> `
        return returnTag
    }
}

function showSaveButton(todoId) {
    // console.log(todoId)
    const saveButton = document.getElementById("saveButton" + todoId)
    // console.log(saveButton)
    saveButton.style.display = "flex"
}