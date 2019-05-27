// import console = require("console");
import {sendData} from './Connection'

export class Scanner {
    
    constructor({address,port,interval=5}){
        this.address = address,
        this.port = port
        this.interval = interval * 1000
        this.timer = null
        this.data = []
    }
    
    get getInterval(){
        return this.interval
    }
    get scanStatus(){
        if (this.timer){
            return true
        }else{
            return false
        }
    }

    pollScanData = () => {
        //Should we take an argument of something to do with the new data?
        this.data = [...this.data, this.data.length] //Just add an incrementing value
        console.log(`Getting data from ${this.address}:${this.port}.   ${this.data.length}...`)
        sendData({address: this.address,port: this.port},'id ?\r')
    }
    startScan() {
        console.log("Starting scan...")
        this.timer = setInterval(this.pollScanData,this.getInterval)
    }
    stopScan(){
        if (this.getInterval) {
            console.log("Stopping the scan")
            clearInterval(this.timer)
            this.timer = null
            return true
        }else{
            return false
        }
    }
}