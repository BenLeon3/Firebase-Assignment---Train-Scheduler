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

var d = new Date();
document.getElementById("current-dateTime").innerHTML = d;
console.log(d);



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

  var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment (firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % frequency;
  console.log("tRemainder: " + tRemainder);

  var minutesAway = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minutesAway);
  
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
  // console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm")); 


  // var createRow = function() {
    
  //   var tBody = $("tbody");
  //   var tRow = $("<tr>");
  
  //   var trainNameTd= $("<td>").text(trainName);
  //   var destinationTd = $("<td>").text(destination);
  //   var frequencyTd = $("<td>").text(frequency);
  //   var nextArrivalTd = $("<td>").text(nextArrival);
  //   var minutesAwayTd = $("<td>").text(minutesAway);

  //   // Append the newly created table data to the table row
  //   tRow.append(trainNameTd, destinationTd, frequencyTd, nextArrivalTd, minutesAwayTd,);
  //   // // // Append the table row to the table body
  //   tBody.append(tRow);
  // };
  
  // createRow();
  
  //adds multiple trains to firebase
  // database.ref().push(newTrain);
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    minutesAway: minutesAway,
    nextArrival: nextArrival
  });

});

database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().firstTrainTime);
  console.log(snapshot.val().frequency);
  console.log(snapshot.val().minutesAway);
  console.log(snapshot.val().nextArrival);

  var createRow = function() {

    var tBody = $("tbody");
    var tRow = $("<tr>");

    $("<td>").text(snapshot.val().trainName);
    $("<td>").text(snapshot.val().destination);
    $("<td>").text(snapshot.val().frequency);
    $("<td>").text(snapshot.val().nextArrival);
    $("<td>").text(snapshot.val().minutesAway);

    var trainNameTd= $("<td>").text(snapshot.val().trainName);
    var destinationTd = $("<td>").text(snapshot.val().destination);
    var frequencyTd = $("<td>").text(snapshot.val().frequency);
    var nextArrivalTd = $("<td>").text(snapshot.val().nextArrival);
    var minutesAwayTd = $("<td>").text(snapshot.val().minutesAway);

    tRow.append(trainNameTd, destinationTd, frequencyTd, nextArrivalTd, minutesAwayTd,);

    tBody.append(tRow);
  };
    createRow();

}, function(errorObject){
  console.log("Errors handles: " + errorObject.code);
});
