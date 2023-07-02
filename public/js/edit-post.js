const editPost = async (event) => {
  event.preventDefault();

  const id = $("#article").attr("data-id");
  const title = $("#title").val().trim();
  const content = $("#content").val().trim();

  const response = await fetch("/api/article/update", {
    method: "PUT",
    body: JSON.stringify({ id, title, content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/article/${id}`);
  } else {
    console.log("No luck.");
  }
};

$(document).ready(function () {
  $("#editPost").on("click", editPost);
});
