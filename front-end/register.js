let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let savebtn = document.getElementById("save_btn");
let statustext = document.getElementById("status");

nameInput.addEventListener("blur", function () {
  validateName();
});

emailInput.addEventListener("blur", function () {
  validateEmail();
});

passwordInput.addEventListener("blur", function () {
  validatePassword();
});

function validateName() {
  let name = nameInput.value;
  let errorMessage = "Name must be at least 5 characters";

  if (name.length < 5) {
    displayErrorMessage(nameInput, errorMessage);
  } else {
    clearErrorMessage(nameInput);
  }
}

function validateEmail() {
  let email = emailInput.value;
  let errorMessage = "Email must contain at least one number";

  if (!/\d/.test(email)) {
    displayErrorMessage(emailInput, errorMessage);
  } else {
    clearErrorMessage(emailInput);
  }
}

function validatePassword() {
  let password = passwordInput.value;
  let errorMessage = "Password must contain at least one capital letter";

  if (!/^[a-zA-Z0-9]{3,30}$/.test(password)) {
    displayErrorMessage(passwordInput, errorMessage);
  } else {
    clearErrorMessage(passwordInput);
  }
}

function saveData() {
  validateName();
  validateEmail();
  validatePassword();

  if (document.querySelectorAll(".is-invalid").length > 0) {
    alert("Please correct the validation errors before submitting.");
  } else {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let data = {
      username: name,
      email: email,
      password: password,
    };
    fetch("https://votesappsystem.onrender.com/register", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      console.log(response.status);
      if (response.status === 200 || response.status === 201) {
        savebtn.textContent = "Success ";
        savebtn.setAttribute("disabled", "disabled");

        statustext.innerHTML = ` ${await response.json()}
        <br>
        waiting ... login page is loaded         `;

        return setTimeout(() => location.replace("login.html"), 5000);
      } else {
        let err = await response.json();
        displayErrorMessage(emailInput, err.message);
        statustext.innerHTML = ` ${err.message}
        <br>
        please enter a valid data        `;
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}

function displayErrorMessage(input, message) {
  let errorMessageContainer =
    input.parentElement.querySelector(".invalid-feedback");
  input.classList.add("is-invalid");
  errorMessageContainer.innerHTML = message;
  errorMessageContainer.style.color = "red";
}

function clearErrorMessage(input) {
  let errorMessageContainer =
    input.parentElement.querySelector(".invalid-feedback");
  input.classList.remove("is-invalid");
  errorMessageContainer.innerHTML = "";
}
