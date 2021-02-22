// Timer 

let output = document.getElementById('stopwatch')


let ms = 0
let sec = 0
let min = 0
let hour = 0

const timer = () => {
    ms++
    if(ms >= 100){
        sec++
        ms = 0

    }
    if(sec === 60){
        min++
        sec = 0
    }
    if(min === 60){
        hour++
        ms = 0
        sec = 0
        min = 0
    }
    if(hour === 100){
        reset()
    }

    //Doing some string interpolation
    // let milli = ms < 10 ? `0`+ ms : ms
    let seconds = sec < 10 ? `0${sec}`: sec
    let minutes = min < 10 ? `0${min}`: min
    let hours = hour < 10 ? `0${hour}`: hour


    // let timer= `${minute}:${seconds}:${milli}`
    let timer= `${hours}:${minutes}:${seconds}`
    output.innerHTML = timer
}

//Start timer
// TODO: Bug - clicking start multiple times makes it go faster
// Every 10ms run timer function 
const start = () => {
    time = setInterval(timer,10)
    startBtn.classList.add("hidden")
    stopBtn.classList.remove("hidden")
    resetBtn.classList.add("hidden")
}


//stop timer
const stop = () => {
    clearInterval(time)
    startBtn.classList.remove("hidden")
    stopBtn.classList.add("hidden")
    resetBtn.classList.remove("hidden")
}

//reset timer
const reset = () => {
    ms = 0
    sec = 0
    min = 0
    hour = 0

    output.innerHTML = `00:00:00`
    // output.innerHTML = `00:00`
    resetBtn.classList.add("hidden")
}


const startBtn = document.getElementById('startBtn')
const stopBtn =  document.getElementById('stopBtn')
const resetBtn = document.getElementById('resetBtn')

startBtn.addEventListener('click', start)
stopBtn.addEventListener('click', stop)
resetBtn.addEventListener('click', reset)