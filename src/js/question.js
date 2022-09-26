const questionForm = document.querySelector("#question-form");
(() => {
  fetch("../data/question.json")
    .then((res) => res.json())
    .then((data) => {
      const questions = data.questions;
      const answers = data.answers;
      questions.forEach((question) => {
        let questionNumber = question.pk;
        let answerArr = [];

        answers.forEach((answer) => {
          if (questionNumber === answer.question) {
            answerArr.push(answer);
          }
        });
        questionForm.appendChild(setElement(question, answerArr));
      });

      // 첫번째 문제만 보이도록 한다.
      const questionItems = document.querySelectorAll(".question-item");
      const firstQuestionItem = questionItems[0];
      firstQuestionItem.classList.add("on");

      // 첫번째 문제에서 이전 버튼을 지운다.
      const prevButtons = document.querySelectorAll(".prev-button");

      prevButtons.forEach((prevButton, index) => {
        prevButton.addEventListener("click", (e) => {
          e.preventDefault();
          const current = questionItems[index];
          movePrev(current);
        });
      });
      prevButtons[0].style.display = "none";

      const nextButtons = document.querySelectorAll(".next-button");
      nextButtons.forEach((nextButton, index) => {
        nextButton.addEventListener("click", (e) => {
          e.preventDefault();
          const current = questionItems[index];
          moveNext(current);
        });
      });

      const nextBtns = document.querySelectorAll(".next-btn");
      nextBtns[nextBtns.length - 1].innerHTML = `
        <button class="next-button" type="submit">
          <img src="../images/button-next.png" alt="next-btn">
        </button>
      `;
    });
})();

function setElement(question, answerArr) {
  const questionItem = document.createElement("div");
  questionItem.classList.add("question-item");
  const tempContainer = document.createElement("div");
  if (question.pk === 1) {
    answerArr.forEach((answer) => {
      tempContainer.innerHTML += `
        <li class="answer-item">
          <input type="radio" id="answer-${answer.pk}" name="question-1" value="${answer.score}">
          <label for="answer-${answer.pk}">
            <div class="answer-img" style="background-image: url(${answer.image});"></div>
            ${answer.content}
            <span></span>
          </label>
        </li>
      `;
    });
  } else if (question.pk === 6) {
    answerArr.forEach((answer) => {
      tempContainer.innerHTML += `
      <li class="answer-item question-6-answer-item">
        <input type="radio" id="answer-${answer.pk}" name="question-6" value="${answer.score}">
        <label for="answer-${answer.pk}">
          <div class="answer-img" style="background-image: url(${answer.image});"></div>
            ${answer.content}
          <span></span>
        </label>
      </li>
      `;
    });
  } else if (question.pk === 9) {
    answerArr.forEach((answer) => {
      tempContainer.innerHTML += `
      <li class="answer-item">
        <input type="radio" id="answer-${answer.pk}" name="question-9" value="${answer.score}">
        <label for="answer-${answer.pk}">
          <div class="answer-img" style="background-image: url(${answer.image});"></div>
          <span></span>
        </label>
      </li>
      `;
    });
  } else {
    answerArr.forEach((answer) => {
      tempContainer.innerHTML += `
        <li class="answer-item">
          <input type="radio" id="answer-${answer.pk}" name="question-${question.pk}" value="${answer.score}">
          <label for="answer-${answer.pk}">
            <span></span>
            ${answer.content}
          </label>
        </li>
      `;
    });
  }

  questionItem.innerHTML = `
    <aside class="prev-btn">
      <button class="prev-button">
        <img src="../images/button-prev.png" alt="prev-btn">
      </button>
    </aside>
    <main class="main">
      <div class="status-bar">
        <div class="outter-box">
          <div class="inner-box"></div>
          <img src="../images/statusbar-icon.png" alt="">
        </div>
      </div>
      <div class="question-box">
        <h1>Q${question.pk}. ${question.content}</h1>
        <ul class="answer-list ${
          [2, 3, 4, 5, 7, 8, 10].includes(question.pk) && "answer-list-string"
        }">
          ${tempContainer.innerHTML}
        </ul>
      </div>
    </main>
    <aside class="next-btn">
      <button class="next-button">
        <img src="../images/button-next.png" alt="next-btn">
      </button>
    </aside>
  `;
  tempContainer.remove();
  return questionItem;
}

function movePrev(currentItem) {
  currentItem.classList.remove("on");
  let next = currentItem.previousElementSibling;
  if (next) {
    next.classList.add("on");
  }
}

function moveNext(currentItem) {
  currentItem.classList.remove("on");
  let next = currentItem.nextElementSibling;
  if (next) {
    next.classList.add("on");
  }
}
