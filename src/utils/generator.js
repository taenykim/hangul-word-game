import gsap from "gsap";
import hangulgen from "./hangulgen";
import hangulKeydown from "./hangulKeydown";

export const consonants = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
// 3개가 합쳐지는 ㅞ ㅙ 고려해야함
export const vowels = ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ"];
export const types = consonants.concat(vowels);

const a = window.innerWidth;
const b = window.innerHeight;

const COLUMN = 10;
const TYPE_GENERATING_COUNT = 20;

const words = [];
const rows = [];

export default function generator() {
  for (let i = 0; i < COLUMN; i++) {
    rows.push((a / COLUMN) * i + "px");
  }

  document.addEventListener("keydown", logKey);

  function logKey(e) {
    wordGen("keypress", e);
  }

  for (let i = 0; i < TYPE_GENERATING_COUNT; i++) {
    setTimeout(() => {
      wordGen("random");
    }, 1000 * i);
  }
}

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

function enterDroppable(moveElem, targetElem) {
  targetElem.style.background = "pink";
  return [moveElem.textContent, targetElem.textContent];
}

function leaveDroppable(elem) {
  elem.style.background = "";
  return [null, null];
}

function wordGen(type, e) {
  const app = document.getElementById("App");
  const elem = document.createElement("p");
  elem.style.position = "absolute";
  if (type === "keypress") {
    const randomNumber = Math.floor(Math.random() * COLUMN);
    elem.style.left = rows[randomNumber];
    elem.textContent = hangulKeydown(e);
  } else if (type === "random") {
    const randomNumber = Math.floor(Math.random() * COLUMN);
    elem.style.left = rows[randomNumber];
    const randomTypes = Math.floor(Math.random() * types.length);
    elem.textContent = types[randomTypes];
  }
  elem.classList.add("droppable");
  elem.style.padding = "24px";
  elem.style.fontSize = "24px";
  elem.style.cursor = "grab";
  elem.style.borderRadius = "50%";
  elem.style.textAlign = "center";
  //////////////
  let currentDroppable = null;

  app.append(elem);
  let animation = gsap.to(elem, { top: "100vh", duration: "30", ease: "none" });

  elem.onmouseover = function (event) {
    elem.style.backgroundColor = "rgba(30, 143, 255, 0.356)";
  };

  elem.onmouseleave = function (event) {
    elem.style.backgroundColor = "";
  };

  elem.onmousedown = function (event) {
    console.log(animation);
    let [moveElemContent, targetElemContent] = [null, null];
    pauseEvent(event);
    animation.kill();

    let shiftX = event.clientX - elem.getBoundingClientRect().left;
    let shiftY = event.clientY - elem.getBoundingClientRect().top;

    elem.style.zIndex = 1000;

    function moveAt(pageX, pageY) {
      elem.style.left = pageX - shiftX + "px";
      elem.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      elem.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      elem.hidden = false;

      if (!elemBelow) return;

      let droppableBelow = elemBelow.closest(".droppable");
      if (currentDroppable != droppableBelow) {
        if (currentDroppable) {
          [moveElemContent, targetElemContent] = leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          [moveElemContent, targetElemContent] = enterDroppable(elem, currentDroppable);
        }
      }
    }

    document.addEventListener("mousemove", onMouseMove);

    document.onmouseup = function () {
      const duration = String((1 - elem.getBoundingClientRect().top / window.innerHeight) * 30);
      animation = gsap.to(elem, { top: "100vh", duration: duration, ease: "none" });
      clearTimeout(timer);
      timer = setTimeout(() => {
        removeElem(elem);
      }, Number(duration) * 1000);
      if (moveElemContent != null) {
        const answer = hangulgen([moveElemContent, targetElemContent]);
        const generatedType = answer[0];
        const isWord = answer[1];
        if (generatedType) {
          currentDroppable.textContent = generatedType;
          leaveDroppable(currentDroppable);
          removeElem(elem);
        }
        if (isWord) {
          words.push(generatedType);
          const wordsDiv = document.getElementById("words");
          wordsDiv.textContent = words.join("");
          console.log(words);
        }
      }
      document.removeEventListener("mousemove", onMouseMove);
    };
  };

  elem.ondragstart = function () {
    return false;
  };

  /////////////

  let timer = setTimeout(() => {
    removeElem(elem);
  }, 30000);
}

function removeElem(elem) {
  for (let i = 0; i < words.length; i++) {
    if (words[i] === elem.textContent) {
      words.splice(i, 1);
      break;
    }
  }
  const wordsDiv = document.getElementById("words");
  wordsDiv.textContent = words.join("");
  elem.remove();
}
