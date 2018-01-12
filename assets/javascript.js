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
  console.log(database);

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
    frequency: frequency
  };
    // Push to firebase
  database.ref().push(newTrain);

    // Logs everything to console
  console.log(newTrain.trainname);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);