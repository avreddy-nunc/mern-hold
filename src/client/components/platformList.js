import {Component} from "react";
import React from "react";
import PieChart from 'react-minimal-pie-chart';
import PlatformStructure from "./platformStructure"

class PlatformList extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        const data = this.props.data;
        if(data) {
            const piechatData = [{title : "Water Stored",value : data.water, color:"#000000"},
                {title : "",value : (data.array.length * data.array[0].length * data.height) - data.water, color: "#e9e9e9"}];
            return (
                <>
                    <div style={{width:'150px'}}>
                    <PieChart data={piechatData} expandOnHover transitionDuration={'0.5s'} startAngle={-90}/>
                    </div>
                    <PlatformStructure arr={data.array} id={data._id} />
                    <div>total volume = {data.array.length * data.array[0].length * data.height}<br/>
                        water = {data.water}</div>
                </>
            )
        }
        return <div></div>
    }
}

export default PlatformList;