// The code in add.js handles what happens when the user clicks the "submit" button.

// When user clicks submit
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Make a newBook object
  var submit = {
    item_name: $("#item_name").val().trim(),
    category: $("#category").val(),
    description: $("#description").val().trim(),
    fee: $("#fee").val().trim(),
    email: $("#email").val().trim()
  };

  // Send an AJAX POST-request with jQuery
  $.post("/userview", submit)
    // On success, run the following code
    .done(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#item_name").val("");
  $("#category").val("");
  $("#description").val("");
  $("#fee").val("");
  $("#email").val("");
});
