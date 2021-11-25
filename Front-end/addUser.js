"use strict";
const memberships = document.querySelector(".main__addUser__memberships");
const membershipsSelect = document.createElement("select");
document
  .querySelector(".main__addUser__btn__cancel")
  .addEventListener("click", () => {
    window.location.href = "users.html";
  });

const renderMemberships = async () => {
  const membershipsSelectLabel = document.createElement("label");
  membershipsSelectLabel.textContent = "Change Membership";
  const membershipData = await getMembershipOptions();
  membershipData.forEach((item) => {
    const membershipOptions = document.createElement("option");
    membershipOptions.value = item.id;
    membershipOptions.text = item.name;
    membershipsSelect.append(membershipOptions);
  });
  memberships.append(membershipsSelectLabel, membershipsSelect);
  membershipsSelectLabel.classList.add(
    "main__addUser__memberships__select__label"
  );
  membershipsSelect.classList.add("main__addUser__memberships__select");
};
window.addEventListener("DOMContentLoaded", renderMemberships);
const getMembershipOptions = async () => {
  const response = await fetch("http://localhost:3000/memberships");
  const json = await response.json();
  return json;
};
const addUser = async (user) => {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
    },
  });
  const json = await response.json();
  return json;
};
document
  .querySelector(".main__addUser__btn__add")
  .addEventListener("click", () => {
    const nameInput = document.querySelector(
      ".main__addUser__div__inputs__name"
    );
    const surnameInput = document.querySelector(
      ".main__addUser__div__inputs__surname"
    );
    const emailInput = document.querySelector(".main__addUser__email");

    const service_id = membershipsSelect.value;
    const name = nameInput.value;
    const surname = surnameInput.value;
    const email = emailInput.value;
    console.log(email, name, service_id, surname);
    if (service_id !== "" && name !== "" && surname !== "" && email !== "") {
      addUser({ name, surname, email, service_id });
    }
  });
