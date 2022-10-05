function deleteTodo(event) {
    const todoId = event.getAttribute("data-todo-id")
    // console.log(todoId)
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
    fetch("http://localhost:8080/api/tasks/" + todoId, requestOptions).then(
        window.location.reload()
    )
}

function createTodo() {
    let title = document.getElementById("todoText").value
    let due_date = document.getElementById("date").value
    // console.log(title)
    // console.log(due_date)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "title": title,
        "due_date": due_date
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://localhost:8080/api/tasks", requestOptions).then(
        window.location.reload()
    )
}

function updateTodo(event) {
    const todoId = event.getAttribute("data-todo-id")
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://localhost:8080/api/status/" + todoId, requestOptions).then(
        window.location.reload()
    )
}

function updateTask(todoId) {
    console.log(todoId)
    let todoTask = document.getElementById("taskTitle" + todoId).value;
    console.log(todoTask)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "title": todoTask
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/api/tasks/" + todoId, requestOptions).then(
        window.location.reload()
    )
}