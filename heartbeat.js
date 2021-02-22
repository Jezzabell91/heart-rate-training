
//Heart Beat

// variable for bluetooth device
let device

// html elements
const heartbeat = document.getElementById('heartbeat')
const heart = document.getElementById('heart')
// const heart_dark = document.getElementById('heart_dark')
const connectBtn = document.getElementById('connectBtn')
const disconnectBtn = document.getElementById('disconnectBtn')


const low_bound = document.getElementById('low_bound')
const high_bound = document.getElementById('high_bound')
// Set Target Zone Boundaries
const LOW = 115
const HIGH = 145

low_bound.innerHTML = LOW 
high_bound.innerHTML = HIGH


// Method to connect to bluetooth device 
const connect = async props => {
    device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [0x180d] }],
        acceptAllDevices: false,
    })

    const server = await device.gatt.connect()
    const service = await server.getPrimaryService(0x180D)
    const char = await service.getCharacteristic(0x2A37)

    char.oncharacteristicvaluechanged = props.onChange
    char.startNotifications()

    connectBtn.classList.add('hidden')
    disconnectBtn.classList.remove('hidden')

    return char
}

// Connect to heart rate monitor
connectBtn.addEventListener('click', () => {

    console.log('Connecting to bluetooth device')

    connect({
        onChange: e => {
            const val = e.target.value.getInt8(1)
            heartbeat.innerText = val ? val : ''

            heart.classList.toggle('text-red-600')
            heart.classList.toggle('text-red-700')

            console.log(val)

        }
    }).then(() => {
            console.log('Device connected')
            document.body.classList.remove('bg-blue-100')
            document.body.classList.add('bg-green-100')
        })
})


// Disconnect from heart rate monitor
disconnectBtn.addEventListener('click', () => {

    // heart_dark.classList.add('hidden')
    // heart.classList.remove('hidden')
    console.log('Disconnecting from bluetooth device')
    device.gatt.disconnect()
    console.log('Device disconnected')

    // Reset heart beat
    heartbeat.innerText = ''
    document.body.classList.remove('connected')
    heart.classList.remove('hidden')

    // swap visibility of connection buttons
    connectBtn.classList.remove('hidden')
    disconnectBtn.classList.add('hidden')
})
