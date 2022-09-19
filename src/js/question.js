const main = document.querySelector(".main");
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
        main.appendChild(setElement(question, answerArr));
      });
    });
  const buttonPrev = document.querySelector(".aside-prev");
  const buttonNext = document.querySelector(".aside-next");
  buttonNext.addEventListener("click", () => {
    console.log("asdfasf");
  });
})();

const setElement = (question, answerArr) => {
  const questionItem = document.createElement("div");
  console.log(question, answerArr);
  // 임시로 템플릿을 저장한다.
  const tempContainer = document.createElement("div");
  if (question.pk === 1) {
    const unorderList = document.createElement("ul");
    unorderList.classList.add("question-list", "question-list-1");
    for (const item of answerArr) {
      unorderList.innerHTML += `
      <li class="question-item question-item-1 on">
        <input type="radio" id="answer-1" name="question-1">
        <label for="answer-1">
          <figure class="questioin-1-image" style="background-image: url(${item.image});">
            <img src="${item.image}" alt="question-image">
          </figure>
          <div class="image-description">${item.content}</div>
        </label>
      </li>
      `;
    }
    tempContainer.innerHTML = unorderList;
  } else {
    const unorderList = document.createElement("ul");
    unorderList.classList.add("question-list");
    for (const item of answerArr) {
      unorderList.innerHTML += `
        <li class="question-item">
          <input type="radio" name="answer-1" id="answer-2">
          <label for="answer-2">
            ${item.content}
          </label>
        </li>
      `;
    }
    tempContainer.innerHTML = unorderList;
  }

  questionItem.innerHTML = `
    <header class="header"></header>
    <section class="section"><h2>Q${question.pk}. ${question.content}</h2></section>
    <article class="article">
      ${tempContainer}
    </article>
  `;
  tempContainer.remove();
  return questionItem;
};
