/*
 * Name: Ranveer Randhawa
 * Date: April 22, 2020
 *
 * This is the JS to implement the backend of my insertion sort webpage.
 * It responds to mouse click using even listener.
 */
"use strict";
(function () {
  window.addEventListener("load", init);
  let button;
  let button2;
  /**
   * Event listerns to different clicks.
   */
  function init() {
    button = qs(".sort");
    button2 = qs(".shuffle");
    button2.addEventListener("click", populate);
    button.addEventListener("click", sort);
  }


  /**
   * Function which populates the sticks randomly
   */
  function populate() {
    button.removeEventListener("click", sort);
    let parent = qs(".yardsticks");
    parent.innerHTML = '';
    for (let index = 0; index < 128; index++) {
      let stick = gen("div");
      stick.classList.add("sticks");
      let randnum = Math.floor(Math.random() * (110)) + 100;
      stick.style.height = randnum.toString() + 'px';

      parent.appendChild(stick);
    }
    button.addEventListener("click", sort);
  }


  /**
   * Sort helper method-responsible for calling appropriate sorting algorithm.
   */
  function sort() {
    let options = qs("p");
    if (options.children[0].children[0].checked) {
      mergeSort();
      return;
    }
    if (options.children[1].children[0].checked) {
      bubbleSort();
      return;
    }
    if (options.children[2].children[0].checked) {
      selectionSort();
      return;
    }
    if (options.children[3].children[0].checked) {
      insertionSort();
      return;
    }

    if (options.children[4].children[0].checked) {
      quickSort();
    }


  }


  /**
   * This function is responsible for sorting the sticks using the famous
   * algorithm of insertion sort. It is an async function to simulate the
   * sorting as an animation.
   */
  async function insertionSort() {
    button.removeEventListener("click", sort);
    button2.removeEventListener("click", populate);
    let sticks = qs(".yardsticks");
    for (let index = 0; index < sticks.children.length; index++) {
      let curr = sticks.children[index].style.height;
      let runner = index - 1;
      while (runner >= 0 && sticks.children[runner].style.height >= curr) {
        sticks.insertBefore(
          sticks.children[runner + 1],
          sticks.children[runner]
        );
        runner = runner - 1;
        await sleep(100);
      }
      sticks.children[runner + 1].classList.add("sorted");
    }
    button2.addEventListener("click", populate);
    button.addEventListener("click", sort);
  }
  /**
   * This function is responsible for sorting the sticks using the famous
   * algorithm of bubble sort. It is an async function to simulate the
   * sorting as an animation.
   */
  async function bubbleSort() {
    button.removeEventListener("click", sort);
    button2.removeEventListener("click", populate);
    let sticks = qs(".yardsticks");
    for (let i = 0; i < sticks.children.length; i++) {
      for (let j = sticks.children.length - 1; j > 0; j--) {
        sticks.children[j].classList.add("sorted");
        let swapped = false;
        if (sticks.children[j].style.height < sticks.children[j - 1].style.height) {
          sticks.insertBefore(sticks.children[j], sticks.children[j - 1]);
          swapped = true;
        }
        await sleep(100);
        sticks.children[swapped ? j - 1 : j].classList.remove("sorted");
      }

    }
    button2.addEventListener("click", populate);
    button.addEventListener("click", sort);
  }
  /**
   * This function is responsible for sorting the sticks using the famous
   * algorithm of selection sort. It is an async function to simulate the
   * sorting as an animation.
   */
  async function selectionSort() {
    button.removeEventListener("click", sort);
    button2.removeEventListener("click", populate);
    let sticks = qs(".yardsticks");
    for (let index = 0; index < sticks.children.length; index++) {
      let minimumHeight=sticks.children[index].style.height;
      let minIndex=index;
      for (let candidate = index; candidate < sticks.children.length; candidate++) {
        sticks.children[candidate].classList.add("considered");
        if(sticks.children[candidate]<minimumHeight){
          minimumHeight=sticks.children[candidate].style.height;
          minIndex=candidate;
        }
        await sleep(100);
        sticks.children[candidate].classList.remove("considered");
      }
      sticks.children[minIndex].classList.add("swapped");
      sticks.children[index].classList.add("swapped");
      sticks.children[minIndex].style.height=sticks.children[index].style.height;
      sticks.children[index].style.height=minimumHeight;
      await sleep(100);
      sticks.children[minIndex].classList.removed("swapped");
      sticks.children[index].classList.remove("swapped");
      sticks.children[index].classList.add("sorted");

    }
    button2.addEventListener("click", populate);
    button.addEventListener("click", sort);

  }
  /**
   * This function is responsible for sorting the sticks using the famous
   * algorithm of merge sort. It is an async function to simulate the
   * sorting as an animation.
   */
  async function mergeSort() {
    button2.removeEventListener("click", populate);
    let sticks = qs(".yardsticks");
    let windowSize = 2;
    while (windowSize <= sticks.children.length) {

      for (let index = 0; index <= sticks.children.length - windowSize; index += windowSize) {
        for (let runner = index; runner <= index + windowSize - 1; runner++) {
          sticks.children[runner].classList.add("sorted");
        }
        let middle = Math.floor((windowSize - 1) / 2);
        merge(index, index + middle, index + middle + 1, index + windowSize - 1);
        await sleep(100);
        for (let runner = index; runner <= index + windowSize - 1; runner++) {
          sticks.children[runner].classList.remove("sorted");
        }

      }
      windowSize = windowSize * 2;
    }
    button2.addEventListener("click", populate);
  }

  async function merge(start1, end1, start2, end2) {
    let i = start1;
    let j = start2;
    let sticks = qs(".yardsticks");
    while (i <= end1 && j <= end2) {
      if (sticks.children[i].style.height > sticks.children[j].style.height) {
        sticks.insertBefore(sticks.children[j], sticks.children[i]);
        i++;
        end1++;
        j++;
        continue;
      }
      i++;
    }

  }
  /**
   * Quick sort function with Pivot choice as the middle element
   */
  async function quickSort() {
    button2.removeEventListener("click", populate);
    let sticks = qs(".yardsticks");
    let stack = [];
    let interval = [0, sticks.children.length];
    stack.push(interval);
    while (stack.length != 0) {
      interval = stack.pop();
      let left = interval[0];
      let right = interval[1];
      if (left >= right) {
        continue;
      }
      let middle = Math.floor((left + (right - left) / 2));
      for (let i = left; i < right; i++) {
        if (i == middle) {
          continue;
        }
        sticks.children[i].classList.add("sorted");
      }
      for (let i = 0; i < middle; i++) {
        if (sticks.children[i].style.height > sticks.children[middle].style.height) {
          sticks.insertBefore(sticks.children[i], sticks.children[middle]);
          sticks.insertBefore(sticks.children[middle], sticks.children[middle - 1]);
          await sleep(100);
          i--;
          middle--;
        }
      }
      for (let i = middle + 1; i < sticks.children.length; i++) {
        if (sticks.children[i].style.height < sticks.children[middle].style.height) {
          sticks.insertBefore(sticks.children[i], sticks.children[middle]);
          await sleep(100);
          middle++;
        }
      }
      for (let i = left; i < right; i++) {
        if (i == middle) {
          continue;
        }
        sticks.children[i].classList.remove("sorted");
      }
      interval = [left, middle];
      stack.push(interval);
      interval = [middle + 1, right];
      stack.push(interval);
    }

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
