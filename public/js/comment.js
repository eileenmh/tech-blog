const deletePost = async (event) => {
  const id = $("#article").attr("data-id");

  const response = await fetch("/api/article/delete", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    console.log("No luck.");
  }
};

const createComment = async (event) => {
  event.preventDefault();
  console.log("Create comment button clicked");

  const comment = $("#comment").val().trim();
  const articleId = $("#article").data("id");

  const response = await fetch("/api/article/comment", {
    method: "POST",
    body: JSON.stringify({ comment, articleId }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log(response);
    document.location.replace(`/article/${articleId}`);
  } else {
    console.log("No luck.");
  }
};

$(document).ready(function () {
  $("#createComment").on("click", createComment);
  $("#deletePost").on("click", deletePost);
});
