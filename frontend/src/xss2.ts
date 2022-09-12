document.querySelector("form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector<HTMLInputElement>("input#name");
  const div = document.querySelector<HTMLDivElement>("#message");
  if (div && input) {
    div.innerHTML = `Welcome, ${input.value}`;
  }
});
