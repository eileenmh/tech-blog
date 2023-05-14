usernameAvailable = async () => {
  const username = $("#username").val().trim();

  const response = await fetch("/api/users/username", {
    method: "POST",
    body: JSON.stringify({ username }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

async function signUp(event) {
  event.preventDefault();

  const username = $("#username").val().trim();
  const password = $("#password").val().trim();

  if ((await usernameAvailable()) === false) {
    return;
  }

  if (username && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(response);
  }
}

$(document).ready(function () {
  $("#signUpBtn").on("click", signUp);
  $("#username").on("focusout", usernameAvailable);
});
