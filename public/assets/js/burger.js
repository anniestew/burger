$(document).ready(function() {

    event.preventDefault();
    console.log("load javascript")

    $(".create-burger").on("submit", function(event) {
        console.log("submit addburger")
        var burgerName = {
            name: $("#addburger").val().trim()
        }
       
        console.log("burger name: ",  burgerName)
    
        // Send the PUT request.
        $.ajax("/burgers",  {
          type: "POST",
          data: burgerName,
          function() {
            //console.log("changed sleep to", newSleep);
            // Reload the page to get the updated list
            location.reload();
          }
        });



    })

    $(".devour").on("click", function(event) {
        console.log("click devour")
        var id= $(this).data("id")
    
    
        // Send the PUT request.
        $.ajax("api/burgers/" + id,  {
          type: "PUT",
          data: true,
          function() {
            //console.log("changed sleep to", newSleep);
            // Reload the page to get the updated list
            location.reload();
          }
        });



    })
})
  
  