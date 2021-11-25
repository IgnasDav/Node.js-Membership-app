"use strict";
import { renderUsers } from "./windowCreation.js";
const sort = document.querySelector(".main__div__sort__text");
let sortData = "asc";
window.addEventListener("DOMContentLoaded", () => {
  sort.textContent = `Sorting By Name: ${sortData.toUpperCase()}`;
  sort.addEventListener("click", async () => {
    toggleSort();
    fetchAndRenderUsers();
  });
});
function toggleSort() {
  if (sortData === "asc") {
    sortData = "desc";
  } else {
    sortData = "asc";
  }
  sort.innerHTML = `Sorting By Name: ${sortData.toUpperCase()}`;
}
const getUserDetails = async () => {
  const query = new URLSearchParams();
  query.set("nameSort", sortData);

  const response = await fetch(
    "http://localhost:3000/users?" + query.toString()
  );
  const json = await response.json();
  return json;
};
const fetchAndRenderUsers = async () => {
  const cardInfo = await getUserDetails();
  renderUsers(cardInfo);
};
window.addEventListener("DOMContentLoaded", fetchAndRenderUsers);
document.querySelector(".main__div__new__btn").addEventListener("click", () => {
  window.location.href = "addUser.html";
});
