import gsap from "gsap";

export default function generator() {
  const a = window.innerWidth;
  const b = window.innerHeight;
  const app = document.getElementById("App");

  const COLUMN = 10;

  const rows = [];
  const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"];
  for (let i = 0; i < COLUMN; i++) {
    rows.push((a / COLUMN) * i + "px");
  }

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const elem = document.createElement("p");
      elem.style.position = "absolute";
      const randomNumber = Math.floor(Math.random() * COLUMN);
      elem.style.left = rows[randomNumber];
      const randomEmoji = Math.floor(Math.random() * COLUMN);
      elem.textContent = emojis[randomEmoji];
      elem.classList.add("droppable");
      elem.style.padding = "12px";
      elem.style.cursor = "grab";
      elem.style.borderRadius = "50%";
      elem.style.textAlign = "center";
      //////////////
      let currentDroppable = null;

      app.append(elem);
      let animation = gsap.to(elem, { top: "100vh", duration: "30", ease: "none" });

      elem.onmousedown = function (event) {
        pauseEvent(event);
        animation.kill();

        let shiftX = event.clientX - elem.getBoundingClientRect().left;
        let shiftY = event.clientY - elem.getBoundingClientRect().top;

        elem.style.zIndex = 1000;

        moveAt(event.pageX, event.pageY);

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
              // null when we were not over a droppable before this event
              leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
              // null if we're not coming over a droppable now
              // (maybe just left the droppable)
              enterDroppable(currentDroppable);
            }
          }
        }

        document.addEventListener("mousemove", onMouseMove);

        elem.onmouseup = function () {
          const duration = String((1 - elem.getBoundingClientRect().top / window.innerHeight) * 30);
          animation = gsap.to(elem, { top: "100vh", duration: duration, ease: "none" });
          document.removeEventListener("mousemove", onMouseMove);
        };
      };

      elem.ondragstart = function () {
        return false;
      };

      /////////////

      setTimeout(() => {
        elem.remove();
      }, 30000);
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

function enterDroppable(elem) {
  elem.style.background = "pink";
}

function leaveDroppable(elem) {
  elem.style.background = "";
}
