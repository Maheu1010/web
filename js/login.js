document.getElementById("name").focus();

function back() {
    location.assign("/index.html")
}

let apiAccount = "http://localhost:3000/list_account";


function login() {
    document.getElementById("ername").innerHTML = "";
    document.getElementById("erpass").innerHTML = "";
    document.getElementById("erall").innerHTML = "";
    if(document.getElementById("name").value == "") {
        document.getElementById("ername").innerHTML = "vui lòng nhập tên tài khoản";
    }
    if(document.getElementById("pass").value == "") {
        document.getElementById("erpass").innerHTML = "vui lòng nhập mật khẩu"
    }
    if(!getAccount(hanldeLogin) && document.getElementById("name").value != "" && document.getElementById("pass").value != "") {
        document.getElementById("erall").innerHTML = "Tên tài khoản hoặc Mật khẩu không chính xác"
    }
}

// lấy thông tin trong API
function getAccount(callback) {
    fetch(apiAccount).then(function(res) {
        return res.json().then(callback);
    });
}

// xử lý thông tin trong form
function hanldeLogin(data) {
    var username = document.getElementById("name").value;
    var pass = document.getElementById("pass").value;
    data.forEach((data) => {
        if(username == data.username && pass == data.password && data.type == "admin") {
            window.location.href = "/html/admin_pro.html";
        }
        if(username == data.username && pass == data.password && data.type == "tst_manager") {
            window.location.href = "/html/transaction_manager.html"
        }
        if(username == data.username && pass == data.password && data.type == "asb_manager") {
            window.location.href = "/html/assembled_manager.html"
        }
        if(username == data.username && pass == data.password && data.type == "tst_staff") {
            window.location.href = "/html/transaction_staff.html"
        }
        if(username == data.username && pass == data.password && data.type == "asb_staff") {
            window.location.href = "/html/assembled_staff.html"
        }
        if(username == data.username && pass == data.password && data.type == "user") {
            window.location.href = "/html/main_display_user.html"
        }
        else {
            return false;
        }
    });
}