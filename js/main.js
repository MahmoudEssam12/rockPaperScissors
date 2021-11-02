// importing all the icons putting them all in array
//adding click event on the icons 
// comparing what the player clicked with a random choice with if statment

const icons = document.querySelectorAll('[data-choice]')
const computerOptions = ['rock', 'paper', 'scissors']
const scoreCard = document.querySelector('#score')
const triangle = document.querySelector('.triangle')
const spanState = document.querySelector('#state')
const resetBtn = document.querySelector('#tryAgain')
const iconsWrapper = document.querySelector('#iconsWrap')
let score = 0;
let state = '';
let onDraw = false;


function clicked() {
    const choice = this.dataset.choice;
    const botChoice = computerOptions[Math.floor(Math.random() * 3)];

    rules(choice, botChoice);

    // user's choice animation
    gsap.to(this, {
        y: 50,
        scale: 1.2,
        'top': '-40px',
        'left': '70px',
        'bottom': 'unset',
        duration: 0.6
    })

    gsap.to('.triangle', {
        opacity: 0,
        duration: 0.6
    })
    gsap.to('.icon-title', {
        y: -75,
        opacity: 1,
        duration: 0.6
    })

    icons.forEach(icon => {

        // if the same icon doesn't match "this" icon i have clicked
        // and doesn't match the botChoice either do those gsap animations
        if (icon !== this) {
            if (icon !== botChoice) {

                gsap.to(icon, {
                    opacity: 0,
                    duration: 0.6
                })
            }
            if (icon.dataset.choice == botChoice) {
                setTimeout(() => {
                    gsap.to(icon, {
                        opacity: 1,
                        scale: 1.2,
                        'top': '10px',
                        'right': '70px',
                        'bottom': 'unset',
                        'left': 'unset',
                        duration: 0.6
                    })
                }, 1000)

            }
        }
        // if draw happend clone the icon and add to it a className
        if (icon == this && this.dataset.choice == botChoice) {
            setTimeout(() => {
                const cloneMatch = this.cloneNode()
                cloneMatch.classList.add('cloned')
                cloneMatch.setAttribute('id', 'tiedUp')
                iconsWrapper.appendChild(cloneMatch)
                gsap.to('#tiedUp', {
                    scale: 1.2,
                    'top': '10px',
                    'right': '70px',
                    'bottom': 'unset',
                    'left': 'unset',
                    duration: 0.6
                })
                onDraw = true
            }, 1000)

        }
    })

    gsap.to('#tryAgain', {
        visibility: 'visible',
        opacity: 1,
        duration: 1
    })
    spanState.innerText = state

    setTimeout(() => {
        gsap.to(spanState, {
            visibility: 'visible',
            opacity: 1,
            duration: 1
        })
    }, 1000)
    setTimeout(() => {
        scoreCard.innerText = score
    }, 1000)
    // winner animation
    if (state == 'You Win') {
        setTimeout(() => {
            this.classList.add('winner')
        }, 1000)
    }


    // if (this.dataset.choice == botChoice) {
    //     setTimeout(function () {
    //         // iconsWrapper.innerHTML += `<img src="./images/icon-${botChoice}.svg" id="cloneDiv" class="icon scissors">`
    //         // console.log(document.querySelector("#cloneDiv"))
    //         const test = this.cloneNode(true)
    //         console.log(test)
    //         onDraw = true
    //     }, 2000)

    // }

}

// activating try again button
function tryAgain() {
    console.log('clicked')
    state = ''
    gsap.to(spanState, {
        clearProps: 'all'
    })
    gsap.to('#tryAgain', {
        clearProps: 'all'
    })
    gsap.to('.triangle', {
        clearProps: 'all'
    })
    gsap.to('.icon-title', {
        clearProps: 'all'
    })
    icons.forEach(icon => {
        icon.classList.contains('winner') ? icon.classList.remove('winner') : null
        gsap.to(icon, {
            clearProps: 'all'
        })
    })

    if (onDraw) {
        document.querySelector('.cloned').remove();
        onDraw = false
    }

}

for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener('click', clicked)
}

function rules(playerChoice, botChoice) {
    if (playerChoice == botChoice) {
        state = 'draw'
    } else if (playerChoice == 'paper') {
        if (botChoice == 'rock') {
            state = 'You Win'
            score++
        } else {
            state = 'You Lose'
            score--
        }
    } else if (playerChoice == 'scissors') {
        if (botChoice == 'rock') {
            state = 'You Lose'
            score--
        } else {
            state = 'You Win'
            score++
        }
    } else if (playerChoice == 'rock') {
        if (botChoice == 'paper') {
            state = 'You Lose'
            score--
        } else {
            state = 'You Win'
            score++
        }
    }
}

