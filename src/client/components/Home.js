import React, {Component} from "react";
import Numpy from "./../helpers/numpyLoader";
import axios from "axios";
require('./../helpers/npyloader');

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            file : null
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
                        newArr[i][j] = nums[i+j];
                    }
                }
                console.log(newArr, shape);
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
                <input type={'file'} onChange={this.handleFileInputChange} name={'numpyFile'}/>
                <button onClick={this.submitFile}>Submit</button>
            </div>
        )
    }
}

export default Home;