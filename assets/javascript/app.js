
// Initial array of celebrities
var celebrities = ["Ellen DeGeneres", "Adam Sandler", "Mark Wahlberg", "Bruce Springsteen", "Chris Rock", "Sofia Vergara", "Kenny Chesney", "Amy Schumer", "Leonardo DiCaprio", "Britney Spears", "Jennifer Lopez", "Tiger Woods", "Brad Pitt", "George Clooney", "Frank Sinatra", "Will Smith"];


// When any button is clicked
$(document).on("click", ".celebrity-button", function() {
	$("#gifs-view").empty();
	// Get the data attribute value of the button clicked
	var celebrity = $(this).attr("data-name");

	// Add the celebrity's name to the queryURL
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebrity + "&api_key=dc6zaTOxFJmzC&limit=10";

	// Create an AJAX request to request the gifs and gif ratings of that celebrity
	$.ajax( {
		url: queryURL,
		method: "GET"
	})
	.done(function(response) {

		var gifs = response.data;

		// Loop through the 10 gifs that were requested
		for (var i = 0; i < gifs.length; i++) {
			var gifDiv = $("<div class='celebrityGif'>");
			// Get the rating and store it in a variable
			var rating = gifs[i].rating;
			// Create a p element to write the rating to html
			var p = $("<p>").text("Rating: " + rating);
			// Create an img div to store the img 
			var gifImage = $("<img>").addClass("gifImage");
			// Add the src to the image
			gifImage.attr("src", gifs[i].images.downsized_still.url);
			// Add an attribute to state that the image is still
			gifImage.attr("data-state", "still");
			// Add the src for data-still
			gifImage.attr("data-still", gifs[i].images.downsized_still.url);
			// Add the src for data-animate
			gifImage.attr("data-animate", gifs[i].images.downsized.url);

			// Append the rating and the gif to the gif div
			gifDiv.prepend(p);
			gifDiv.append(gifImage);

			// Append the gif div to the page
			$("#gifs-view").prepend(gifDiv);
		}
	});
});

// Change the data-state and img src when data-state is set to still and animate
$(document).on("click", ".gifImage", function() {
	var state = $(this).attr("data-state");
	console.log(state);

	if(state === "still") {
		$(this).attr("data-state", "animate");
		$(this).attr("src", $(this).attr("data-animate"));
	}
	else {
    $(this).attr("data-state", "still"); 
    $(this).attr("src", $(this).attr("data-still"));
	}
});


	// Function to create buttons
	function renderButtons() {
		// Empty the buttons-view div to avoid adding duplicate buttons
		$("#buttons-view").empty();

		// Loop through the buttons in the array
		for (var i = 0; i < celebrities.length; i++) {
			// Create a button
			var celebrityButton = $("<button>");
			// Add a class to the button
			celebrityButton.addClass("celebrity-button");
			// Give the button a value
			celebrityButton.attr("data-name", celebrities[i]);
			// Display text on the button
			celebrityButton.text(celebrities[i]);
			// Append the button to the screen in the buttons-view div
			$("#buttons-view").append(celebrityButton);
		}

	} // End renderButton function

	$("#add-celebrity").on("click", function(event) {
    event.preventDefault(); // Prevents the browser from refreshing when submit button is clicked
		// Obtain value of text input field
		var newCelebrity = $("#celebrity-input").val();

		// If the text input isn't blank, add the input to the array and render buttons
		if(newCelebrity !== "") { 
		// Push that new value into the celebrities array
		celebrities.push(newCelebrity);
		// Loop through the array of celebrities to create buttons with the new celebrity added
		renderButtons();
		// Empty the text of the input after buttons are rendered
		$("#celebrity-input").val("");
		}

	});


// Display the original array of buttons
renderButtons();



