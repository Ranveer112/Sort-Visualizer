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
    for (let index = 0; index < 128; index++) {
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
    if (options.children[0].children[0].checked) {
      console.log("ree");
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
        await sleep(100);
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
        await sleep(100);
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
  async function mergeSort() {
    button2.removeEventListener("click", populate);
    let sticks = qs(".yardsticks");
    let windowSize=2;
    let date = new Date();
    while(windowSize<=sticks.children.length){
      
      for(let index=0;index<=sticks.children.length-windowSize;index+=windowSize){
        for(let runner=index;runner<=index+windowSize-1;runner++){
          sticks.children[runner].classList.add("sorted");
        }
        let middle=Math.floor((windowSize-1)/2);
        merge(index, index+middle, index+middle+1, index+windowSize-1);
        await sleep(100);
        for(let runner=index;runner<=index+windowSize-1;runner++){
          sticks.children[runner].classList.remove("sorted");
        }
        
      }
      windowSize=windowSize*2;
    }
    qs(".comparisions").textContent =
          "Time taken(in ms):" + date.getTime();
    button2.addEventListener("click", populate);
  }

  async function merge(start1, end1, start2, end2){
    let i=start1;
    let j=start2;
    let sticks = qs(".yardsticks");
    while(i<=end1 && j<=end2){
      if(sticks.children[i].style.height>sticks.children[j].style.height){
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
