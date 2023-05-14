usernameAvailable = async () => {
  const username = $("#username").val().trim();

  const response = await fetch("/api/users/username", {
    method: "POST",
    body: JSON.stringify({ username }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 200) {
    // username is available
    $("#username-helper")
      .removeClass("is-danger hide")
      .addClass("is-success")
      .html("This username is available.");
    return true;
  } else {
    // username is unavailable
    $("#username-helper")
      .removeClass("is-success hide")
      .addClass("is-danger")
      .html("This username is already taken.");
    return false;
  }
};

strongPassword = () => {
  const password = $("#password").val().trim();

  mustContainArrays = [
    Array.from("!#$%&()*+-.,/:;<=>?@[]^_`{}|~"),
    Array.from("abcdefghijklmnopqrstuvwxyz"),
    Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    Array.from("123456789"),
  ];

  arrayCheck = [];

  mustContainArrays.forEach((array) => {
    checkEachValue = array.map((value) => password.includes(value));
    hasAtLeastOne = checkEachValue.includes(true);
    arrayCheck.push(hasAtLeastOne);
  });

  pwdContainsChars = arrayCheck.every((currentValue) => currentValue === true);
  pwdGoodLength = () => password.length > 5;

  if (pwdGoodLength()) {
    if (pwdContainsChars) {
      $("#password-helper")
        .removeClass("is-danger hide")
        .addClass("is-success")
        .html("Great password!");
      return true;
    } else {
      $("#password-helper")
        .removeClass("is-success hide")
        .addClass("is-danger")
        .html(
          "Password must contain lowercase & uppercase letters, and at least one symbol and one number."
        );
      return false;
    }
  } else {
    $("#password-helper")
      .removeClass("is-success hide")
      .addClass("is-danger")
      .html("Password must be at least six characters.");
    return false;
  }
};

async function signUp(event) {
  event.preventDefault();

  const username = $("#username").val().trim();
  const password = $("#password").val().trim();

  // Check username
  if ((await usernameAvailable()) === false) {
    return;
  }

  // Check password
  if (strongPassword() === false) {
    return;
  }

  const response = await fetch("/api/users/signup", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  }
}

$(document).ready(function () {
  $("#signUpBtn").on("click", signUp);
  $("#username").on("focusout", usernameAvailable);
  $("#password").on("focusout", strongPassword);
});
