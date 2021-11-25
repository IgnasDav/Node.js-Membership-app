"use strict";
import { addMemberShip } from "./index";
import { deleteMembership } from "./index.js";
import { fetchAndRenderCards } from "./index.js";
const main = document.querySelector(".main");
const mainCards = document.querySelector(".main__cards");
export const createMembershipWindow = () => {
  main.textContent = null;
  //Creating items
  const windowHeading = document.createElement("h1");
  const windowScreen = document.createElement("div");
  const windowMain = document.createElement("div");
  const windowMembershipCloseBtn = document.createElement("button");
  const windowMembershipName = document.createElement("div");
  const windowMembershipPrice = document.createElement("div");
  const windowMembershipDescription = document.createElement("div");
  const windowMembershipNameInput = document.createElement("input");
  const windowMembershipPriceInput = document.createElement("input");
  const windowMembershipDescriptionInput = document.createElement("textarea");
  const windowMembershipNameLabel = document.createElement("label");
  const windowMembershipPriceLabel = document.createElement("label");
  const windowMembershipDescriptionLabel = document.createElement("label");
  const windowMembershipAddBtn = document.createElement("button");
  const windowMembershipBtn = document.createElement("div");
  const copyright = document.createElement("div");
  //Adding classes
  windowMembershipName.classList.add("addMembership__main__name");
  windowMembershipPrice.classList.add("addMembership__main__price");
  windowMembershipDescription.classList.add("addMembership__main__description");
  windowHeading.classList.add("addMembership__heading");
  windowScreen.classList.add("addMembership");
  windowMain.classList.add("addMembership__main");
  windowMembershipNameInput.classList.add("addMembership__main__name__input");
  windowMembershipPriceInput.classList.add("addMembership__main__price__input");
  windowMembershipDescriptionInput.classList.add(
    "addMembership__main__description__input"
  );
  windowMembershipNameLabel.classList.add("addMembership__main__name__label");
  windowMembershipPriceLabel.classList.add("addMembership__main__price__label");
  windowMembershipDescriptionLabel.classList.add(
    "addMembership__main__description__label"
  );
  windowMembershipBtn.classList.add("addMembership__main__btn");
  windowMembershipCloseBtn.classList.add("addMembership__main__btn__close");
  windowMembershipAddBtn.classList.add("addMembership__main__btn__add");
  copyright.classList.add("addMembership__copyright");
  //Inserting content
  windowMembershipNameInput.type = "text";
  windowMembershipPriceInput.type = "text";
  windowMembershipDescriptionInput.rows = 10;
  windowMembershipDescriptionInput.cols = 40;
  windowHeading.textContent = "Create Membership";
  windowMembershipCloseBtn.textContent = "Close";
  windowMembershipNameInput.placeholder = "Name";
  windowMembershipPriceInput.placeholder = "Membership Price";
  windowMembershipNameLabel.textContent = "Name";
  windowMembershipPriceLabel.textContent = "Price";
  windowMembershipDescriptionLabel.textContent = "Description";
  windowMembershipAddBtn.textContent = "New Membership";
  windowMembershipCloseBtn.textContent = "Close";
  copyright.textContent = "Copyright ©2021 Membership Manager";
  //Inserting into html
  windowMembershipName.append(
    windowMembershipNameLabel,
    windowMembershipNameInput
  );
  windowMembershipPrice.append(
    windowMembershipPriceLabel,
    windowMembershipPriceInput
  );
  windowMembershipDescription.append(
    windowMembershipDescriptionLabel,
    windowMembershipDescriptionInput
  );
  windowMembershipBtn.append(windowMembershipCloseBtn, windowMembershipAddBtn);
  windowMain.append(
    windowMembershipName,
    windowMembershipPrice,
    windowMembershipDescription,
    windowMembershipBtn
  );
  windowScreen.append(windowHeading, windowMain, copyright);
  main.append(windowScreen);

  windowMembershipAddBtn.addEventListener("click", async () => {
    const name = windowMembershipNameInput.value;
    const price = windowMembershipPriceInput.value;
    const description = windowMembershipDescriptionInput.value;
    if (name !== "" && price !== "" && description !== "") {
      await addMemberShip({ name, price, description });
    }
  });
  windowMembershipCloseBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
};
export function renderCards(cardInfo) {
  cardInfo.forEach((item, i) => {
    //Creating items
    const card = document.createElement("div");
    const cardInfo = document.createElement("div");
    const cardInfoPrice = document.createElement("h2");
    const cardInfoMembership = document.createElement("h2");
    const cardDetails = document.createElement("div");
    const cardDelete = document.createElement("div");
    const cardDeleteBtn = document.createElement("button");
    //Adding class names
    card.classList.add("main__cards__card");
    cardInfo.classList.add("main__cards__card__info");
    cardInfoPrice.classList.add("main__cards__card__info__price");
    cardInfoMembership.classList.add("main__cards__card__info__membership");
    cardDetails.classList.add("main__cards__card__details");
    cardDelete.classList.add("main__cards__card__delete");
    cardDeleteBtn.classList.add("main__cards__card__delete__btn");
    //Adding text content
    cardInfoPrice.textContent = `$ ${item.price}`;
    cardInfoMembership.textContent = item.name;
    cardDetails.textContent = item.description;
    cardDeleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    //Inserting into html
    cardInfo.append(cardInfoPrice, cardInfoMembership);
    cardDelete.append(cardDeleteBtn);
    card.append(cardInfo, cardDetails, cardDelete);
    mainCards.append(card);

    cardDeleteBtn.addEventListener("click", async () => {
      await deleteMembership(item.id);
      mainCards.textContent = null;
      await fetchAndRenderCards();
    });
  });
}
export function renderUsers(cardInfo) {
  mainCards.textContent = null;
  let ip =
    Math.floor(Math.random() * 255) +
    1 +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255);
  cardInfo.forEach((item) => {
    //Creating items
    const card = document.createElement("div");
    const cardName = document.createElement("p");
    const cardInfo = document.createElement("div");
    const cardInfoEmailInfo = document.createElement("p");
    const cardInfoEmailText = document.createElement("p");
    const cardInfoMembership = document.createElement("p");
    const cardInfoIp = document.createElement("p");
    const cardInfoEmail = document.createElement("div");
    //Adding class names
    card.classList.add("main__cards__card");
    cardInfo.classList.add("main__cards__card__info");
    cardName.classList.add("main__cards__card__name");
    cardInfoMembership.classList.add("main__cards__card__info__membership");
    cardInfoEmail.classList.add("main__cards__card__info__email");
    cardInfoEmailInfo.classList.add("main__cards__card__info__email__info");
    cardInfoEmailText.classList.add("main__cards__card__info__email__text");
    cardInfoIp.classList.add("main__cards__card__info__ip");
    //Adding text content
    cardInfoEmailInfo.textContent = "Email address: ";
    cardName.textContent = `${item.name} ${item.surname}`;
    cardInfoEmailText.innerHTML = `${item.email}`;
    cardInfoMembership.innerHTML = `Membership: <span class='highlited'>${item.memberships[0].name} </span>`;
    cardInfoIp.innerHTML = `ip: ${ip}`;
    //Inserting into html
    cardInfoEmail.append(cardInfoEmailInfo, cardInfoEmailText);
    cardInfo.append(cardInfoEmail, cardInfoMembership, cardInfoIp);

    card.append(cardName, cardInfo);
    mainCards.append(card);
  });
}
