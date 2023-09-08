import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
)

const camera2 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
)

camera.position.x = 20
camera2.position.x = 160
camera2.position.z = 0
camera2.position.y = 20

const can1=document.querySelector(".canvas01");
const can2=document.querySelector(".canvas02");

const cana: HTMLCanvasElement = can1 as HTMLCanvasElement;
const canb: HTMLCanvasElement = can2 as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({canvas: cana});
renderer.setSize(window.innerWidth, window.innerHeight/2)
document.body.appendChild(renderer.domElement)

const renderer2 = new THREE.WebGLRenderer({canvas: canb});
renderer2.setSize(window.innerWidth, window.innerHeight/2)
document.body.appendChild(renderer2.domElement)

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

const light1 = new THREE.AmbientLight( 0xffffff, 0.7);
scene.add( light1 );

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(500, 1000, 50);
scene.add(light);

const geometry = new THREE.BoxGeometry(10, 10, 10)
var material = [
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/frontleft.png')}),   // right
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/frontright.png')}),     // left
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/frontup.png')}),    // topt
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/frontdown.png')}),    // bottom
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/front.png')}),    // front
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/fronttop.png')})   //back
];


for(var i=0;i<6;i++){
    material[i].side=THREE.BackSide;
}
const cube = new THREE.Mesh(geometry, material)
cube.scale.set(1000,1000,1000)
scene.add(cube)


const loader = new GLTFLoader();

const group = new THREE.Group()
loader.load( './assets/bheeshma tank.glb', function ( gltf ) {

	group.add( gltf.scene );
  gltf.scene.scale.set(2,2,2)
  gltf.scene.position.set(0, 0, 0)

}, undefined, function ( error ) {

	console.error( error );

} );

group.add(camera2);

scene.add(group)

window.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return;
  }
  if (event.code === "ArrowDown"){
      // Handle "down"
      group.position.z -= 0.8
  } else if (event.code === "ArrowUp"){
      // Handle "up"
      group.position.z += 0.8
  } else if (event.code === "ArrowLeft"){
      // Handle "left"
      group.position.x += 0.8
  } else if (event.code === "ArrowRight"){
      // Handle "right"
      group.position.x -= 0.8
  }
  event.preventDefault();
}, true);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

group.position.x += 0.5

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    camera2.lookAt(group.position);
    render()
    
}

function render() {
    renderer.render(scene, camera)
    renderer2.render(scene, camera2);
}

animate()