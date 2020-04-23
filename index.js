/*
 * Name: Ranveer Randhawa
 * Date: April 22, 2020
 * Section: CSE 154 A
 *
 * This is the JS to implement the backend of my insertion sort webpage.
 * It responds to mouse click using even listener.
 */
"use strict";
(function() {
  window.addEventListener("load", init);
  const img1 = gen("img");
  img1.src = "1.png";
  const img2 = gen("img");
  img2.src = "2.png";
  const img3 = gen("img");
  img3.src = "3.png";
  const img4 = gen("img");
  img4.src = "4.png";
  const img5 = gen("img");
  img5.src = "5.png";
  const img6 = gen("img");
  img6.src = "6.png";
  const img7 = gen("img");
  img7.src = "7.png";
  const img8 = gen("img");
  img8.src = "8.png";
  const arr = [img1, img2, img3, img4, img5, img6, img7, img8];
  let button;
  let button2;

  /**
   * Event listerns to different clicks.
   */
  function init() {
    button = qs(".sort");
    button2 = qs(".shuffle");
    button2.addEventListener("click", populate);
    button.addEventListener("click", insertionSort);
  }

  /**
   * Function which populates the sticks randomly
   */
  function populate() {
    button.removeEventListener("click", insertionSort);
    qs(".comparisions").textContent = "Number of Comparisions:0";
    shuffle(arr);
    let parent = qs(".yardsticks");
    for (let index = 0; index < arr.length; index++) {
      parent.appendChild(arr[index]);
    }
    button.addEventListener("click", insertionSort);
  }

  /**
   * Fisher yates algorithm to shuffle an array. Taken from community wiki at
   * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
   * @param {img} array of all the image nodes
   * @return {img} array of all the shuffled image nodes
   */
  function shuffle(array) {
    let j = 0;
    let temp = 0;
    for (let i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  /**
   * This function is responsible for sorting the sticks using the famous
   * algorithm of insertion sort. It is an async function to simulate the
   * sorting as an animation.
   */
  async function insertionSort() {
    button2.removeEventListener("click", populate);
    let sticks = qs(".yardsticks");
    let comparisions = 0;
    for (let index = 0; index < sticks.children.length; index++) {
      let curr = sticks.children[index].height;
      let runner = index - 1;
      while (runner >= 0 && sticks.children[runner].height >= curr) {
        sticks.insertBefore(
          sticks.children[runner + 1],
          sticks.children[runner]
        );
        comparisions++;
        qs(".comparisions").textContent =
          "Number of Comparisions:" + comparisions;
        runner = runner - 1;
        await sleep(500);
      }
    }
    button2.addEventListener("click", populate);
  }

  /**
   * Makes the program sleep for input milliseconds.
   * @param {int} time Time to sleep for(in milliseconds)
   * @return {object} Promise
   */
  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
