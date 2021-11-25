"use strict";

import { createMembershipWindow } from "./windowCreation.js";
import { renderCards } from "./windowCreation.js";

const getCardDetails = async () => {
  const response = await fetch("http://localhost:3000/memberships");
  const json = await response.json();
  return json;
};

export const fetchAndRenderCards = async () => {
  const cardInfo = await getCardDetails();
  renderCards(cardInfo);
};
window.addEventListener("DOMContentLoaded", fetchAndRenderCards);
export const deleteMembership = async (id) => {
  const response = await fetch(`http://localhost:3000/memberships/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: null,
  });
  const json = await response.json();
  return json;
};

document.querySelector(".main__div__new__btn").addEventListener("click", () => {
  createMembershipWindow();
});
export const addMemberShip = async (membership) => {
  const response = await fetch("http://localhost:3000/memberships", {
    method: "POST",
    body: JSON.stringify(membership),
    headers: {
      "content-type": "application/json",
    },
  });

  const json = await response.json();
  return json;
};
