const D = document;

const man = D.querySelector('.man')
const BODY = D.querySelector('body')
const background = D.querySelector('.background')
let positionX = 0;
let stepSpeed = 0;
let moveBg = 0;
BODY.addEventListener('keydown', (key) => {
    stepSpeed++
    moveBg = moveBg + 2
    if(stepSpeed >= 2) {
        if(key.key === 'd' || key.key == 'D') {
            if(positionX > 97) {
                positionX = 0
            } else {
                console.log(stepSpeed)
                positionX = positionX + 14.2
                man.style.backgroundPositionX = `${positionX}%`
                man.style.backgroundPositionY = 0
                background.style.backgroundPositionX = `-${moveBg}px`
            }
        }
        stepSpeed = 0
    }
})

BODY.addEventListener('keyup', () => {
    man.style.backgroundPositionX = `${42.6}%`
    man.style.backgroundPositionY = `${100}%`
    stepSpeed = 0
})

