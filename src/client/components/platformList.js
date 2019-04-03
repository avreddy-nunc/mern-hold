import {Component} from "react";
import React from "react";
import PieChart from 'react-minimal-pie-chart';

class PlatformList extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        if(this.props.data) {
            var Point = Isomer.Point;
            var Path = Isomer.Path;
            var Shape = Isomer.Shape;
            var Vector = Isomer.Vector;
            var Color = Isomer.Color;
            var rows = this.props.data.array.length;
            var cols = this.props.data.array[0].length;

            var iso = new Isomer(document.getElementById(this.props.data._id));

            var red = new Color(160, 60, 50);
            var blue = new Color(50, 60, 160);

            for(var i=rows-1;i>=0;i--){
                for(var j=cols-1;j>=0;j--){
                    console.log(i,j,0,1,1,this.props.data.array[i][j]);
                    iso.add(Shape.Prism(Point(i, j, 0), 1, 1, this.props.data.array[i][j]), red);
                }
            }
            /*iso.add(Shape.Prism(Point(1, 0, 0), 1, 1, 3), red);
            iso.add(Shape.Prism(Point(0, 0, 0), 1, 1, 3), red);*/

            /*iso.add(Shape.Prism(Point(2, 0, 1)), blue);
            iso.add(Shape.Prism(Point(1, 1, 0), 1, 1, 1), red);
            iso.add(Shape.Prism(Point(1, 1, 1), 1, 1, 1), red);*/
        }
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
                    <canvas width={400} height={400} id={data._id}></canvas>
                    <div>total volume = {data.array.length * data.array[0].length * data.height}<br/>
                        water = {data.water}</div>
                </>
            )
        }
        return <div></div>
    }
}

export default PlatformList;