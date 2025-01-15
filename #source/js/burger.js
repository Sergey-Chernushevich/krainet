const openBurgerBtn = document.querySelector("#openBurgerButton");
const closeBurgerBtn = document.querySelector("#closeBurgerButton");
const burgerOverlay = document.querySelector("#burgerOverlay");
const burgerMenu = document.querySelector("#burgerMenu");
const NavigationList = burgerMenu.querySelectorAll(".navilationList__item");

function openBurgerMenu() {
  burgerOverlay.classList.add("active");
  burgerMenu.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBurgerMenu() {
  burgerOverlay.classList.remove("active");
  burgerMenu.classList.remove("active");
  document.body.style.overflow = "auto";
}

openBurgerBtn.addEventListener("click", openBurgerMenu);
closeBurgerBtn.addEventListener("click", closeBurgerMenu);
NavigationList.forEach((item) => {
  item.addEventListener("click", closeBurgerMenu);
});

burgerOverlay.addEventListener("click", (e) => {
  if (e.target === burgerOverlay) {
    closeBurgerMenu();
  }
});
