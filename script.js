const D = document;
const main = D.querySelector(".main");
const man = D.querySelector(".man");
const BODY = D.querySelector("body");
const sections = D.querySelectorAll(".section");
// Маркер для сравнения место нахождения
let positionX = 0;
const DATA = {
  0: null,
  1: null,
  2: "Меня зовут @name",
  3: null,
  4: "Пошли со мной и я расскажу тебе свою историю",
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
  10: "Когда продет 60 секунд",
  11: "Это значит, что прошла минута",
};
let stepSpeed = 0;
//Позиция модельки заданная в свойсте left в css файле
let startposition = Number(getComputedStyle(man).left.replace(/\D/g, ""));
let manPosition = 0;
let moveBg = 0;
BODY.addEventListener("keydown", (key) => {
  stepSpeed += 1;
  moveBg += 4;
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
        manDialog(getIdOfObject());
      }
    }
    stepSpeed = 0;
  }
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

// Получаем id блока в которм таргет
function getIdOfObject() {
  const idObject = D.querySelectorAll(".section-col");

  for (let i = 0; i < idObject.length; i++) {
    if (
      manPosition > idObject[i].offsetLeft &&
      manPosition < idObject[i + 1].offsetLeft
    ) {
      return idObject[i].dataset.object;
    }
  }
}

// Создание диолога
function manDialog(objId) {
  for (const [id, value] of Object.entries(DATA)) {
    //Ищем совпадение в обьекте с id где назодиться таргет и ключем объекта
    if (id == objId) {
      // Проверяем есть ли значение
      if (value == null) {
        man.innerHTML = "";
      } else {
        man.innerHTML = `<div class='man__hello'>${value}</div>`;
      }
    }
  }
}
