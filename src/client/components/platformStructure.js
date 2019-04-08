import React, {Component} from "react";
import * as THREE from "three";
import OrbitControls  from "three-orbitcontrols";
import textureImage from "./../helpers/uv_test_bw.png";

class PlatformStructure extends Component{
    constructor(props){
        super(props);
        this.state = {
            arr : this.props.arr,
            height : this.props.height,
            storedCubes : this.props.storedArr
        };
        this.containerRef = React.createRef();
        this.drawStructure = this.drawStructure.bind(this);
    }
    componentDidMount(){
        this.drawStructure();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            arr : nextProps.arr,
            height : nextProps.arr,
            storedCubes : nextProps.storedArr
        },()=>{
            this.drawStructure();
        })
    }
    drawStructure(){
        let container;
        let camera;
        let controls;
        let renderer;
        let scene;
        let mesh;
        var self = this;
        var textureLoaded = false;
        function init() {
            container = self.containerRef.current;
            container.innerHTML = '';
            scene = new THREE.Scene();
            scene.background =  new THREE.Color(0x8fbcd4);

            createCamera();
            createControls();
            createLights();
            createMeshes();
            createRenderer();
            update();
            render();

            // start the animation loop
            renderer.setAnimationLoop(() => {
                update();
                render();
            });
        }

        function createCamera() {
            camera = new THREE.PerspectiveCamera(
                70, // FOV
                container.clientWidth / container.clientHeight, // aspect
                0.1, // near clipping plane
                100 // far clipping plane
            );

            camera.position.set(-4, 4, 10);
        }

        function createControls() {
            controls = new OrbitControls(camera, container);
        }

        function createLights() {
            const ambientLight = new THREE.HemisphereLight(
                0xddeeff, // sky color
                0x202020, // ground color
                5 // intensity
            );

            const mainLight = new THREE.DirectionalLight(0xffffff, 5);
            mainLight.position.set(10, 10, 10);

            scene.add(ambientLight, mainLight);
        }
        var material;
        function createMeshes() {
            const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
            var textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load(textureImage,function () {
                render();
            });

            texture.encoding = THREE.sRGBEncoding;
            texture.anisotropy = 16;

            const material = new THREE.MeshStandardMaterial({
                map: texture,
                transparent : true
            });
            var xoffset = self.state.arr.length/2;
            var yoffset = self.state.arr[0].length/2;
            var zoffset = self.state.height/2;
            for(var i=0;i<self.state.arr.length;i++){
                for(var j=0;j<self.state.arr[0].length;j++){
                    for(var k=0;k<self.state.arr[i][j];k++){
                        mesh = new THREE.Mesh(geometry, material);
                        mesh.position.set(i-xoffset,k,j-yoffset);
                        scene.add(mesh);
                    }
                }
            }
            const waterMaterial = new THREE.MeshBasicMaterial({
                color : 0x0077be
            });
           //console.log(self.state.storedCubes);
            for(var w=0;w<self.state.storedCubes.length;w++){
                mesh = new THREE.Mesh(geometry, waterMaterial);
                mesh.position.set(self.state.storedCubes[w][0]-xoffset,self.state.storedCubes[w][2],self.state.storedCubes[w][1]-yoffset);
                scene.add(mesh);
            }
        }

        function createRenderer() {
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(container.clientWidth, container.clientHeight);

            renderer.setPixelRatio(window.devicePixelRatio);

            renderer.gammaFactor = 2.2;
            renderer.gammaOutput = true;

            renderer.physicallyCorrectLights = true;

            container.appendChild(renderer.domElement);
        }

// perform any updates to the scene, called once per frame
// avoid heavy computation here
        function update() {
            // Don't delete this function!
        }

// render, or 'draw a still image', of the scene
        function render() {
            renderer.render(scene, camera);
        }

// call the init function to set everything up
        init();
    }
    render(){
        return (
            <div ref={this.containerRef} id={this.props.id} style={{width:400,height:400}}>
            </div>
        )
    }
}

export default PlatformStructure;