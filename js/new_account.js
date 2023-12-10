

document.getElementById("name").focus()

document.getElementById("name").onkeyup = function (e) {
    Next_value(e, "email")
}

document.getElementById("email").onkeyup = function (e) {
    Next_value(e, "phone")
}

document.getElementById("phone").onkeyup = function (e) {
    Next_value(e, "pass")
}

document.getElementById("pass").onkeyup = function (e) {
    Next_value(e, "re_pass")
}

function Next_value(e, id) {
    if (e.keyCode == 13) {
        document.getElementById(id).focus()
    }
}

let apiAccount = "http://localhost:3000/list_account";

function back() {
    location.assign("/index.html")
}

// check định dạng số điện thoại
function formPhone() {
    var sd = document.getElementById("phone").value;
    if (sd.length > 5 && sd.length < 13) {
        for (let i = 0; i < sd.length; i++) {
            if (isNaN(sd[i])) {
                return true;
            }
        }
        return false;
    }
    return true;
}
//check định dạng mật khẩu
function formPassword() {
    var a = document.getElementById("pass").value;
    if(a.length < 4) {
        return true;
    }
    return false;
}

//check định dạng Email
function formEmail() {
    var email = document.getElementById("email").value;
    var pos = 0;
    for (i = 0; i < email.length; i++) {
        if (email.charAt(i) == "@") {
            pos = i;
            break;
        }
    }
    if (pos == 0) {
        return true;
    }
    pos2 = pos;
    for (i = pos; i < email.length; i++) {
        if (email.charAt(i) == ".") {
            pos2 = i;
            break;
        }
    }
    if (pos2 == pos) return true;
    if (pos2 == (email.length - 1)) return true;
    return false;
}

//check mật khẩu và xác nhận mật khẩu
function checkPass() {
    if (document.getElementById("pass").value === document.getElementById("re_pass").value) {
        return false;
    }
    return true;
}

//định dạng tên tài khoản
function formUsername() {
    var a = document.getElementById("name").value
    if(a.length < 4) {
        return true;
    }
    return false;
}

//lấy thông tin trong API
function getAccount(callback) {
    fetch(apiAccount).then(function (res) {
        return res.json().then(callback);
    });
}

//check tên trong list tài khoản 
function checkNameaccount(data) {
    var name = document.getElementById("name").value;
    data.forEach((data) => {
        if (name == data.user_name) {
            document.getElementById("er_name").innerHTML = "Tên tài khoản đã tồn tại";
        }
    });
    return true;
}

function checkMailaccount(data) {
    var mail = document.getElementById("email").value;
    data.forEach((data) => {
        if (mail == data.email) {
            document.getElementById("er_mail").innerHTML = "Email đã tồn tại";
        }
    });
    return true;
}

function checkPhoneaccount(data) {
    var phone = document.getElementById("phone").value;
    data.forEach((data) => {
        if (phone == data.phone_number) {
            document.getElementById("er_phone").innerHTML = "Số điện thoại đã tồn tại"
        }
    });
    return true;
}


function signup() {
    
    document.getElementById("er_name").innerHTML = "";
    document.getElementById("er_mail").innerHTML = "";
    document.getElementById("er_phone").innerHTML = "";
    document.getElementById("er_pass").innerHTML = "";
    document.getElementById("er_re_pass").innerHTML = "";
    document.getElementById("er_check_pass").innerHTML = "";
    if (document.getElementById("name").value == "") {
        document.getElementById("er_name").innerHTML = "vui lòng nhập tên tài khoản";

    }
    if (document.getElementById("email").value == "") {
        document.getElementById("er_mail").innerHTML = "vui lòng nhập Email";

    }
    if (document.getElementById("phone").value == "") {
        document.getElementById("er_phone").innerHTML = "vui lòng nhập số điện thoại";

    }
    if (document.getElementById("pass").value == "") {
        document.getElementById("er_pass").innerHTML = "vui lòng nhập mật khẩu";

    }
    if (document.getElementById("re_pass").value == "" && document.getElementById("pass").value != "") {
        document.getElementById("er_re_pass").innerHTML = "vui lòng xác nhận mật khẩu";

    }
    if (document.getElementById("name").value != "" && document.getElementById("email").value != ""
        && document.getElementById("phone").value != "" && document.getElementById("pass").value != ""
        && document.getElementById("re_pass").value != "") {

            getAccount(checkNameaccount)

            getAccount(checkMailaccount)

            getAccount(checkPhoneaccount)

            if (checkPass()) {
                document.getElementById("er_check_pass").innerHTML = "Mật khẩu và Xác nhận mật khẩu không khớp";

            }
            if(formPassword()) {
                document.getElementById("er_check_pass").innerHTML = "";
                document.getElementById("er_pass").innerHTML = "Mật khẩu cần ít nhất 4 kí tự"

            }
            if(formUsername()) {
                document.getElementById("er_name").innerHTML = "Tên tài khoản cần ít nhất 4 kí tự"
                
            }
            if (formEmail()) {
                document.getElementById("er_mail").innerHTML = "Email không hợp lệ";

            }
            if (formPhone()) {
                document.getElementById("er_phone").innerHTML = "Số điện thoại không hợp lệ";

            }
    }
    if (document.getElementById("er_name").innerHTML == "" &&
    document.getElementById("er_mail").innerHTML == "" &&
    document.getElementById("er_phone").innerHTML == "" &&
    document.getElementById("er_pass").innerHTML == "" &&
    document.getElementById("er_re_pass").innerHTML == "" &&
    document.getElementById("er_check_pass").innerHTML == "") {
        hanldeNewaccount();
        alert("Đăng ký tài khoản thành công")
    }
}
//Tạo mã khách hàng bằng random
function randomIp() {
    var random = ""
    var character = 'ABCDEFGHJKLQWRTYUIOPZXVNM'
    var number = '0123456789'
    for (var i, i = 0; i < 4; i++) {
        random += character.charAt(Math.floor(Math.random() * character.length))
    }
    for (var i, i = 0; i < 4; i++) {
        random += number.charAt(Math.floor(Math.random() * number.length))
    }
    return random
}

//check mã trong API và trả về
function test() {
    var ipdata = randomIp()
    var a = fetch(apiAccount).then(res => res.json())
    .then(data => {
        data.forEach((data) => {
            if (ipdata == data.id_staff || ipdata == data.id_user) {
                test();
            }
        });
    })
    return ipdata
}

//post lên API
function newUser(data) {
    fetch(apiAccount, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(function (res) {
        return res.json();
    });
}

// Tạo thông tin tài khoản
function hanldeNewaccount() {
    var username = document.getElementById("name");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var pass = document.getElementById("pass");
    var ipdata = test();
    console.log(ipdata);
    let list_account = {
        id_user: ipdata,
        type: "user",
        user_name: username.value,
        email: email.value,
        phone_number: phone.value,
        password: pass.value,
    }
    newUser(list_account);
}