var listOfCustomer = [];
var Customer = /** @class */ (function () {
    function Customer(name, email, company, phoneNumber, message) {
        if (message === void 0) { message = []; }
        this._fullName = name;
        this._email = email;
        this._company = company;
        this._phoneNumber = phoneNumber;
        this._message = message;
    }
    Object.defineProperty(Customer.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            this._fullName = newName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (newEmail) {
            this._email = newEmail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "company", {
        get: function () {
            return this._company;
        },
        set: function (newCompany) {
            this._company = newCompany;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "phoneNumber", {
        get: function () {
            return this._phoneNumber;
        },
        set: function (newPhoneNumber) {
            this._phoneNumber = newPhoneNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "messages", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Customer.prototype, "message", {
        set: function (newMessage) {
            this._message.push(newMessage);
        },
        enumerable: true,
        configurable: true
    });
    return Customer;
}());
function getCustomerInfo() {
    var name = document.getElementById("fullName").value;
    var email = document.getElementById("emailCustomer").value;
    var company = document.getElementById("companyCustomer").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    if (name == "") {
        alert("please, Enter customer name!");
        return;
    }
    var checkMail = emailValidation(email);
    if (checkMail == true) {
        if (company == "") {
            alert("please, Enter company name!");
            return;
        }
        var checkNumber = mobileNumber(phoneNumber);
        if (checkNumber == true) {
            var finalNumber = "0" + phoneNumber.substring(4, 13);
            phoneNumber = finalNumber;
            var check = checkPhone(phoneNumber);
            if (check == true) {
                var customer = new Customer(name, email, company, phoneNumber);
                listOfCustomer.push(customer);
                storeCustomerList(listOfCustomer);
                document.getElementById("fullName").value = "";
                document.getElementById("emailCustomer").value = "";
                document.getElementById("companyCustomer").value = "";
                document.getElementById("phoneNumber").value = "";
            }
        }
    }
}
function storeCustomerList(emp) {
    var listOfCustomers = JSON.stringify(emp);
    localStorage.setItem("listOfCustomer", listOfCustomers);
}
function createDiv(div) {
    var allCustomers = document.getElementById("allCustomers");
    var customerInfo = document.createElement("div");
    customerInfo.id = div.phoneNumber;
    customerInfo.classList.add("customer");
    var nameCompany = document.createElement("div");
    nameCompany.id = "nameCompany";
    var customerName = document.createElement("p");
    customerName.innerHTML = '<i class="fa fa-user" aria-hidden="true"></i> ' + div.fullName;
    var customerCompany = document.createElement("p");
    customerCompany.innerHTML = '<i class="fa fa-building" aria-hidden="true"></i> ' + div.company;
    nameCompany.appendChild(customerName);
    nameCompany.appendChild(customerCompany);
    var emailPhone = document.createElement("div");
    emailPhone.id = "emailPhone";
    var customerEmail = document.createElement("p");
    customerEmail.innerHTML = '<i class="fa fa-envelope" aria-hidden="true"></i> ' + div.email;
    var customerPhone = document.createElement("p");
    customerPhone.innerHTML = '<i class="fa fa-mobile fa-2x" aria-hidden="true"></i> ' + div.phoneNumber;
    emailPhone.appendChild(customerEmail);
    emailPhone.appendChild(customerPhone);
    var message = document.createElement("div");
    message.id = "message";
    var textArea = document.createElement("textarea");
    textArea.id = "textArea";
    textArea.classList.add("text-area");
    textArea.placeholder = "Type a message...";
    var sendBtn = document.createElement("button");
    sendBtn.innerHTML = "Send Message!";
    sendBtn.id = "btn";
    sendBtn.addEventListener('click', function () {
        sendMessage(div.phoneNumber);
    });
    message.appendChild(textArea);
    message.appendChild(sendBtn);
    customerInfo.appendChild(nameCompany);
    customerInfo.appendChild(emailPhone);
    customerInfo.appendChild(message);
    allCustomers.appendChild(customerInfo);
}
function reloadCustomersPage() {
    var listWhenreload = JSON.parse(localStorage.getItem("listOfCustomer"));
    if (listWhenreload != null) {
        var len = listWhenreload.length;
        for (var i = 0; i < len; i++) {
            var user = new Customer(listWhenreload[i]._fullName, listWhenreload[i]._email, listWhenreload[i]._company, listWhenreload[i]._phoneNumber, listWhenreload[i]._message);
            listOfCustomer.push(user);
            createDiv(user);
        }
    }
}
function reloadCustomerInfo() {
    var listWhenreload = JSON.parse(localStorage.getItem("listOfCustomer"));
    if (listWhenreload != null) {
        var len = listWhenreload.length;
        for (var i = 0; i < len; i++) {
            var customer = new Customer(listWhenreload[i]._fullName, listWhenreload[i]._email, listWhenreload[i]._company, listWhenreload[i]._phoneNumber, listWhenreload[i]._message);
            listOfCustomer.push(customer);
        }
    }
}
function reloadCustomersMessages() {
    var listWhenreload = JSON.parse(localStorage.getItem("listOfCustomer"));
    if (listWhenreload != null) {
        var len = listWhenreload.length;
        for (var i = 0; i < len; i++) {
            var customer = new Customer(listWhenreload[i]._fullName, listWhenreload[i]._email, listWhenreload[i]._company, listWhenreload[i]._phoneNumber, listWhenreload[i]._message);
            listOfCustomer.push(customer);
        }
    }
}
function emailValidation(mail) {
    var regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    if (regexpEmail.test(mail)) {
        return true;
    }
    else {
        alert("Please, Entar a valid Email!");
        document.getElementById("emailCustomer").value = "";
        return false;
    }
}
function mobileNumber(mobile) {
    var IndNum = /[+]+[0-9]{12}/;
    if (IndNum.test(mobile)) {
        return true;
    }
    else {
        alert("Please, Entar a valid Phone number!");
        document.getElementById("phoneNumber").value = "";
        return false;
    }
}
function sendMessage(id) {
    var msg = document.getElementById(id).children[2].children[0].value;
    for (var i = 0; i < listOfCustomer.length; i++) {
        if (listOfCustomer[i].phoneNumber == id) {
            listOfCustomer[i].message = msg;
            storeCustomerList(listOfCustomer);
            document.getElementById(id).children[2].children[0].value = "";
        }
    }
}
function getMessages() {
    var myMsg = document.getElementById("allMessages");
    while (myMsg.firstChild) {
        myMsg.removeChild(myMsg.firstChild);
    }
    var getsms = JSON.parse(localStorage.getItem("listOfCustomer"));
    var phoneNo = document.getElementById("phoneNo").value;
    for (var i = 0; i < getsms.length; i++) {
        if (getsms[i]._phoneNumber == phoneNo) {
            for (var j = 0; j < getsms[i]._message.length; j++) {
                createMessagesList(getsms[i]._message[j]);
            }
        }
    }
}
function createMessagesList(mess) {
    var allMessages = document.getElementById("allMessages");
    var messageShow = document.createElement("div");
    var val = mess;
    messageShow.innerHTML = val;
    allMessages.appendChild(messageShow);
}
function checkPhone(phone) {
    for (var i = 0; i < listOfCustomer.length; i++) {
        if (listOfCustomer[i]._phoneNumber == phone) {
            alert("This number exists. Please, Enter another number!");
            document.getElementById("phoneNumber").value = "";
            return false;
        }
    }
    return true;
}
