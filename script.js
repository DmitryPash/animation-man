const D = document;
const main = D.querySelector(".main");
const man = D.querySelector(".man");
const BODY = D.querySelector("body");
const sections = D.querySelectorAll(".section");
const dataInfo = D.querySelector('[data-info="true"]');

let modal;
//! Блокировка движения - доработать
let disableMan = false;
//! Флаг для блокировки текста
let disableText = false;
// Маркер для сравнения место нахождения
let positionX = 0;

const DATA = {
  0: "Дальше пути нету",
  1: null,
  2: null,
  3: `<button class='man-popup man-popup--welcome' onClick="openPopup('.popup--welcome')">Проверить документы</button>`,
  4: `<button class='man__dialog'>Тут я типо рассказываю какой-то текст! И пока он не закончит печатать, человече дальше не пойдет😉</button>`,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
  10: "Когда пройдет 60 секунд",
  11: "Это значит, что прошла минута",
};
let stepSpeed = 0;
//Позиция модельки заданная в свойсте left в css файле
let startposition = Number(getComputedStyle(man).left.replace(/\D/g, ""));
let manPosition = 0;
let moveBg = 0;
BODY.addEventListener("keydown", (key) => {
  if (dataInfo.dataset.info == "true") {
    console.log(dataInfo);
    dataInfo.dataset.info = false;
    disableMan = false;
    closePopup(".popup--info");
  }
  if (disableMan) return;

  stepSpeed += 10;

  if (stepSpeed >= 2) {
    if (
      key.key === "d" ||
      key.key == "D" ||
      key.key === "в" ||
      key.key == "В"
    ) {
      man.classList.remove("man-go--left");
      if (positionX > 97) {
        positionX = 0;
      } else {
        moveBg += 4;
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
        createBlock();
      }
    }
    if (
      key.key === "a" ||
      key.key == "A" ||
      key.key === "ф" ||
      key.key == "Ф"
    ) {
      man.classList.add("man-go--left");
      if (manPosition <= 0) {
        return;
      }
      if (positionX > 97) {
        positionX = 0;
      } else {
        moveBg -= 4;
        manPosition = startposition - -moveBg;
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
        createBlock();
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
function createBlock() {
  for (const [id, value] of Object.entries(DATA)) {
    //Ищем совпадение в обьекте с id где находиться таргет и ключем объекта
    if (id == getIdOfObject()) {
      // Проверяем есть ли значение
      if (value == null) {
        man.innerHTML = "";
      } else {
        man.innerHTML = value;
        if (id == 4) {
          writeText(".man__dialog");
        }
      }
    }
  }
}

//Закрытие поп-апа
function closePopup(popup) {
  disableMan = false;
  modal = document.querySelector(popup);
  modal.closest(".overlay").classList.remove("overlay--is-open");
  modal.classList.remove("popup--is-open");
}

//Открытие поп-апа
function openPopup(popup) {
  disableMan = true;
  modal = document.querySelector(popup);
  modal.closest(".overlay").classList.add("overlay--is-open");
  modal.classList.add("popup--is-open");
}

openPopup(".popup--info");

function writeText(classOf) {
  const manDialog = D.querySelector(classOf).innerHTML;
  if (!disableText) {
    disableMan = true;
    const dialog = D.querySelector(classOf);
    let writeText = "";
    let writeAnimation = (i, callback) => {
      setTimeout(() => {
        writeText += manDialog[i];
        dialog.innerHTML = writeText;

        if (i === manDialog.length - 1 && callback) {
          callback();
        }
      }, 50 * i);
    };

    for (let i = 0; i < manDialog.length; i++) {
      writeAnimation(i, () => {
        disableText = true;
        disableMan = false;
      });
    }
  } else {
    manDialog.innerHTML = writeText;
  }
}
