const D = document;
const main = D.querySelector(".main");
const man = D.querySelector(".man");
const BODY = D.querySelector("body");
const sections = D.querySelectorAll(".section");
//Переменная подсчета расстояния обьекта в котором находиться таргет
let countDistance = 0;
let positionX = 0;
let stepSpeed = 0;
//Позиция модельки заданная в свойсте left в css файле
let startposition = Number(getComputedStyle(man).left.replace(/\D/g, ""));
let manPosition = 0;
let moveBg = 0;
BODY.addEventListener("keydown", (key) => {
  stepSpeed++;
  moveBg = moveBg + 2;
  if (stepSpeed >= 2) {
    if (key.key === "d" || key.key == "D") {
      if (positionX > 97) {
        positionX = 0;
      } else {
        manPosition = startposition + moveBg;
        positionX = positionX + 14.2;
        Object.assign(man.style, {
          backgroundPositionX: `${positionX}%`,
          backgroundPositionY: 0,
          left: `${manPosition}px`,
        });
        main.scroll({
          left: moveBg,
          behavior: "smooth",
        });
      }
    }
    stepSpeed = 0;
  }
  manDialog("Мы в 3 брекпоинте", 3);

  manDialog("Мы в 5 брекпоинте", 5);
});

BODY.addEventListener("keyup", () => {
  man.style.backgroundPositionX = `${42.6}%`;
  man.style.backgroundPositionY = `${100}%`;
  stepSpeed = 0;
});

// Секции, брекпоинты
const colInSection = D.querySelectorAll(".section-col");
colInSection.forEach((col, i) => {
  col.setAttribute("data-object", i);
});

// Функция для получение позиции обьекта
function getObjPosition(NumberOfObj) {
  let objectSeven = D.querySelector(`[data-object="${NumberOfObj}"]`);
  let objectDistance = D.querySelector(`[data-object="${NumberOfObj}"]`);

  return [objectSeven.offsetLeft, objectDistance.offsetWidth];
}

// Отслеживаем столкновение с обьектом
function isManInObject(positionObject) {
  console.log(countDistance);
  // Если таргет внутри обьекта то возвращаем true
  if (
    manPosition >=
      getObjPosition(positionObject)[0] -
        getObjPosition(positionObject)[1] / 2 &&
    manPosition <
      getObjPosition(positionObject)[0] + getObjPosition(positionObject)[1] / 2
  ) {
    console.log("asda");
    countDistance = countDistance + 2;
    return true;
  } else {
    return false;
  }
}

// Создание диолога
function manDialog(text, obj) {
  setTimeout(() => {
    //Есть ли таргет в объекте
    if (isManInObject(obj) == true) {
      //Проверка что таргет находиться в объекте
      if (countDistance <= getObjPosition(obj)[1] - 2) {
        console.log("manDialog true");
        man.innerHTML = `<div class='man__hello'>${text}</div>`;
      }
      //Проверка что таргет не находиться в объекте
      if (countDistance >= getObjPosition(obj)[1] - 2) {
        console.log("manDialog false");
        man.innerHTML = "";
        countDistance = 0;
      }
    }
  }, 300);
}
