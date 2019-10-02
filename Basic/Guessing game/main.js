var input = document.querySelector("input");
var response = document.querySelector(".response");
var form = document.querySelector("#guess");
var count = document.querySelector(".count");
var correct = getRandomNumber();

form.addEventListener("submit", checkGuess);

function checkGuess(e) {
  e.preventDefault();
  var guess = Number(input.value);
  
  if (isNaN(guess)) {
    response.innerHTML = "That is not a number dummy";
    refocus();
  } else {
    if (guess > correct) {
      response.innerHTML = "Too Big";
      refocus();
    }
    if (guess < correct) {
      response.innerHTML = "Too Small";
      refocus();
    }
    if (guess === correct) {
      response.innerHTML = "Yay! You did it!";
      response.style.color = "green";
      correct = getRandomNumber();
      clearInterval(timer);
    }
  }
}

function refocus() {
  input.value = "";
  input.focus();
  response.style.color = "#FFABAB";;
}

function getRandomNumber() {
  return Math.ceil(Math.random() * 10);
}

var timer = setInterval(countUp, 1000);

function countUp() {
  var currentCount = Number(count.innerHTML);
  count.innerHTML = currentCount + 1;
}