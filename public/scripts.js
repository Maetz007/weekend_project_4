$(document).ready(function(){

  $("btn").on("click", function(){
  // call some function from server
  }); // end btn

  function getSomething(){
    $.ajax({
      type: "GET",
      data: data,
      url: "/somethingGot"
    });
  }
});// end document ready
