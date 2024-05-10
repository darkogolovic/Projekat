const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputMessage = document.querySelector("#message");
const submitBtn = document.querySelector("#submit");
const messageSent = document.querySelector("#message-sent");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputName.value === "" ||
    inputEmail.value === "" ||
    inputMessage.value === ""
  ) {
    alert("Please fill in all fields");
    return;
  }
  messageSent.classList.remove("hide");
  messageSent.classList.add("show");
  inputName.value = "";
  inputEmail.value = "";
  inputMessage.value = "";
  setTimeout(() => {
    console.log("hello");
    messageSent.classList.remove("show");
    messageSent.classList.add("hide");
  }, 3000);
});
