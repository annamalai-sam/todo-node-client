
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

async function getTodoS(url) {
    const response = await fetch(url);
    var data = await response.json();
    show(data);
    // console.log(data)
}

async function getDataS(url) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(url, requestOptions)
    var users = await response.json()
    // console.log(users)
    return users
}

async function getUserData(url) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZlbmthdCIsInBhc3N3b3JkIjoiSGFwcHl0QDEyMyIsInVzZXJfaWQiOjEsImlhdCI6MTY2NTU3MTAzNywiZXhwIjoxNjY1NTc4MjM3fQ.PobcSwk9TIvT6iheqmJig9BSMVr1B8EAuftrF9VBe1Q");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const response = await fetch(url, requestOptions)
    var userData = await response.json()
    // console.log(userData)
    return userData
}

function createTodo() {
    let title = document.getElementById("todoText").value
    let due_date = document.getElementById("date").value
    let user_id = document.getElementById("user_id").value
    // console.log(title)
    // console.log(due_date)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "title": title,
        "due_date": due_date,
        "user_id": user_id
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

