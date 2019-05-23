$(document).ready(function () {

  event.preventDefault();
  console.log("load javascript")

  $(".create-burger").on("submit", function (event) {
    event.preventDefault();
    console.log("submit addburger")
    var burgerName = {
      name: $("#addburger").val().trim()
    }

    console.log("burger name: ", burgerName)

    // Send the PUT request.
    $.ajax("/burgers", {
      type: "POST",
      data: burgerName, 
    }).then(function (data) {
        console.log("changed to devoured");
        // Reload the page to get the updated list
        location.reload();
      });


  })

  $(".devour").on("click", function (event) {
    event.preventDefault();

    console.log("click devour")
    var id = $(this).data("id")


    // Send the PUT request.
    $.ajax("/burgers/" + id, {
      type: "PUT",
      data: true
    }).then(function (data) {
        console.log("changed to devoured");
        // Reload the page to get the updated list
        location.reload();
      }
    );

  })
})
  
  