document.addEventListener("DOMContentLoaded", function () {
  var roomDropdown = document.getElementById("room");

  // Define the rooms and their corresponding labels
  var rooms = [
    { value: "1", label: "Room 1" },
    { value: "2", label: "Room 2" },
    { value: "3", label: "Room 3" },
    { value: "4", label: "Room 4" },
    { value: "5", label: "Room 5" },
    { value: "6", label: "Room 6" },
    { value: "7", label: "Room 7" },
    { value: "8", label: "Room 8" },
    { value: "9", label: "Room 9" },
    { value: "10", label: "Room 10" },
    { value: "11", label: "Room 11" },
    { value: "12", label: "Room 12" },
    { value: "13", label: "Room 13" },
    { value: "14", label: "Room 14" },
    { value: "15", label: "Room 15" },
    { value: "16", label: "Room 16" },
  ];

  // Populate the dropdown options
  rooms.forEach(function (room) {
    var option = document.createElement("option");
    option.value = room.value;
    option.textContent = room.label;
    roomDropdown.appendChild(option);
  });
});

document.getElementById("room-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  // Get form values
  var room = document.getElementById("room").value;
  var password = document.getElementById("password").value;

  // Perform validation
  if (!room || !password) {
    alert("Please fill in all fields");
    return;
  }

  // Perform further processing (replace with your own logic)
  console.log("Selected room:", room);
  console.log("Entered password:", password);

  // Reset the form
  document.getElementById("room-form").reset();
});
