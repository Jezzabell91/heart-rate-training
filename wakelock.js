// Wake Lock https://web.dev/wake-lock/

let wakeLock = null 

if('wakeLock' in navigator) {
    //wake lock is supported

} 



// const releaseLock = () => {
//     wakeLock.release()
// }


const requestLock = async () => {
    try {
        wakeLock = await navigator.wakeLock.request()
        wakeLock.addEventListenere('release', () => console.log('Screen Wake Lock released:', wakeLock.released))

    } catch (err) {
        console.error(`${err.name}, ${err.message}`)
    }
}