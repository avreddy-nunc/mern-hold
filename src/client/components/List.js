import React, {Component} from "react";
import axios from "axios";
import PlatformList from "./platformList";

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            list : [],
            page : 1,
            limit : 10,
            isLoading : false
        };
        this.loadPlatforms = this.loadPlatforms.bind(this)
    }
    componentDidMount(){
        this.loadPlatforms();
    }
    loadPlatforms(){
        const self = this;
        this.setState({
            isLoading : true
        });
        axios.get('/api/getPlatforms?page='+this.state.page+'&limit='+this.state.limit)
            .then(res=>{
                self.setState({
                    list : res.data,
                    isLoading : false
                })
            })
            .catch(err=>{
                self.setState({
                    isError : err.data,
                    isLoading : false
                })
            })
    }
    render(){
        return(
            <table className={'data-table'}>
                <thead>
                <tr className={'row'}>
                    <th className={'item'}>
                        File Name
                    </th>
                    <th className={'item'}>
                        Pie Chart
                    </th>
                    <th className={'item'}>
                        Water Stored
                    </th>
                </tr>
                </thead>
                <tbody>
                {this.state.list.map((listItem,index)=>{
                    return <PlatformList  key={index} data={listItem} />
                })}
                </tbody>
            </table>
        )
    }
}


export default List;