// FROM https://www.youtube.com/watch?v=MCi6AZMkxcU&ab_channel=GoogleChromeDevelopers AND https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95    

let start

function animationInterval(ms, signal, callback) {

    start ||= document.timeline.currentTime
    // console.log('inside animationInterval')
    console.log('start', start)
    // console.log('signal', signal)

    function frame(time) {
      if (signal.aborted) return
      console.log('before callback', time)
      callback(time)
      console.log('after callback', time)
      scheduleFrame(time)
    }
  
    function scheduleFrame(time) {
        console.log('time, start in scheduleFrame', time, start)
      const elapsed = time - start
      console.log('elapsed', elapsed)
      const roundedElapsed = Math.round(elapsed / ms) * ms
      const targetNext = start + roundedElapsed + ms
      const delay = targetNext - performance.now()
      setTimeout(() => requestAnimationFrame(frame), delay)
    }
  
    scheduleFrame(start)
  }



// Usage

let controller = new AbortController()

let output = document.getElementById('stopwatch')

// Create an animation callback every second:
const onStart = () => {
    controller = new AbortController()
    console.log("onStart")
    startBtn.classList.add("hide")
    stopBtn.classList.remove("hide")
    resetBtn.classList.add("hide")
    animationInterval(1000, controller.signal, time => {
        console.log('inside callback')
  console.log('tick!', time)
})
}

// And to stop it:
const onStop = () => {
    start = document.timeline.currentTime
    startBtn.classList.remove("hide")
    stopBtn.classList.add("hide")
    resetBtn.classList.remove("hide")
    controller.abort()
    console.log(controller.signal)
}

const startBtn = document.getElementById('startBtn')
const stopBtn =  document.getElementById('stopBtn')
const resetBtn = document.getElementById('resetBtn')


startBtn.addEventListener('click', onStart)
stopBtn.addEventListener('click', onStop)