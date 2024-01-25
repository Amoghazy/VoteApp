const loginBtn = document.getElementById("save_btn");
let statustext = document.getElementById("status");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let dataLogin = {
    email: email,
    password: password,
  };

  let res = await fetch("https://voteappsystem.onrender.com/login", {
    method: "post",
    body: JSON.stringify(dataLogin),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await res.json();
  if (res.status === 200) {
    sessionStorage.setItem("Token", data.token);
    sessionStorage.setItem("email", data.email);
    loginBtn.setAttribute("disabled", "disabled");

    statustext.innerHTML = ` ${data.message};
    <br>
    waiting ... home page is loaded         `;

    return setTimeout(() => location.replace("votinghome.html"), 4000);
  }
});
