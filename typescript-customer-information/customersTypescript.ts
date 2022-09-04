var listOfCustomer: any = [] ;

class Customer {

    private _fullName: string;
    private _email: string;
    private _company: string;
    private _phoneNumber: string;
    private _message: string[] ;

    constructor(name: string, email: string, company: string, phoneNumber: string, message:string[]=[]) {
        this. _fullName = name;
        this._email = email;
        this._company = company;
        this._phoneNumber = phoneNumber;
        this._message = message;
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        this._fullName = newName;
    }

    get email(): string {
        return this._email;
    }

    set email(newEmail: string) {
        this._email = newEmail;
    }

    get company(): string {
        return this._company;
    }

    set company(newCompany: string) {
        this._company= newCompany;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(newPhoneNumber: string) {
        this._phoneNumber = newPhoneNumber;
    }

    get messages() {
        return this._message;
    }

    set message(newMessage: string) {
        this._message.push(newMessage);
    }
}

function getCustomerInfo() {
    var name = (<HTMLInputElement>document.getElementById("fullName")).value;
    var email = (<HTMLInputElement>document.getElementById("emailCustomer")).value;
    var company = (<HTMLInputElement>document.getElementById("companyCustomer")).value;
    var phoneNumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;

    if (name == "") {
        alert("please, Enter customer name!");
        return;
    }

    var checkMail: boolean = emailValidation(email);
    if (checkMail == true) {
        if (company =="") {
            alert("please, Enter company name!");
            return;
        }
        var checkNumber:boolean = mobileNumber(phoneNumber);
        if (checkNumber == true) {
            var finalNumber = "0"+phoneNumber.substring(4,13);
            phoneNumber = finalNumber;

            var check:boolean = checkPhone(phoneNumber);
            if (check == true) {

                var customer = new Customer(name, email, company, phoneNumber);

                listOfCustomer.push(customer);
                storeCustomerList(listOfCustomer);

                (<HTMLInputElement>document.getElementById("fullName")).value = "";
                (<HTMLInputElement>document.getElementById("emailCustomer")).value = "";
                (<HTMLInputElement>document.getElementById("companyCustomer")).value = "";
                (<HTMLInputElement>document.getElementById("phoneNumber")).value = "";
            }
        }
    }
}

function storeCustomerList(emp) {
    var listOfCustomers = JSON.stringify(emp);
    localStorage.setItem("listOfCustomer", listOfCustomers);
}

function createDiv(div: Customer) {
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
    customerEmail.innerHTML ='<i class="fa fa-envelope" aria-hidden="true"></i> ' + div.email;

    var customerPhone = document.createElement("p");
    customerPhone.innerHTML ='<i class="fa fa-mobile fa-2x" aria-hidden="true"></i> ' + div.phoneNumber;

    emailPhone.appendChild(customerEmail);
    emailPhone.appendChild(customerPhone);

    var message = document.createElement("div");
    message.id = "message";


    var textArea = document.createElement("textarea");
    textArea.id = "textArea"
    textArea.classList.add("text-area");
    textArea.placeholder = "Type a message...";

    var sendBtn = document.createElement("button");
    sendBtn.innerHTML = "Send Message!";
    sendBtn.id = "btn";

    sendBtn.addEventListener('click', function(){
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
        for (let i = 0; i < len; i++) {
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
        for (let i = 0; i < len; i++) {
            var customer = new Customer(listWhenreload[i]._fullName, listWhenreload[i]._email, listWhenreload[i]._company, listWhenreload[i]._phoneNumber, listWhenreload[i]._message);
        listOfCustomer.push(customer);
        }
    }
}

function reloadCustomersMessages() {
    var listWhenreload = JSON.parse(localStorage.getItem("listOfCustomer"));
    if (listWhenreload != null) {
        var len = listWhenreload.length;
        for (let i = 0; i < len; i++) {
            var customer = new Customer(listWhenreload[i]._fullName, listWhenreload[i]._email, listWhenreload[i]._company, listWhenreload[i]._phoneNumber, listWhenreload[i]._message);
        listOfCustomer.push(customer);
        }
    }
}

function emailValidation(mail){
    let regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    if (regexpEmail.test(mail)){
        return true;
    }
    else {
       alert("Please, Entar a valid Email!");
       (<HTMLInputElement>document.getElementById("emailCustomer")).value = "";
       return false;
    }
}

function mobileNumber (mobile){
    var IndNum = /[+]+[0-9]{12}/;
    if (IndNum.test(mobile)){
        return true;
    }
   else {
    alert("Please, Entar a valid Phone number!");
    (<HTMLInputElement>document.getElementById("phoneNumber")).value = "";
      return false;
   }
}

function sendMessage(id) {
    var msg = (<HTMLInputElement>document.getElementById(id).children[2].children[0]).value;
    for (var i = 0; i < listOfCustomer.length; i++) {
        if (listOfCustomer[i].phoneNumber == id) {
            listOfCustomer[i].message = msg;
            storeCustomerList(listOfCustomer);
            (<HTMLInputElement>document.getElementById(id).children[2].children[0]).value = "";
        }
    }
}

function getMessages() {
    var myMsg = document.getElementById("allMessages");
    while (myMsg.firstChild) {
        myMsg.removeChild(myMsg.firstChild);
    }

    var getsms = JSON.parse(localStorage.getItem("listOfCustomer"));
    var phoneNo = (<HTMLInputElement>document.getElementById("phoneNo")).value;

        for (var i = 0; i < getsms.length; i++) {
            if (getsms[i]._phoneNumber == phoneNo){
                for (var j = 0; j < getsms[i]._message.length ; j++){
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
            (<HTMLInputElement>document.getElementById("phoneNumber")).value = "";
            return false;
        }
    }
        return true;
}