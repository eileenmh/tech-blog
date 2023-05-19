createArticle = async (event) => {
  event.preventDefault();

  const title = $("#title").val().trim();
  const content = $("#content").val().trim();

  const response = await fetch("/api/article/create", {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("Success!");
  } else {
    console.log("No luck.");
  }
};

$(document).ready(function () {
  $("#createArticle").on("click", createArticle);
});
