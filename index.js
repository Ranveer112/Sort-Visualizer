/*
 * Name: Ranveer Randhawa
 * Date: April 22, 2020
 *
 * This is the JS to implement the backend of my insertion sort webpage.
 * It responds to mouse click using even listener.
 */
"use strict";
(function() {
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
    qs(".comparisions").textContent = "Time taken(in ms):0";
    let parent = qs(".yardsticks");
    parent.innerHTML='';
    for (let index = 0; index < 100; index++) {
      let stick=gen("div");
      stick.classList.add("sticks");
      let randnum=Math.floor(Math.random() * (110)) + 100;
      stick.style.height=randnum.toString()+'px';
      
      parent.appendChild(stick);
    }
    button.addEventListener("click", sort);
  }


  /**
   * Sort helper method-responsible for calling appropriate sorting algorithm.
   */
  function sort() {
    let options = qs("p");
    console.log(options);
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
    let date = new Date();
    for (let index = 0; index < sticks.children.length; index++) {
      let curr = sticks.children[index].style.height;
      let runner = index - 1;
      while (runner >= 0 && sticks.children[runner].style.height >= curr) {
        sticks.insertBefore(
          sticks.children[runner + 1],
          sticks.children[runner]
        );
        runner = runner - 1;
        await sleep(1);
      }
    }
    qs(".comparisions").textContent =
          "Time taken(in ms):" + date.getTime();
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
    let date = new Date();
    for (let i = 0; i < sticks.children.length; i++) {
      for (let j = sticks.children.length - 1; j > 0; j--) {
        if (sticks.children[j].style.height < sticks.children[j - 1].style.height) {
          sticks.insertBefore(sticks.children[j], sticks.children[j - 1]);
        }
        await sleep(1);
      }
    }
    qs(".comparisions").textContent =
          "Time taken(in ms):" + date.getTime();
    button2.addEventListener("click", populate);
    button.addEventListener("click", sort);
  }
  /**
   * This function is responsible for sorting the sticks using the famous
   * algorithm of selection sort. It is an async function to simulate the
   * sorting as an animation.
   */
  async function selectionSort() {
    button2.removeEventListener("click", populate);
    let sticks = qs(".yardsticks");
    let comparisions = 0;

    button2.addEventListener("click", populate);
    
  }
  /**
   * This function is responsible for sorting the sticks using the famous
   * algorithm of merge sort. It is an async function to simulate the
   * sorting as an animation.
   */
  function mergeSort() {
    button2.removeEventListener("click", populate);
    let sticks = qs(".yardsticks");
    divide(0, sticks.children.length-1);

    button2.addEventListener("click", populate);
  }

  function divide(start, end){
    if(start==end){
      return;
    }
    let middle=Math.floor((start+end)/2);
    divide(start, middle);
    divide(1+middle, end);
    merge(start, middle, middle+1, end);
  }
  function merge(start1, end1, start2, end2){
    let i=start1;
    let j=start2;
    let sticks = qs(".yardsticks");
    while(i<=end1 && j<=end2){
      if(sticks.children[i].style.height>sticks.children[j].style.height){
        sticks.insertBefore(sticks.children[j], sticks.children[i]);
        console.log(sticks);
        i++;
        end1++;
        j++;
        continue;
      }
      i++;
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
