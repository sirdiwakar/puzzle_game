document.addEventListener("DOMContentLoaded", function () {
  var roomDropdown = document.getElementById("room");

  // Define the rooms and their corresponding labels
  var rooms = [
    { value: "2", label: "Room 02" },
    { value: "3", label: "Room 13" },
    { value: "4", label: "Room 10" },
    { value: "5", label: "Room 23" },
    { value: "6", label: "Room 30" },
    { value: "7", label: "Room 31" },
    { value: "8", label: "Room 32" },
    { value: "9", label: "Room 12" },
    { value: "10", label: "Room 22" },
    { value: "11", label: "Room 33" },
    { value: "12", label: "Room 21" },
    { value: "13", label: "Room 1" },
    { value: "14", label: "Room 11" },
    { value: "15", label: "Room 3" },
    { value: "16", label: "Room 20" },
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

  fetch("/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      room: room,
      password: password,
    }),
  }).then(function (response) {
    if (response.status === 200) {
      // Redirect to the room
      window.location.href = `/room/${room}`;
    } else {
      alert("Incorrect password");
    }
  });

  // Reset the form
  document.getElementById("room-form").reset();
});
