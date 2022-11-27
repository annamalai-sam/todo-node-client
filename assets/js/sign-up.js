function show_password() {                         // showing password in html page
    let checkBox = document.getElementById("showPassword");
    // console.log(checkBox)
    if (checkBox.checked) {
        document.getElementById("password").type = "text";
        document.getElementById("confirmPassword").type = "text";
    } else {
        document.getElementById("password").type = "password";
        document.getElementById("confirmPassword").type = "password";
    }
}

async function createNewUser(event) {
    event.preventDefault()
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    // console.log(userName)
    // console.log(password)
    // console.log(confirmPassword)
    if (password != confirmPassword) {
        document.getElementById("alert-msg").innerHTML = `<p class="mt-5 text-center text-danger">password is mismatch</p>`
        // console.log(userAlreadyExist(userName))
    }
    const users = await getDataS("http://localhost:4200/api/user")
    console.log(users)
    let isUsed = false;
    for (let user of users) {
        if (user.username == userName) {
            isUsed = true;
            break;
        }
    }
    // console.log(isUsed)
    if (isUsed) {
        document.getElementById("alert-msg").innerHTML = `<p class="mt-5 text-center text-danger"> user already exist </p>`
    }
    else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "username": userName,
            "password": password
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://localhost:4200/api/user", requestOptions).then(
            window.location.href = "./../../index.html"
        )
        // alert("sign up successfully")
    }
}
