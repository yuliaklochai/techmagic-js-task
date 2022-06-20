"use strict";

const MAX_QUEUE_LENGTH = 10;

let input = document.querySelector("#input");
let btnAdd = document.querySelector("#btn-add");
let btnRemove = document.querySelector("#btn-remove");
let queue = document.querySelector(".queue");
let queueList = [];
let storedQueue = sessionStorage.getItem("storedQueue");
storedQueue = JSON.parse(storedQueue);

function addItem(value) {
  let item = document.createElement("div");

  item.innerText = value;
  item.classList.add("queue__item");

  queue.append(item);
}

function removeItem() {
  if (!queueList.length) {
    alert("You`ve already deleated all the items.");
    return;
  }
  queueList.shift();

  queue.removeChild(queue.firstElementChild);
}

function ifEmpty(value) {
  if (!value) {
    alert("Input can`t be empty. Please, write something and try again.");
    return true;
  } else {
    return false;
  }
}

function ifLong() {
  if (queueList.length >= MAX_QUEUE_LENGTH) {
    alert(
      `Queue length can't be longer than ${MAX_QUEUE_LENGTH} items. Please, delete some items and try again`
    );
    return true;
  } else {
    return false;
  }
}
window.addEventListener("load", () => {
  if (storedQueue) {
    queueList = storedQueue.slice();
  }
  queueList.forEach((el) => {
    addItem(el);
  });
});
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();

  let value = input.value.trim();

  if (ifEmpty(value) || ifLong()) return;
  input.value = "";

  addItem(value);
  queueList.push(value);
  sessionStorage.setItem("storedQueue", JSON.stringify(queueList));
});

btnRemove.addEventListener("click", (e) => {
  e.preventDefault();

  removeItem();
  sessionStorage.setItem("storedQueue", JSON.stringify(queueList));
});
