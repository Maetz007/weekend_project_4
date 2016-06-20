$(document).ready(function(){

var numUnfinishedTasks = 0;
var numTasks = 0;

//-------------------------------------------------------------------------------------------------------------------

$(window).load(function() {
  tasksDisplay();
}); // end window load

//-------------------------------------------------------------------------------------------------------------------

$("#addTaskBtn").on("click", function(){
  var newTask = $("#taskInput").val();
  var empty = "";
    if (newTask == empty){
      alert("Task input can not be left empty!");
  } else if (numTasks > 11){
      alert("Task power is over 9000!!\n Please delete some tasks before adding new ones.");
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
  var confirmName = $(this).attr("data-taskname");
  if (confirm("Press OK to DELETE '" + confirmName + "' TASK") === true){
  var deleteTaskId = $(this).attr("data-id");
  var delTask = {
    "id": deleteTaskId
    }; // close object
    $.ajax({
      type: "POST",
      url: "/deleteTask",
      data: delTask,
      success: function(){
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
        numTasks = data.length;
        for (var i = 0; i < data.length; i++) {
          if (data[i].complete === false){

            var displayUnfinished = document.createElement("div");
            displayUnfinished.id = data[i];
            displayUnfinished.className = "displayUnfinishedDiv";
            var taskUnfinished = data[i].taskname;
            displayUnfinished.textContent = taskUnfinished;
            $("#taskField").append(displayUnfinished);
            var deleteBtnUnfinished = "<button class='deleteBtn' data-id='" + data[i].id + "'data-taskname='" + data[i].taskname + "'>Delete Task" + "</button>";
            $("#taskField").append(deleteBtnUnfinished);
            var unfinishedBtn = "<button class='unfinishedBtn' id='toggleBtn' data-id='" + data[i].id + "'data-complete='" + data[i].complete + "'>Task Complete" + "</button>";
            $("#taskField").append(unfinishedBtn);
            numUnfinishedTasks++;

          } else {

            var displayComplete = document.createElement("div");
            displayComplete.id = data[i];
            displayComplete.className = "displayCompleteDiv";
            var taskComplete = data[i].taskname;
            displayComplete.textContent = taskComplete;
            $("#taskField").append(displayComplete);
            var deleteBtnComplete = "<button class='deleteBtn' data-id='" + data[i].id + "'data-taskname='" + data[i].taskname + "'>Delete Task" + "</button>";
            $("#taskField").append(deleteBtnComplete);
            var completeBtn = "<button class='completeBtn' id='toggleBtn' data-id='" + data[i].id + "'data-complete='" + data[i].complete + "'>Repeat Task?" + "</button>";
            $("#taskField").append(completeBtn);
          } // end else
        } // end for loop
        if (data.length === 0) {
          var displayTemp = document.createElement("div");
          displayTemp.id = "displayTemp";
          var taskNull = "Nothing to do? Add a task!";
          displayTemp.textContent = taskNull;
          $("#taskField").append(displayTemp);
        } // end if
        backgroundPic(numUnfinishedTasks);
      } // end success
    }); // end ajax
} // end taskDisplay

//-------------------------------------------------------------------------------------------------------------------

function backgroundPic (num){
  var bgImage = "background-image";
    if(num >= 0 && num <= 3){
      $('#backGroundImage').css(bgImage, "url(pictures/stressed_1.jpg)");
    } else if (num >= 4 && num <= 6) {
      $('#backGroundImage').css(bgImage, "url(pictures/stressed_2.jpg)");
    } else if (num >= 7 && num <= 9) {
      $('#backGroundImage').css(bgImage, "url(pictures/stressed_3.jpg)");
    } else {
      $('#backGroundImage').css(bgImage, "url(pictures/stressed_4.jpg)");
    } // end else
    numUnfinishedTasks = 0;
} // end background pic func

//-------------------------------------------------------------------------------------------------------------------

}); // end document ready
