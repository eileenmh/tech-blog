login = async (event) => {
  event.preventDefault();
  const username = $("#username").val().trim();
  const password = $("#password").val().trim();

  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (response.status === 400) {
    // login rejected
    $("#login-helper").removeClass("hide").html(data.message);
  } else {
    console.log("response status is NOT 400");
    document.location.replace("/dashboard");
  }
};

$(document).ready(function () {
  $("#loginBtn").on("click", login);
});
