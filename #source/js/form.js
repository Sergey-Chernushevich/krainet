const form = document.querySelector("#form");

const formInputs = form.querySelectorAll(".form__input");
const submitButton = form.querySelector(".form__button");
const checkbox = form.querySelector("#agreement");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

checkbox.addEventListener("change", () => {
  submitButton.disabled = !checkbox.checked;
});

const NotificationMessages = {
  NAME_REQUIRED: "Имя не может быть пустым.",
  NAME_WITH_NUMBERS: "Имя может содержать только буквы.",
  EMAIL_REQUIRED: "Email не может быть пустым.",
  EMAIL_INVALID: "Некорректный email.",
  EMPTY_MESSAGE: "Введите сообщение.",
};

function validateName(name) {
  const namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;
  return namePattern.test(name);
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

formInputs.forEach((input) => {
  input.addEventListener("blur", function () {
    const attributeValue = input.getAttribute("data");
    const errorMessage = input.nextElementSibling;

    switch (attributeValue) {
      case "name":
        if (this.value.trim().length < 1) {
          errorMessage.textContent = NotificationMessages.NAME_REQUIRED;
        } else if (!validateName(this.value)) {
          errorMessage.textContent = NotificationMessages.NAME_WITH_NUMBERS;
        } else {
          errorMessage.innerHTML = "";
        }
        break;

      case "email":
        if (this.value.trim().length < 1) {
          errorMessage.textContent = NotificationMessages.EMAIL_REQUIRED;
        } else if (!validateEmail(this.value.trim())) {
          errorMessage.textContent = NotificationMessages.EMAIL_INVALID;
        } else {
          errorMessage.innerHTML = "";
        }
        break;
      case "message":
        if (this.value.trim() < 1) {
          errorMessage.textContent = NotificationMessages.EMPTY_MESSAGE;
        } else {
          errorMessage.innerHTML = "";
        }

      default:
        break;
    }
  });
});

formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    input.nextElementSibling.textContent = "";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(`${data.name}, я свяжусь с вами в ближайшее время!`);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при отправке формы.");
    });
});