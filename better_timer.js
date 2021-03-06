// // FROM https://www.youtube.com/watch?v=MCi6AZMkxcU&ab_channel=GoogleChromeDevelopers AND https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95    

// Wake Lock https://web.dev/wake-lock/

let wakeLock = null 


// Request on timer start  
const requestLock = async () => {
    try {
        wakeLock = await navigator.wakeLock.request('screen')
        console.log('Screen Wake Lock', wakeLock)
        wakeLock.addEventListener('release', () => console.log('Screen Wake Lock released:', wakeLock))
    } catch (err) {
        console.error(`${err.name}, ${err.message}`)
    }
}

// Released on timer reset  
const releaseLock = () => {
  if (wakeLock !== null) {
    wakeLock.release()
  }
}


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
        timer = new Date(ms).toISOString().slice(11, -5)
        if (timer.charAt(0) == 0 && timer.charAt(1) == 0){
        output.innerHTML = timer.slice(3)
        } else {
          output.innerHTML = timer
        }
    }

    scheduleFrame(start)
  }


const onStart = () => {
    toggleButtons()
    controller = new AbortController()

    //Wake Lock request
    requestLock()

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
  //Wake Lock release 
  releaseLock()
  toggleButtons()
  output.innerHTML = "00:00:00"
}

const toggleButtons = () => {
    if (startBtn.classList.contains('hidden') && stopBtn.classList.contains('hidden')){
      resetBtn.classList.add("hidden")
      startBtn.classList.remove("hidden")
    } else if (startBtn.classList.contains('hidden') && resetBtn.classList.contains('hidden')){
      stopBtn.classList.add("hidden")
      resetBtn.classList.remove("hidden")
    } else if (stopBtn.classList.contains('hidden') && resetBtn.classList.contains('hidden')){
      startBtn.classList.add("hidden")
      stopBtn.classList.remove("hidden")
    }
}

startBtn.addEventListener('click', onStart)
stopBtn.addEventListener('click', onStop)
resetBtn.addEventListener('click', onReset)


