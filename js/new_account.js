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
    if(e.keyCode == 13) {
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
    if(sd.length > 5 && sd.length < 13) {
    for (let i = 0; i < sd.length; i++) {
      if (isNaN(sd[i])) {
        return false;
      }
    }
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
      return false;
    }
    pos2 = pos;
    for (i = pos; i < email.length; i++) {
      if (email.charAt(i) === ".") {
        pos2 = i;
        break;
      }
    }
    if (pos2 == pos) return false;
    if (pos2 == (email.length - 1)) return false;
    return true;
}

//check mật khẩu và xác nhận mật khẩu
function checkPass() {
    if(document.getElementById("pass").value === document.getElementById("re_pass").value) {
        return true;
    }
    return false;
}

//lấy thông tin trong API
function getAccount(callback) {
    fetch(apiAccount).then(function(res) {
        return res.json().then(callback);
    });
}

//check tên trong list tài khoản 
function checkNameaccount(data) {
    var name = document.getElementById("name").value;
    data.forEach((data) => {
        if(name == data.username) {
            return false;
        }
    });
    return true;
}

function checkMailaccount(data) {
    var mail = document.getElementById("email").value;
    data.forEach((data) => {
        if(mail == data.email) {
            return false;
        }
    });
    return true;
}

function checkPhoneaccount(data) {
    var phone = document.getElementById("phone").value;
    data.forEach((data) => {
        if(phone == data.phone) {
            return false;
        }
    });
    return true;
}


function signup() {
    var ero = 0;
    document.getElementById("er_name").innerHTML = "";
    document.getElementById("er_mail").innerHTML = "";
    document.getElementById("er_phone").innerHTML = "";
    document.getElementById("er_pass").innerHTML = "";
    document.getElementById("er_re_pass").innerHTML = "";
    document.getElementById("er_check_pass").innerHTML = "";
    if(document.getElementById("name").value == "") {
        document.getElementById("er_name").innerHTML = "vui lòng nhập tên tài khoản";
        ero += 1;
    }
    if(document.getElementById("email").value == "") {
        document.getElementById("er_mail").innerHTML = "vui lòng nhập Email";
        ero += 1;
    } 
    if(document.getElementById("phone").value == "") {
        document.getElementById("er_phone").innerHTML = "vui lòng nhập số điện thoại";
        ero += 1;
    }
    if(document.getElementById("pass").value == "") {
        document.getElementById("er_pass").innerHTML = "vui lòng nhập mật khẩu";
        ero += 1;
    }
    if(document.getElementById("re_pass").value == "" && document.getElementById("pass").value != "") {
        document.getElementById("er_re_pass").innerHTML = "vui lòng xác nhận mật khẩu";
        ero += 1;
    }
    if(document.getElementById("name").value != "" && document.getElementById("email").value != "" 
    && document.getElementById("phone").value != "" && document.getElementById("pass").value != "" 
    && document.getElementById("re_pass").value != "") {
        if(!checkPass()) {
            document.getElementById("er_check_pass").innerHTML = "Mật khẩu và Xác nhận mật khẩu không khớp";
            ero += 1;
        }
        if(!formEmail()) {
            document.getElementById("er_mail").innerHTML = "Email không hợp lệ";
            ero += 1;
        }
        if(!formPhone()) {
            document.getElementById("er_phone").innerHTML = "Số điện thoại không hợp lệ";
            ero += 1;
        }
        if(!getAccount(checkNameaccount)) {
            document.getElementById("er_name").innerHTML = "Tên tài khoản đã tồn tại";
            ero += 1;
        }
        if(!getAccount(checkMailaccount)) {
            document.getElementById("er_mail").innerHTML = "Email đã tồn tại";
            ero += 1;
        }
        if(!getAccount(checkPhoneaccount)) {
            document.getElementById("er_phone").innerHTML = "Số điện thoại đã tồn tại";
            ero += 1;
        }
    }
    if(ero == 0) {
        hanldeNewaccount();
    }
}


//post lên API
function newUser(data) {
    fetch(apiAccount, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(function(res) {
        return res.json();
    });
}

// Tạo thông tin tài khoản
function hanldeNewaccount() {
    var username = document.getElementById("name");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var pass = document.getElementById("pass");
    let list_account = {
        type: "user",
        username: username.value,
        email: email.value,
        phone: phone.value,
        password: pass.value,
    }
    newUser(list_account);
}