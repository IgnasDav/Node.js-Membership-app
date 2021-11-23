"use strict";

const mainCards = document.querySelector(".main__cards");

const getCardDetails = async () => {
  const response = await fetch("http://localhost:3000/memberships");
  const json = await response.json();
  return json;
};

function renderCards(cardInfo) {
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

    cardDeleteBtn.addEventListener("click", () => {
      deleteMembership(item.id);
      mainCards.textContent = null;
      fetchAndRenderCards();
    });
  });
}
const fetchAndRenderCards = async () => {
  const cardInfo = await getCardDetails();
  renderCards(cardInfo);
};
window.addEventListener("DOMContentLoaded", fetchAndRenderCards);
const deleteMembership = async (id) => {
  const response = await fetch(`http://localhost:3000/memberships/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};
function createMembershipModal() {
  //Creating items
  const modalScreen = document.createElement("div");
  const modalMain = document.createElement("div");
  const modalCloseBtn = document.createElement("div");
  //Adding classes
  //Inserting content
  //Inserting into html
}
document.querySelector(".main__div__new__btn").addEventListener("click", () => {
  createMembershipModal();
});
