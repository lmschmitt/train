  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxkWCJ3IEWVfuaOn5WyKVxdPA1WTfB2vs",
    authDomain: "schmitt-1.firebaseapp.com",
    databaseURL: "https://schmitt-1.firebaseio.com",
    projectId: "schmitt-1",
    storageBucket: "schmitt-1.appspot.com",
    messagingSenderId: "991019635248"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

 
  //Time of the day
  var updateTime = function(){
  	var now = moment().format('hh:mm');
  	$('#currentTime').html(now);
  }
  // Update time every minute
  $(document).ready(function(){
    updateTime();
    setInterval(updateTime, 60000);
});

  /*******************************************/

$('#submit').on('click', function(){

	// Retrieve user inputs from form
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	var frequency = $('#frequency').val().trim();

	// Create an object for new train to be added
	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	
	database.ref().push(newTrain);

	$('#trainName').val('');
	$('#destination').val('');
	$('#firstTrain').val('');
	$('#frequency').val('');



	return false;

});


database.ref().on('child_added', function(childSnapshot, prevChildKey) {

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;


	$('.table > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
		+ frequency + "</td><td>" + "Delayed" + "</td><td>" + "Unknown" + "</td></tr>");

});


