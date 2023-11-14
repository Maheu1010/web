document.getElementById("name").focus()
console.log("yes")

document.getElementById("name").onkeyup = function (e) {
    Next_value(e, this, "email")
}

document.getElementById("email").onkeyup = function (e) {
    Next_value(e, this, "phone")
}

document.getElementById("phone").onkeyup = function (e) {
    Next_value(e, this, "pass")
}

document.getElementById("pass").onkeyup = function (e) {
    Next_value(e, this, "re_pass")
}

function Next_value(e, theid, id) {
    if(e.keyCode == 13) {
        document.getElementById(id).focus()
        console.log(theid);
    }
}

function back() {
    location.assign("/index.html")
}