const progressBoxes = document.querySelectorAll(".progress-box");
const percentTags = document.querySelectorAll(".percent-tag");
const totalVotesElem = document.getElementById("totalVotes");
document.querySelector("#navbars > ul > li:nth-child(1) > a").innerHTML = `HI ${
  sessionStorage.getItem("email").split("@")[0]
}`;
class Poll {
  constructor(root, title) {
    this.root = root;
    this.selected = sessionStorage.getItem("poll-selected");
    this.token = sessionStorage.getItem("Token");
    this.endpoint = "https://voteappsystem.onrender.com/poll";

    this.root.insertAdjacentHTML(
      "afterbegin",
      `
          <div class="poll__title"><h2>${title}</h2></div>
      `
    );

    this._refresh();
  }

  async _refresh() {
    const response = await fetch(this.endpoint, {
      method: "get",

      headers: {
        authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        "Content-Type": "application/json",
      },
    }).catch((err) => console.log(err));
    const data = await response.json();
    console.log(data);

    this.root.querySelectorAll(".progress-box").forEach((option) => {
      option.remove();
    });
    if (response.status === 401) {
      this.root.innerHTML = "";
      this.root.insertAdjacentHTML(
        "afterbegin",
        `
        <h2 style="
        color:#912a2a; ">${data.status.toUpperCase()} <a  href="login.html">Logout</a></h2>
    `
      );
      return;
    }
    for (const option of data.data) {
      const template = document.createElement("template");
      const fragment = template.content;
      template.innerHTML = `
        <div class="progress-box ${
          this.selected == option.label ? "poll__option--selected" : ""
        }" id="${option.label}">
                <p>${option.label}</p>
                <div class="progress-bar">
                    <span data="${
                      option.percentage
                    }%" class="percent-tag"></span>
                </div>
            </div>
           `;

      if (!this.selected) {
        console.log(fragment.querySelector(".progress-box"));
        fragment
          .querySelector(".progress-box")
          .addEventListener("click", () => {
            fetch(this.endpoint, {
              method: "post",
              body: `${JSON.stringify({
                add: option.label,
              })}`,
              headers: {
                authorization: `Bearer ${sessionStorage.getItem("Token")}`,
                "Content-Type": "application/json",
              },
            }).then(() => {
              this.selected = option.label;

              sessionStorage.setItem("poll-selected", option.label);

              this._refresh();
            });
          });
      }
      let elm = fragment.querySelector(`#${option.label} > div > span`);
      elm.style.width = `${option.percentage}%`;
      this.root.append(fragment);

      if (elm.getAttribute("data") == "100%") {
        elm.parentElement.classList.add("progress-bar-edit");
      }
    }
    document.querySelector(
      ".total"
    ).textContent = `Total Votes :${data.totalVotes}`;
  }
}

const p = new Poll(document.querySelector(".poll"), "Which do you prefer?");
