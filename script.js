// fetch('https://jsonplaceholder.typicode.com/users')

//   .then((responce) => responce.json())
//   .then((data) => {
//     // usersAdd(data)
//     console.log(data.map((user) => user.email))
//   })

// const usersAdd = (users) => {
//   users.forEach((user) => {
//     let newuser = document.createElement('h1')
//     newuser.innerText = user.email
//     document.body.appendChild(newuser)
//   })
// }

const url = 'https://jsonplaceholder.typicode.com/comments?postId=1'

const getComments = async () => {
  let responce = await fetch(url)
  let data = await responce.json()
  console.log('inside fn')
  // console.log(data.map((e) => e.body))
}

console.log('bfr fn')
//get to another process and waiting there (async)
getComments()
console.log('aft fn')

//so this not waiting as fetch is async
console.log('bfr fetch')
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log('inside fetch')
    data.forEach((comment) => {
      let post = document.createElement('div')
      post.style.margin = '20px 0px'
      post.style.fontSize = '1.2rem'
      post.innerText = comment.body
      //document.body.appendChild(post)
    })
  })
console.log('aft fetch')
//basically same

////////////////coffee maker stuff ///////////////

const card = document.querySelector('.card-coffee')
const obsticle = document.querySelector('.obsticle')
const cardPopup = document.querySelector('.card-popup')
const cardPopupText = document.querySelector('.card-popup-text')
const cardText = document.querySelector('.card-text')
const spinner = document.querySelector('.card-spinner')
const progressBar = document.querySelector('.card-progress-bar')

const timer = (ms) => new Promise((res) => setTimeout(res, ms))
//super cool method

//fake coffee dispencing stuff, irl will be "fetch" to actual hardware and real timer
//returns done dispensing after some duration (actual progress bar)

const makeEspresso = () => {
  return new Promise((res, rej) => {
    coffee = 1
    if (coffee == 1) {
      // displayMessage('espresso_maker_1')
      setTimeout(() => {
        //here instead of timeout will be real coffee dispencing logic'
        res('espresso done')
      }, 5000)
    } else {
      rej('no coffee mate')
    }
  })
}

const milk = (duration) => {
  return new Promise((res, rej) => {
    // displayMessage('milk_motor_on')
    setTimeout(() => {
      res('milk done')
    }, duration * 1000)
  })
}

const foam = (duration) => {
  return new Promise((res, rej) => {
    // displayMessage('foam_motor_on')
    //turnMotorOn
    setTimeout(() => {
      //turnMotorOff
      res('foam done')
    }, duration * 1000)
  })
}

const displayMessage = (message = 'placeholder') => {
  cardPopup.style.transform = 'scaleX(1)'
  cardPopup.style.transformOrigin = 'right'
  cardPopupText.style.opacity = 1
  cardPopupText.innerText = message
  setTimeout(() => {
    cardPopup.style.transformOrigin = 'left'
    cardPopupText.style.opacity = 0
    cardPopup.style.transform = 'scaleX(0)'
  }, 1000)
}

const cappucino = async (el) => {
  const card = el.target
  card.style.transition = 'background-position-y 11s linear'
  card.style.backgroundPositionY = '100%'
  lightSwitch()
  card.removeEventListener('click', cappucino)
  cardText.innerText = ' cappucino\n preparing'
  //progress bar is very optional
  //load spinenr
  spinner.style.opacity = 1

  // dispence milk
  await milk(2).then((result) => {
    displayMessage(result)
    progressBar.innerText = '__'
  })

  // dispence foam
  await foam(2).then((result) => {
    displayMessage(result)
    progressBar.innerText = '____'
  })
  //dispence coffee
  await makeEspresso()
    .then((result) => {
      displayMessage(result)
      progressBar.innerText = '________'
      spinner.style.opacity = 0
      cardText.innerText = 'Enjoy!'

      //reset to initial position after 2 sec (safety delay)
      setTimeout(() => {
        //unlock click again
        card.addEventListener('click', cappucino)
        //undim the screen
        lightSwitch()
        //slides image back on top
        card.style.transition = 'background-position-y 0.5s linear'
        card.style.backgroundPositionY = '0%'
        cardText.innerText = 'Cappucino'
        progressBar.innerText = ''
      }, 2000)
    })
    .catch((e) => {
      displayMessage(e)
      cardText.innerText = 'ERROR'
      progressBar.innerText = ''
      //working on it
    })
}

const lightSwitch = () => {
  obsticle.classList.toggle('visible')
}

card.addEventListener('click', cappucino)
