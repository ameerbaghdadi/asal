var list = [];
function getIssue() {
    var describeIssue = document.getElementById("describeIssue").value;
    var severity = document.getElementById("selectSeverity").value;
    var assignedTo = document.getElementById("assignedTo").value;
    var issueID = randomID(3);
    var date = dateNow();
    var number = Date.now();
    var key = 0;

    var issueObject = {
        describeIssue: describeIssue,
        severity: severity,
        assignedTo: assignedTo,
        issueID: issueID,
        date: date,
        number: number,
        key: key
    };
    return issueObject;
}

function addInfo() {
    var issue = getIssue();
    var describeIssue = document.getElementById("describeIssue").value;
    var assignedTo = document.getElementById("assignedTo").value;
    if (describeIssue === "") {
        alert("Can't add new issue, Please fill the Description field!");
    } else {
        if (assignedTo === "") {
            alert("Can't add new issue, Please fill the Assigned To field!");
        } else {
            displaySortbutton();
            list.push(issue);
            createIssue(issue);
            storeIssuesList(list);
            document.getElementById("describeIssue").value = "";
            document.getElementById("assignedTo").value = "";
        }
    }
}

function createIssue(issue) {
    var mainDiv = document.getElementById("issues");
    var newDiv = document.createElement("div");
    newDiv.id = issue.issueID;
    newDiv.classList.add("issue");

    var issueIdDateTime = document.createElement("div");
    issueIdDateTime.id = "issueIdDateTime";
    var idRandom = document.createElement("div");
    var idText = document.createTextNode("Isssue ID:" + " " + issue.issueID);
    idRandom.id = "random";
    idRandom.classList.add("font-style");
    idRandom.appendChild(idText);
    issueIdDateTime.appendChild(idRandom);

    var date = document.createElement("div");
    var dateValue = document.createTextNode("Date:" + " " + issue.date);
    date.classList.add("font-style");
    date.appendChild(dateValue);
    issueIdDateTime.appendChild(date);

    var status = document.createElement("label");
    status.innerHTML = "Open";
    if (issue.key == 1)
        status.innerHTML = "Closed";
    status.id = issue.number;
    status.classList.add("status");

    var describeShow = document.createElement("div");
    describeShow.id = "describeShow";
    var name = issue.describeIssue;
    describeShow.innerHTML = name;

    var severityShow = document.createElement("div");
    severityShow.id = "severityShow";
    var severitylevel = document.createElement("p");
    var degree = issue.severity;
    if (degree == 0) {
        severitylevel.innerHTML = "Low";
    }
    if (degree == 1) {
        severitylevel.innerHTML = "Medium";
    }
    if (degree == 2) {
        severitylevel.innerHTML = "High";
    }
    var severityIcon = document.createElement("i");
    severityIcon.id = "severityIcon";
    severityIcon.innerHTML = '<i class="fa fa-clock-o" aria-hidden="true" ></i>';
    severityShow.classList.add("severity-assignedto-show");
    severityShow.appendChild(severityIcon);
    severityShow.appendChild(severitylevel);

    var assignedtoShow = document.createElement("div");
    assignedtoShow.id = "assignedtoShow";
    var assignedtoName = document.createElement("p");
    var name = issue.assignedTo;
    assignedtoName.innerHTML = name;

    var assignedtoIcon = document.createElement("i");
    assignedtoIcon.id = "assignedtoIcon";
    assignedtoShow.classList.add("severity-assignedto-show")
    assignedtoIcon.innerHTML = '<i class="fa fa-user" aria-hidden="true"></i>';
    assignedtoShow.appendChild(assignedtoIcon);
    assignedtoShow.appendChild(assignedtoName);

    var closeDelete = document.createElement("div");
    closeDelete.id = "closeDelete";
    var closeBtn = document.createElement("button");
    closeBtn.innerHTML = "Close";
    closeBtn.id = "close";
    closeBtn.onclick = function () {
        closeIssue(issue.number);
    };
    closeDelete.appendChild(closeBtn);

    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.id = "delete";
    deleteBtn.onclick = function () {
           var deleteConfirm = confirm("Are you sure to delete issue?");
           if (deleteConfirm == true) {
                removeIssue(issue.issueID);
                deleteIssue(newDiv.id);
                    if (list.length == 0) {
                     document.getElementById("sort").style.display = "none";
                    }
           }
    };
    closeDelete.appendChild(deleteBtn);

    newDiv.appendChild(issueIdDateTime);
    newDiv.appendChild(status);
    newDiv.appendChild(describeShow);
    newDiv.appendChild(severityShow);
    newDiv.appendChild(assignedtoShow);
    newDiv.appendChild(closeDelete);
    mainDiv.appendChild(newDiv);
}

function randomID(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }
    var str = ' ';
    for (var i = 0; i < length; i++) {

        for (var j = 0; j < length; j++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        str += chars[Math.floor(Math.random() * chars.length)] + "-" + chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function dateNow() {
    var d = new Date();
    var n = d.toLocaleString();
    return n;
}

function deleteIssue(ID) {
    var element = document.getElementById(ID);
    element.parentNode.removeChild(element);
}

function storeIssuesList(liststor) {
    var listOfIssues = JSON.stringify(liststor);
    localStorage.setItem("list", listOfIssues);
}

window.onload = function() {
    
    if (list.length == 0) {
        document.getElementById("sort").style.display = "none";
    }
    var listWhenreload = JSON.parse(localStorage.getItem("list"));
    if (listWhenreload != null) {
        var len = listWhenreload.length;
        for (i = 0; i < len; i++) {
            displaySortbutton();
            var issueOnload = {
                describeIssue: listWhenreload[i].describeIssue,
                severity: listWhenreload[i].severity,
                assignedTo: listWhenreload[i].assignedTo,
                issueID: listWhenreload[i].issueID,
                date: listWhenreload[i].date,
                number: listWhenreload[i].number,
                key: listWhenreload[i].key
            };
        list.push(issueOnload);
        createIssue(listWhenreload[i]);
        }
    }
}


function removeIssue(remIssue) {
    for (var i = 0; i < list.length; i++) {
            if (list[i].issueID == remIssue) {
                list.splice(i, 1);
                storeIssuesList(list);
            }
    }
}


function closeIssue(num) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].number === num) {
           var statusWord =  document.getElementById(num).innerHTML = "Closed";
           statusWord.id = "closed";
           list[i].key = 1;
           storeIssuesList(list);
        }
    }
}

function sortIssue() {
    var myIssue = document.getElementById("issues");
    while (myIssue.firstChild) {
        myIssue.removeChild(myIssue.firstChild);
    }
    for (i = 0; i < list.length; i++) {
        for (j = 0; j < list.length; j++) {
            if (list[i].severity < list[j].severity) {
                var temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    }
    for (k = 0; k < list.length; k++) {
        createIssue(list[k]);   
    }
    storeIssuesList(list);
}

function backgroundColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return document.body.style.backgroundColor = color;
}

function displaySortbutton() {
    var dis = document.getElementById("sort");
    dis.style.display = "block";
}