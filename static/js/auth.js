document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  // Get form values
  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;

  // Perform validation
  if (!username || !password) {
    alert("Please fill in all fields");
    return;
  }

  console.log("Login Username:", username);
  console.log("Login Password:", password);

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      if (data.success) {
        window.location.href = "/";
      } else {
        alert("Incorrect username or password");
      }
    });

  // Reset the form
  document.getElementById("login-form").reset();
});

document
  .getElementById("registration-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    var name = document.getElementById("registration-name").value;
    var email = document.getElementById("registration-email").value;
    var password1 = document.getElementById("registration-password1").value;
    var password2 = document.getElementById("registration-password2").value;

    // Perform validation
    if (!name || !email || !password1 || !password2) {
      alert("Please fill in all fields");
      return;
    }

    // Perform registration logic (replace with your own logic)
    console.log("Registration Name:", name);
    console.log("Registration Email:", email);
    console.log("Registration Password:", password1);

    if (password1 != password2) {
      alert("Passwords do not match");
      return;
    }
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        email: email,
        password1: password1,
        password2: password2,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if(data.success){
            alert("Registration successful, now you can login");
        }
      });
    // Reset the form
  });
