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
                <tr className={'row'}>
                    <td>
                        {data.fileName}
                    </td>
                    <td className={'item'}>
                        <div style={{width:'150px',margin: 'auto'}}>
                        <PieChart data={piechatData}
                                  expandOnHover
                                  transitionDuration={'0.5s'}
                                  startAngle={-90} animate={true}/>
                        </div>
                        <div>
                            <p><span class="white-box"></span> Total volume = {data.array.length * data.array[0].length * data.height} Units<br/>
                                <span className={'black-box'}></span> Water = {data.water} Units ( {(data.water*100/(data.array.length * data.array[0].length * data.height)).toFixed(2)}% )</p>
                        </div>
                    </td>
                    <td style={{padding:'0'}}>
                    <PlatformStructure arr={data.array} id={data._id} storedArr={data.storedCubes} />
                    </td>

                </tr>
            )
        }
        return <div></div>
    }
}

export default PlatformList;