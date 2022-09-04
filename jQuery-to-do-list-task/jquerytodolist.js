var listOfTask =[];
var counter = 0;
var counterPlus=0;

$(document).ready(function(){
    function getObject() {
        var randomID = Date.now();
        var taskTitle = $('#doLundry').val();
        var status = false;

        var tObj = {
            id: randomID,
            title: taskTitle,
            completed: status,
        };
        return tObj;
    }

    function createTask(tObj) {
        htmlDiv=$("<div class='new-div' id='"+tObj.id+"' ondblclick='updateVal(this.id)'>")
        sec = $("<div class='sec-div'>")
        $(sec).append($("<div><input type='checkbox' class='checkBox' id='"+tObj.id+"' onclick='readed(this.id)'/>"));
        $(sec).append($("<div'<p class='font' id='text'>"+tObj.title+"</p>'"));
        $(htmlDiv).append(sec);
        $(htmlDiv).append($("<div'<i class='fa fa-trash' id='"+tObj.id+"' aria-hidden='true' onclick='deleteTask(this.id)'>'"));
        $("#allList").append(htmlDiv);

        if (tObj.completed == true) {
            $("#"+tObj.id+" .checkBox").attr('checked',true);
            $("#"+tObj.id).toggleClass("completed");
            $("#"+tObj.id+" #text").toggleClass("done");
        }
    }

    $('#addToDo').click(function(){
        var newTask = getObject();
        if( newTask.title != '') {
            listOfTask.push(newTask);
            storeTaskList(listOfTask);
            createTask(newTask);
        } else {
            alert('Please enter To Do!');
            $('#doLundry').focus();
        }
        if (listOfTask.length != 0) {
            $(".deleteAll").show();
        }
        $('#doLundry').val("");
    });

    var input = $("#doLundry");
    input.on("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#addToDo").click();
        }
    });

    window.onload = function() {
        var listWhenreload = JSON.parse(localStorage.getItem("listOfTask"));
        if (listWhenreload != null) {
            var len = listWhenreload.length;
            for (i = 0; i < len; i++) {
                var tskObj = {
                    id : listWhenreload[i].id,
                    title : listWhenreload[i].title,
                    completed : listWhenreload[i].completed
                };
            listOfTask.push(tskObj);
            $(".deleteAll").show();
            createTask(listWhenreload[i]);
            }
        }
    }

    $(".deleteAll").on("click", function(){
        $('#allList').empty();
        var taskRemoved = JSON.parse(localStorage.getItem("listOfTask"));
            if (taskRemoved != null) {
                var len = taskRemoved.length;
                for (i=0; i < len; i++) {
                        listOfTask.pop();
                        storeTaskList(listOfTask);
                }
            }
            $(this).hide();
      });

    $(function () {
        $("div#allList").sortable();
    });

    $(".getAjax").click(function(){
        $.ajax({
            type: "GET",
            url: "https://jsonplaceholder.typicode.com/todos",
            dataType: "json",
            success: function(data) {
                if(counter==data.length)return;
                for (i = counter; i<5+counterPlus; i++){
                    listOfTask.push(data[i]);
                    storeTaskList(listOfTask);
                    createTask(data[i]);
                    counter++;
                }
                counterPlus+=5;
            }
        });
        $(".deleteAll").show();
    });
});

function storeTaskList(liststor) {
    var listOfTsk = JSON.stringify(liststor);
    localStorage.setItem("listOfTask", listOfTsk);
}

function readed(event) {
    var listCompleted= JSON.parse(localStorage.getItem("listOfTask"));
    for (i=0; i <listCompleted.length; i++) {
        if (listCompleted[i].id == event) {
            if (listCompleted[i].completed == false) {
                listCompleted[i].completed = true;
                $("#"+event).toggleClass("completed");
                $("#"+event +" #text").toggleClass("done");
                storeTaskList(listCompleted);
            } else {
                listCompleted[i].completed = false;
                $("#"+event).removeClass("completed");
                $("#"+event +" #text").removeClass("done");
                storeTaskList(listCompleted);
            }
        }
    }
}

function deleteTask(event) {
    var taskRemoved = JSON.parse(localStorage.getItem("listOfTask"));
    if (taskRemoved != null) {
        var len = taskRemoved.length;
        for (i=0; i < len; i++) {
            if (taskRemoved[i].id == event) {
                $("#"+event).remove();
                listOfTask.splice(i, 1);
                storeTaskList(listOfTask);
                if (listOfTask.length == 0) {
                    $(".deleteAll").hide();
                }
            }
        }
    }
}


function updateVal(event) {
    var editTask = JSON.parse(localStorage.getItem("listOfTask"));
    if (editTask != null) {
        var len = editTask.length;
        for (i=0; i < len; i++) {
            if (editTask[i].id == event) {
                var dilogToEditTask = prompt("Please enter new To Do Title", "New Task Title");
                if (dilogToEditTask != null) {
                  $("#"+event+ " #text").html(dilogToEditTask);
                  listOfTask[i].title =dilogToEditTask;
                  storeTaskList(listOfTask);
                }
            }
        }
    }
}