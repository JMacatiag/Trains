var firstTrainTimeConverted;
var currentTime;
var timeDifference;
var timeApart;
var minutesToNextTrain;
var nextTrain;



// Initialize firebase
var config = {
    apiKey: "AIzaSyBfr1SriEeMIPpSYZbTxvth-M_DsAozgDc",
    authDomain: "train-schedule-7868b.firebaseapp.com",
    databaseURL: "https://train-schedule-7868b.firebaseio.com",
    projectId: "train-schedule-7868b",
    storageBucket: "train-schedule-7868b.appspot.com",
    messagingSenderId: "546912299004"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  // console.log(database);

// On submittion add train information
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Put user input into variables
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequencyInput").val().trim();

    // Variable to hold employee data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  };

    // Push to firebase
  database.ref().push(newTrain);

    // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  
});

// firebase event to add new train
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;


// Time calculations
  trainFrequency=frequency;
  firstTrainTime=firstTrain;

  // First Time
  firstTrainTimeConverted=moment(firstTrainTime, "hh:mm").subtract(1, "years");

  // current time
  currentTime=moment();

  // time difference
  timeDifference = moment().diff(moment(firstTrainTimeConverted), "minutes");

  // time apart
  timeApart=timeDifference%trainFrequency;

  // minutes until next train
  minutesToNextTrain=trainFrequency-timeApart;

  // next train
  nextTrain=moment().add(minutesToNextTrain, "minutes");

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
  console.log(moment(nextTrain).format("hh:mm"));
  console.log(minutesToNextTrain);

  // Add each train's data into the table
  $("#scheduleList").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesToNextTrain + "</td></tr>");
});