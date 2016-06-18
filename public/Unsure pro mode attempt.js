$(document).ready(function(){

$(window).load(function() {
    tasksDisplay();
}); // end window load

//-------------------------------------------------------------------------------------------------------------------

$("#addTaskBtn").on("click", function(){
  var newTask = $("#taskInput").val();
  var empty = "";
    if (newTask == empty){
      alert("Task input can not be left empty!");
  } else {
    var taskObject = {
      "taskObj": newTask,
      "completeObj": false
  }; // end task object
    $.ajax({
      type: "POST",
      url: "/addTaskDatabase",
      data: taskObject,
      success: function(){
        tasksDisplay();
      } // end success
    }); // end ajax
  } // end else
}); // end add task button

//-------------------------------------------------------------------------------------------------------------------

$("#taskFieldUnfinished" || "#taskFieldComplete").on("click", ".delete", function(){
console.log("delete button clicked");
  if (confirm("Press OK to continue with DELETE TASK") === true){
  var deleteTaskId = $(this).attr("data-id");
  var delTask = {
    "id": deleteTaskId
    }; // close object
    $.ajax({
      type: "POST",
      url: "/deleteTask",
      data: delTask,
      success: function(){
        $(this).remove();
        tasksDisplay();
      } // end success
    }); // end ajax
  } // end if
}); // end delete button

//-------------------------------------------------------------------------------------------------------------------

$("#taskFieldUnfinished" || "#taskFieldComplete").on("click", "#toggleBtn", function(){
  var comCheck = $(this).attr("data-complete");
  var comId = $(this).attr("data-id");
  var comBoolean;
  if (comCheck == "true"){
    comBoolean = false;
  } else {
    comBoolean = true;
  } // end else ifs
    var comTaskObj = {
      "objCompleteId": comId,
      "objCompleteBool": comBoolean
      }; // close object
  $.ajax({
    type: "POST",
    url: "/completeTask",
    data: comTaskObj,
    success: function(){
      $(this).remove();
      tasksDisplay();
    } // end success
  }); // end ajax
}); // end complete button

//-------------------------------------------------------------------------------------------------------------------

function tasksDisplay(){
  document.getElementById("taskFieldComplete").innerHTML = "";
  document.getElementById("taskFieldUnfinished").innerHTML = "";
  $("#taskInput").attr("placeholder", "Input Task...").val("");
    $.ajax({
      type: "GET",
      url: "/getAllTasks",
      success: function(data){
        for (var i = 0; i < data.length; i++) {
          if(data[i].complete == "true") {
            var displayTasksCompleted = document.createElement("div");
            displayTasksCompleted.id = data[i];
            displayTasksCompleted.className = "displayCompleteDiv";
            var taskComplete = "Task completed: " + data[i].taskname;
            displayTasksCompleted.textContent = taskComplete;
            $("#taskFieldComplete").append(displayTasksCompleted);
            var deleteCompleteBtn = "<button class='deleteBtn' data-id='" + data[i].id + "'>Delete Task" + "</button>";
            $("#taskFieldComplete").append(deleteCompleteBtn);
            var completeBtn = "<button class='completeBtn' id='toggleBtn' data-id=' "+ data[i].id +" 'data-complete=' "+ data[i].complete +" '>Completed!" + "</button>";
            $("#taskFieldComplete").append(completeBtn);
          } else {
            var displayTasksUnfinished = document.createElement("div");
            displayTasksUnfinished.id = data[i];
            displayTasksUnfinished.className = "displayUnfinishedDiv";
            var taskUnfinished = "Task needed to be done: " + data[i].taskname;
            displayTasksUnfinished.textContent = taskUnfinished;
            $("#taskFieldUnfinished").append(displayTasksUnfinished);
            var deleteunfinishedBtn = "<button class='deleteBtn' data-id='" + data[i].id + "'>Delete Task" + "</button>";
            $("#taskFieldUnfinished").append(deleteunfinishedBtn);
            var UnfinishedBtn = "<button class='unfinishedBtn' id='toggleBtn' data-id=' "+ data[i].id +" 'data-complete=' "+ data[i].complete +" '>Task Unfinished" + "</button>";
            $("#taskFieldUnfinished").append(UnfinishedBtn);
          } // end else
        } // end for loop
      } // end success
    }); // end ajax
} // end taskDisplay

//-------------------------------------------------------------------------------------------------------------------

}); // end document ready
