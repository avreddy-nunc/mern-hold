import React, {Component} from "react";
import * as THREE from "three";
import OrbitControls  from "three-orbitcontrols";
import textureImage from "./../helpers/uv_test_bw.png";

class PlatformStructure extends Component{
    constructor(props){
        super(props);
        this.containerRef = React.createRef();
    }
    componentDidMount(){
        let container;
        let camera;
        let controls;
        let renderer;
        let scene;
        let mesh;
        var self = this;
        var textureLoaded = false;
        function init() {
            container = document.getElementById(self.props.id);

            scene = new THREE.Scene();
            scene.background =  new THREE.Color(0x8fbcd4);

            createCamera();
            createControls();
            createLights();
            createMeshes();
            createRenderer();

            // start the animation loop
            renderer.setAnimationLoop(() => {
                update();
                render();
            });
        }

        function createCamera() {
            camera = new THREE.PerspectiveCamera(
                20, // FOV
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
            console.log(textureImage);
            /*textureLoader.load(
                // resource URL
                textureImage,
                // Function when resource is loaded
                function ( texture ) {
                    // do something with the texture
                    texture.encoding = THREE.sRGBEncoding;
                    texture.anisotropy = 16;
                    material = new THREE.MeshBasicMaterial( {
                        map: texture
                    } );
                },
                // Function called when download progresses
                function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                // Function called when download errors
                function ( xhr ) {
                    console.log( 'An error happened' );
                }
            );*/
            const texture = textureLoader.load(textureImage,function () {
                render();
            });

            texture.encoding = THREE.sRGBEncoding;
            texture.anisotropy = 16;

            const material = new THREE.MeshStandardMaterial({
                map: texture
            });
            var xoffset = self.props.arr.length/2;
            var yoffset = self.props.arr[0].length/2;
            for(var i=0;i<self.props.arr.length;i++){
                for(var j=0;j<self.props.arr[0].length;j++){
                    for(var k=0;k<self.props.arr[i][j];k++){
                        mesh = new THREE.Mesh(geometry, material);
                        mesh.position.set(i-xoffset,k,j-yoffset);
                        scene.add(mesh);
                    }
                }
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

// a function that will be called every time the window gets resized.
// It can get called a lot, so don't put any heavy computation in here!
        function onWindowResize() {
            // set the aspect ratio to match the new browser window aspect ratio
            camera.aspect = container.clientWidth / container.clientHeight;

            // update the camera's frustum
            camera.updateProjectionMatrix();

            // update the size of the renderer AND the canvas
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        window.addEventListener("resize", onWindowResize);

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