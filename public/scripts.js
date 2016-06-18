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

$("#taskField").on("click", ".deleteBtn", function(){
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

$("#taskField").on("click", "#toggleBtn", function(){
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
  document.getElementById("taskField").innerHTML = "";
  $("#taskInput").attr("placeholder", "Input Task...").val("");
    $.ajax({
      type: "GET",
      url: "/getAllTasks",
      success: function(data){
        for (var i = 0; i < data.length; i++) {
          var displayTasks = document.createElement("div");
          displayTasks.id = data[i];
          displayTasks.className = "displayTaskDiv";
          var task = "Task: " + data[i].taskname;
          displayTasks.textContent = task;
          $("#taskField").append(displayTasks);
          var deleteBtn = "<button class='deleteBtn' data-id='" + data[i].id + "'>Delete Task" + "</button>";
          $("#taskField").append(deleteBtn);
          if (data[i].complete === false){
            var completeBtn = "<button class='unfinishedBtn' id='toggleBtn' data-id='" + data[i].id + "'data-complete='" +
            data[i].complete + "'>Task Unfinished" + "</button>";
              $("#taskField").append(completeBtn);
          } else {
            var unfinishedBtn = "<button class='completeBtn' id='toggleBtn' data-id='" + data[i].id + "'data-complete='" +
            data[i].complete + "'>Completed!" + "</button>";
              $("#taskField").append(unfinishedBtn);
          } // end else
        } // end for loop
      } // end success
    }); // end ajax
} // end taskDisplay

//-------------------------------------------------------------------------------------------------------------------

}); // end document ready
