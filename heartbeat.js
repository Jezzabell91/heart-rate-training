
//Heart Beat

const connect = async props => {
    const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [0x180d] }],
        acceptAllDevices: false,
    })

    const server = await device.gatt.connect()
    const service = await server.getPrimaryService(0x180D)
    const char = await service.getCharacteristic(0x2A37)

    char.oncharacteristicvaluechanged = props.onChange
    char.startNotifications()
    return char
}

// connect({
//     onChange: e => {
//         const val = e.target.value.getInt8(1)
//         // heartbeat.innerText = value ? value : ''
//         console.log(val)

//     }
// })

let heartbeat = document.getElementById('heartbeat')

document.getElementById('connect')
.addEventListener('click', () => {
    connect({
        onChange: e => {
            const val = e.target.value.getInt8(1)
            heartbeat.innerText = val ? val : ''
            // console.log(val)

        }
    }).then(() => {
            document.body.classList.add('connected')
        })
})
