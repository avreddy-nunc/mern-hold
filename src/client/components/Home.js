import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import PlatformList from "./platformList";

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            file : null,
            responseData : {
                "_id": {
                    "$oid": "5ca90f82647024348897799e"
                },
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
                        1,
                        2
                    ],
                    [
                        1,
                        2,
                        2
                    ],
                    [
                        1,
                        3,
                        2
                    ],
                    [
                        2,
                        1,
                        2
                    ],
                    [
                        2,
                        3,
                        2
                    ],
                    [
                        3,
                        1,
                        2
                    ],
                    [
                        3,
                        2,
                        2
                    ],
                    [
                        3,
                        3,
                        2
                    ],
                    [
                        1,
                        1,
                        3
                    ],
                    [
                        1,
                        2,
                        3
                    ],
                    [
                        1,
                        3,
                        3
                    ],
                    [
                        2,
                        1,
                        3
                    ],
                    [
                        2,
                        3,
                        3
                    ],
                    [
                        3,
                        1,
                        3
                    ],
                    [
                        3,
                        2,
                        3
                    ],
                    [
                        3,
                        3,
                        3
                    ],
                    [
                        1,
                        1,
                        4
                    ],
                    [
                        1,
                        2,
                        4
                    ],
                    [
                        1,
                        3,
                        4
                    ],
                    [
                        2,
                        1,
                        4
                    ],
                    [
                        2,
                        3,
                        4
                    ],
                    [
                        3,
                        1,
                        4
                    ],
                    [
                        3,
                        2,
                        4
                    ],
                    [
                        3,
                        3,
                        4
                    ],
                    [
                        1,
                        1,
                        5
                    ],
                    [
                        1,
                        2,
                        5
                    ],
                    [
                        1,
                        3,
                        5
                    ],
                    [
                        2,
                        1,
                        5
                    ],
                    [
                        2,
                        3,
                        5
                    ],
                    [
                        3,
                        1,
                        5
                    ],
                    [
                        3,
                        2,
                        5
                    ],
                    [
                        3,
                        3,
                        5
                    ]
                ],
                "fileName": "data.npy",
                "__v": 0
            },
            isLoading : false
        };
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.submitFile = this.submitFile.bind(this);
        this._parseBytes = this._parseBytes.bind(this);
    }
    handleFileInputChange(e){
        this.setState({
            file : e.target.files[0]
        })
    }
    _parseBytes(a) {
        /*
        Parses an array of bytes, assuming that the n-1th byte is 2^0s, the
        n-2th is 2^8, etc.
        Arguments:
            a (array): An array of integers, in faux-base-256. For instance,
                [100] => 100; [1, 0] => 256. [256] is an invalid input.
        Returns:
            Integer
        */
        let result = 0;
        for (var i = 0; i < a.length; i++) {
            result += a[i] * Math.pow(256, i);
        }
        return result;
    }
    submitFile(){
        var content = new Blob([this.state.file]);
        var reader = new FileReader();
        var self = this;
        this.setState({
            isLoading : true
        });
        reader.addEventListener("loadend", function() {
            var res = reader.result;
            var headerLength = res.indexOf("}") + 1;
            var header = JSON.parse(
                res.slice(10, headerLength)
                    .replace(/\'/g, '"')
                    .replace("False", "false")
                    .replace("(", "[")
                    .replace(/,*\),*/g, "]")
            );
            var shape = header.shape;
            //G.header = header;

            var array = (
                (res.slice(headerLength))
                    .split("")
            ).map(i => i.charCodeAt(0));

            while (array[0] === 32) {
                array = array.slice(1);
            }
            array = array.slice(1);

            //G.array = array;
            var nums = [];
            for (var i = 8; i < array.length + 8; i += 8) {
                nums.push(self._parseBytes(array.slice(i - 8, i)));
            }
            //G.nums = nums;

            // Perform reshape.
            var newArr = [];
            for(var i=0;i<shape[0];i++){
                newArr[i] = [];
                for(var j=0;j<shape[1];j++){
                    newArr[i][j] = nums[(i*shape[0])+j];
                }
            }
            console.log(nums,newArr, shape);
            axios.post('/api/savePlatform',{"platformArr":newArr,"fileName":self.state.file.name})
                .then(res=>{
                    console.log(res);
                    self.setState({
                        responseData : res.data,
                        isLoading : false
                    })
                })
                .catch(err=>{
                    self.setState({
                        isError : err.data,
                        isLoading : false
                    })
                });
        });
        reader.readAsBinaryString(content);
        /*Numpy.open(this.state.file, (arr)=>{
            //console.log(arr);
            axios.post('/api/savePlatform',{"platformArr":arr})
                .then(res=>{
                    window.alert(res);
                    console.log(res);
                })
                .catch(err=>{
                    window.alert(err)
                });
        })*/
    }
    render(){
        return(
            <div>
                <div className={'file-upload-segment'}>
                    <Button variant={"contained"} color={"primary"} component={'label'} htmlFor={'chooseFile'}>Choose</Button>
                    <input type={'file'} id={'chooseFile'} style={{display:'none'}} onChange={this.handleFileInputChange} name={'numpyFile'}/>
                    <div className={'file-name'}><p>{this.state.file?this.state.file.name:'Add a file'}</p></div>
                    <Button variant={"contained"} color={"secondary"} onClick={this.submitFile}>Submit</Button>
                </div>
                {this.state.isLoading?<div>Loading</div>:
                    <table className={'data-table'}>
                        <thead>
                        <tr className={'row'}>
                            <th className={'item'}>
                                File Name
                            </th>
                            <th className={'item'}>
                                Pir Chart
                            </th>
                            <th className={'item'}>
                                Water Platform
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <PlatformList data={this.state.responseData} />
                        </tbody>
                    </table>}
            </div>
        )
    }
}

export default Home;