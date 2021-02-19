// // FROM https://www.youtube.com/watch?v=MCi6AZMkxcU&ab_channel=GoogleChromeDevelopers AND https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95    

const startBtn = document.getElementById('startBtn')
const stopBtn =  document.getElementById('stopBtn')
const resetBtn =  document.getElementById('resetBtn')
let output = document.getElementById('stopwatch')
let controller = new AbortController()


function animationInterval(ms, signal, callback) {
    const start = document.timeline.currentTime
  
    function frame(time) {
      if (signal.aborted) return
      callback(time)
      scheduleFrame(time)
    }
  
    function scheduleFrame(time) {
      const elapsed = time - start
      const roundedElapsed = Math.round(elapsed / ms) * ms
      setOutput(roundedElapsed)
      const targetNext = start + roundedElapsed + ms
      const delay = targetNext - performance.now()
      setTimeout(() => requestAnimationFrame(frame), delay)
    }
  
    
    function setOutput(ms) {
        output.innerHTML = new Date(ms).toISOString().slice(11, -5)
    }

    scheduleFrame(start)
  }


const onStart = () => {
    toggleButtons()
    controller = new AbortController()

    animationInterval(1000, controller.signal, time => {
        console.log('tick!', time)
      })
}


const onStop = () => {
  toggleButtons()
    controller.abort()
    console.log("stop")
}

const onReset = () => {
  toggleButtons()
  output.innerHTML = "00:00:00"
}

const toggleButtons = () => {
    if (startBtn.classList.contains('hide') && stopBtn.classList.contains('hide')){
      resetBtn.classList.add("hide")
      startBtn.classList.remove("hide")
    } else if (startBtn.classList.contains('hide') && resetBtn.classList.contains('hide')){
      stopBtn.classList.add("hide")
      resetBtn.classList.remove("hide")
    } else if (stopBtn.classList.contains('hide') && resetBtn.classList.contains('hide')){
      startBtn.classList.add("hide")
      stopBtn.classList.remove("hide")
    }
}

startBtn.addEventListener('click', onStart)
stopBtn.addEventListener('click', onStop)
resetBtn.addEventListener('click', onReset)



