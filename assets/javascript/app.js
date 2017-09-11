
// Initial array of celebrities
var celebrities = ["Adam Sandler", "Mark Wahlberg", "Bruce Springsteen", "Ellen DeGeneres", "Chris Rock", "Sofia Vergara", "Kenny Chesney", "Amy Schumer", "Leonardo DiCaprio", "Britney Spears", "Jennifer Lopez", "Tiger Woods", "Brad Pitt", "George Clooney", "Frank Sinatra", "Angelina Jolie", "Will Smith"];


	// Create an AJAX request to obtain celebrity GIF for a specific celebrity button
	function displayCelebrityGif() { 
	// Get the data attribute for the specific celebrity button that the user requests
	var requestedCelebrity = $(this).attr("data-name");
	// queryURL for Giphy API (limit requested GIFs to 10)
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + requestedCelebrity + "&api_key=dc6zaTOxFJmzC&limit=10";
	// AJAX request to obtain celebrity GIF
		$.ajax ({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log("full response: ", response);

			// Create a div to append each GIF to
			var gifs = $("<div>").addClass("gifDiv");

			// Get the info for 10 GIFs by looping through the response.data array
			for (var i = 0; i < response.data.length; i++) {


				// Get the rating of the GIF
				var gifRatingValue = response.data[i].rating;
				// Create an element to hold the requested GIF rating
				var gifRating = $("<p>").html("Rating: " + gifRatingValue);
				gifRating.addClass("celebrity-gif");
				// Append the GIF rating to the gif
				gifs.append(gifRating);


				// Get the still image url of the requested GIF
				var gifStillURL = response.data[i].images.downsized_still.url;
				// Create an element to hold the requested GIF image and add the URL attribute to it
				var gifStill = $("<img>").attr("src", gifStillURL);
				gifStill.addClass("gifStill");
				// Append the still image to the gifRating div
				gifRating.append(gifStill);
			}


			$(document).on("click", ".celebrity-gif", function() { 
				// Get the index of the clickedGif
				var clickedGif = $(this).index();
				console.log(clickedGif);
				console.log($(this));

					// Get the URL of the moving GIF basd on the clickedGif index
					var gifMovingURL = response.data[clickedGif].images.downsized.url;
					// Create an element to hold the requested GIF image and add the URL attribute to the gifImage
					var gifMoving = $("<img>").attr("src", gifMovingURL);
					gifMoving.addClass("gifMoving")
	
					$(this).html(gifMoving);
			});

			// Append to the screen
			$("#gifs-view").html(gifs);

		});
	} // End displayCelebrityGif function

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


// Render AJAX request when celebrity button is clicked
$(document).on("click", ".celebrity-button", displayCelebrityGif);


// Display the original array of buttons
renderButtons();



