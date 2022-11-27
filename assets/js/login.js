function show_password() {                         // showing password in html page
    let checkBox = document.getElementById("showPassword");
    // console.log(checkBox)
    if (checkBox.checked) {
        document.getElementById("password").type = "text";
        // document.getElementById("confirmPassword").type = "text";
    } else {
        document.getElementById("password").type = "password";
        // document.getElementById("confirmPassword").type = "password";
    }
}

async function loginHandler(event) {
    event.preventDefault()
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    // console.log(userName)
    // console.log(password)
    // console.log(await isUserDetailsIsMatch(userName, password))
    if (await isUserDetailsIsMatch(userName, password)) {
        const data = await getTokens(userName, password);
        const raw = JSON.parse(data)
        console.log(raw)
        // console.log(data.response)
        // console.log(raw.assesToken)
        // console.log(raw.refreshToken)
        console.log((raw.assesToken == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZlbmthdCIsInBhc3N3b3JkIjoiSGFwcHl0QDEyMyIsInVzZXJfaWQiOjEsImlhdCI6MTY2NTU1MTMxNSwiZXhwIjoxNjY1NTU4NTE1fQ.oSkHpx41so63R7GR2ZTYIdzVOEOD2io47DmN4NLw6Kk"))
        console.log((raw.refreshToken == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZlbmthdCIsInBhc3N3b3JkIjoiSGFwcHl0QDEyMyIsInVzZXJfaWQiOjEsImlhdCI6MTY2NTU1MTMxNX0.BstZ1b6Dplwh3oJn5ZJLE3hq0u2ZhJ7CO-xH2XRHVeQ"))
        alert(data)
        // alert(data.assesToken)
        // alert(data.refreshToken)
        // localStorage.getItem("",)
        window.location.href = "./../../index.html"
    } else {
        document.getElementById("alert-msg").innerHTML = `<p class="mt-5 text-center text-danger">Something Wong with your User Details</p>`
    }
}

async function isUserDetailsIsMatch(userName, password) {
    let isUserDetailsIsNotMatch = false
    const users = await getDataS("http://localhost:4200/api/user")
    // console.log(users)
    for (const user of users) {
        // console.log(user)
        if (userName == user.username && password == user.password) {

            // console.log((userName == user.username && password == user.password))
            isUserDetailsIsNotMatch = true
            break
        }
    }
    return isUserDetailsIsNotMatch
}

async function getTokens(userName, password) {
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

    const response = await fetch("http://localhost:4200/login", requestOptions)
    var data = await response.text();
    alert(data)
    return data
}