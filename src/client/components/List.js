import React, {Component} from "react";
import axios from "axios";
import PlatformList from "./platformList";

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            list : [
                {
                    "water": 32,
                    "height": 9,
                    "array": [
                        [
                            5,
                            5,
                            5,
                            5,
                            5
                        ],
                        [
                            9,
                            1,
                            1,
                            1,
                            5
                        ],
                        [
                            5,
                            1,
                            5,
                            1,
                            5
                        ],
                        [
                            5,
                            1,
                            1,
                            1,
                            5
                        ],
                        [
                            5,
                            5,
                            5,
                            5,
                            5
                        ]
                    ],
                    "storedCubes": [
                        [
                            1,
                            1
                        ],
                        [
                            1,
                            2
                        ],
                        [
                            1,
                            3
                        ],
                        [
                            2,
                            1
                        ],
                        [
                            2,
                            3
                        ],
                        [
                            3,
                            1
                        ],
                        [
                            3,
                            2
                        ],
                        [
                            3,
                            3
                        ],
                        [
                            1,
                            1
                        ],
                        [
                            1,
                            2
                        ],
                        [
                            1,
                            3
                        ],
                        [
                            2,
                            1
                        ],
                        [
                            2,
                            3
                        ],
                        [
                            3,
                            1
                        ],
                        [
                            3,
                            2
                        ],
                        [
                            3,
                            3
                        ],
                        [
                            1,
                            1
                        ],
                        [
                            1,
                            2
                        ],
                        [
                            1,
                            3
                        ],
                        [
                            2,
                            1
                        ],
                        [
                            2,
                            3
                        ],
                        [
                            3,
                            1
                        ],
                        [
                            3,
                            2
                        ],
                        [
                            3,
                            3
                        ],
                        [
                            1,
                            1
                        ],
                        [
                            1,
                            2
                        ],
                        [
                            1,
                            3
                        ],
                        [
                            2,
                            1
                        ],
                        [
                            2,
                            3
                        ],
                        [
                            3,
                            1
                        ],
                        [
                            3,
                            2
                        ],
                        [
                            3,
                            3
                        ]
                    ],
                    "_id": "5ca468c5265cf14ca0d22bee",
                    "__v": 0
                },
                {
                    "water": 4,
                    "height": 3,
                    "array": [
                        [
                            3,
                            3,
                            3,
                            3,
                            3,
                            3
                        ],
                        [
                            3,
                            3,
                            3,
                            1,
                            2,
                            3
                        ],
                        [
                            2,
                            3,
                            1,
                            3,
                            3,
                            1
                        ],
                        [
                            3,
                            1,
                            2,
                            3,
                            1,
                            3
                        ]
                    ],
                    "storedCubes": [
                        [
                            1,
                            3
                        ],
                        [
                            2,
                            2
                        ],
                        [
                            1,
                            3
                        ],
                        [
                            1,
                            4
                        ]
                    ],
                    "_id": "5ca487efcad6a051c0ea50c2",
                    "__v": 0
                },
                {
                    "water": 4,
                    "height": 3,
                    "array": [
                        [
                            3,
                            3,
                            3,
                            3,
                            3,
                            3
                        ],
                        [
                            3,
                            3,
                            3,
                            1,
                            2,
                            3
                        ],
                        [
                            2,
                            3,
                            1,
                            3,
                            3,
                            1
                        ],
                        [
                            3,
                            1,
                            2,
                            3,
                            1,
                            3
                        ]
                    ],
                    "storedCubes": [
                        [
                            1,
                            3
                        ],
                        [
                            2,
                            2
                        ],
                        [
                            1,
                            3
                        ],
                        [
                            1,
                            4
                        ]
                    ],
                    "_id": "5ca4993e759f262660f229c4",
                    "__v": 0
                }
            ],
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
            <div>
                {this.state.list.map((listItem,index)=>{
                    return <PlatformList  key={index} data={listItem} />
                })}
            </div>
        )
    }
}


export default List;