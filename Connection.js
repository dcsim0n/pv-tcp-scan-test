
const net = require('react-native-tcp')
const encoding = 'utf8'

export const sendData = ({address,port},data)=>{
        const client = net.createConnection(port,address)
        client.setEncoding(encoding)
        client.write(data)

        client.on('data',(data)=>{
            console.log(`Recieved Data: ${data}`)
            client.destroy()
        })
    }
