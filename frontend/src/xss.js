document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("input#name");
  const div = document.querySelector("#message");
  div.innerHTML = `Welcome, ${input.value}`;
});
