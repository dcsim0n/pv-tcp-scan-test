import React, {Component} from 'react'
import {sendData} from './Connection'

export function withScanner ({address,port,interval=1},ComponentToWrap){
    return class Scanner extends Component {
        
        constructor(){
            super()
            this.address = address,
            this.port = port
            this.interval = interval * 1000
            this.timer = null
            this.state = {
                data: []
            }
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
            const {data} = this.state
            //Should we take an argument of something to do with the new data?
            // this.data = [...this.data, this.data.length] //Just add an incrementing value
            this.setState({
                data: [...data, data.length]
            })
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
        render(){
            return (<ComponentToWrap 
                    data={this.state.data}
                    startScan={()=>this.startScan()}
                    stopScan={()=>this.stopScan()}
                    scanStatus={this.scanStatus} >
                        {/* Passing our data down here */}
                    </ComponentToWrap>)
        }
    }
}