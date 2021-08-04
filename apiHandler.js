const createUser = () => {
  let form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let phonenumber = document.getElementById("number").value;
    let name = document.getElementById("name").value;

    console.log(username);
    console.log(password);
    console.log(phonenumber);
    console.log(name);

    fetch("https://chui2.azurewebsites.net/user", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        phonenumber: phonenumber,
        name: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (respose) {
        return respose.json();
      })
      .then(function (data) {
        console.log(data);
      });
  });
};

const login = () => {
  let form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log(username);
    console.log(password);

    fetch("https://chui2.azurewebsites.net/login", {
      method: "POST",
      headers: { Authorization: "Basic " + btoa(username + ":" + password) },
    })
      .then(function (respose) {
        return respose.json();
      })
      .then(function (data) {
        document.cookie = `x-access-token=${data.token}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
        console.log(data);
        console.log(getCookie("x-access-token"));
      });
  });
};

const predict = () => {
  let form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let nitrogen = document.getElementById("n").value;
    let phosphorus = document.getElementById("phos").value;
    let potasium = document.getElementById("pot").value;
    let ph = document.getElementById("ph").value;

    console.log(nitrogen);
    console.log(phosphorus);
    console.log(potasium);
    console.log(ph);

    fetch("https://chui2.azurewebsites.net/predict", {
      method: "POST",
      body: JSON.stringify({
        N: nitrogen,
        P: phosphorus,
        K: potasium,
        pH: ph,
        rainfall: 137,
        city: "kikuyu",
      }),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": getCookie("x-access-token"),
      },
    })
      .then(function (respose) {
        return respose.json();
      })
      .then(function (data) {
        console.log(data);
      });
  });
};

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
