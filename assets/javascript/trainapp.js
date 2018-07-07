/* global moment firebase */
// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
  apiKey: "AIzaSyBE0qZeK97Za61nbgLYcZfxsU9giknYdqs",
  authDomain: "train-schedule-hw-fd4c5.firebaseapp.com",
  databaseURL: "https://train-schedule-hw-fd4c5.firebaseio.com",
  projectId: "train-schedule-hw-fd4c5",
  storageBucket: "train-schedule-hw-fd4c5.appspot.com",
  messagingSenderId: "229170455730"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Capture submit button click.
$("#add-train").on("click", function(event) {
  event.preventDefault();
  // var for the form inputs.
  var trainName = $("#trainName-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrainTime = $("#firstTrainTime-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  var createRow = function() {
    // Get reference to existing tbody element, create a new table row element
    var tBody = $("tbody");
    var tRow = $("<tr>");
  
    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    $("<td>").text(trainName);
    $("<td>").text(destination);
    $("<td>").text(firstTrainTime);
    $("<td>").text(frequency);
    // Append the newly created table data to the table row
    tRow.append(trainName, destination, firstTrainTime, frequency);
    // Append the table row to the table body
    tBody.append(tRow);
  };
  
  createRow();
  

  database.ref().set({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

});

database.ref().on("value",function (snapshot){
  console.log(snapshot.val());
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().firstTrainTime);
  console.log(snapshot.val().frequency);

}, function(errorObject){
  console.log("Errors handles: " + errorObject.code);
});