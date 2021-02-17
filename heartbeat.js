
//Heart Beat

// variable for bluetooth device
let device

// html elements
const heartbeat = document.getElementById('heartbeat')
const heart = document.getElementById('heart')
const connectBtn = document.getElementById('connectBtn')
const disconnectBtn = document.getElementById('disconnectBtn')

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

    connectBtn.classList.add('hide')
    disconnectBtn.classList.remove('hide')

    return char
}

// Connect to heart rate monitor
connectBtn.addEventListener('click', () => {

    console.log('Connecting to bluetooth device')

    connect({
        onChange: e => {
            const val = e.target.value.getInt8(1)
            heartbeat.innerText = val ? val : ''

            // pulse the heart image when heartbeat changes 
            if (heart.classList.contains('pulse')){
                heart.classList.remove('pulse')
            } else {
                heart.classList.add('pulse')
            }
            console.log(val)

        }
    }).then(() => {
            console.log('Device connected')
            document.body.classList.add('connected')
        })
})


// Disconnect from heart rate monitor
disconnectBtn.addEventListener('click', () => {

    console.log('Disconnecting from bluetooth device')
    device.gatt.disconnect()
    console.log('Device disconnected')

    // Reset heart beat
    heartbeat.innerText = ''
    document.body.classList.remove('connected')
    heart.classList.remove('pulse')

    // swap visibility of connection buttons
    connectBtn.classList.remove('hide')
    disconnectBtn.classList.add('hide')
})
