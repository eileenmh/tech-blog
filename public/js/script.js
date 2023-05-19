logout = async () => {
  console.log("Login button was clicked");
  const response = await fetch("/api/users/logout", {
    method: "POST",
  });

  if (response.ok) {
    document.location.replace("/");
  }
};

$(document).ready(function () {
  $("#logoutBtn").on("click", logout);
});
