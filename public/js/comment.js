// const editPost = async (event) => {
//   event.preventDefault();
//   console.log("Edit post button clicked");
//   const articleId = $(event.target).parents("#article").attr("data-id");

//   const response = await fetch("/api/article/e")
//   console.log(articleId);
// };

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
    console.log("Success!");
  } else {
    console.log("No luck.");
  }
};

$(document).ready(function () {
  $("#createComment").on("click", createComment);
  $("#editPost").on("click", editPost);
});
