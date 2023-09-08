import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import * as CANNON from 'cannon-es'
import CannonUtils from './utils/cannonUtils'
import CannonDebugRenderer from './utils/cannonDebugRenderer'
import { Reflector } from 'three/examples/jsm/objects/Reflector'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    10000
)
const camera2 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
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
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

const renderer2 = new THREE.WebGLRenderer({canvas: canb});
renderer2.setSize(window.innerWidth, window.innerHeight/2)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer2.domElement)

const world = new CANNON.World()
world.gravity.set(0, -9.82, 0)
const normalMaterial = new THREE.MeshNormalMaterial()
const phongMaterial = new THREE.MeshPhongMaterial()

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true
orbitControls.target.set(0, 1, 0)
orbitControls.update();
const sceneMeshes: THREE.Mesh[] = []
let boxHelper: THREE.BoxHelper


const light1 = new THREE.AmbientLight( 0xffffff, 0.7);
scene.add( light1 );

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(500, 1000, 50);
scene.add(light);

const geometry = new THREE.BoxGeometry(10, 10, 10)
var material = [
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/heather_ft.jpg')}),   // right
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/heather_bk.jpg')}),     // left
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/heather_up.jpg')}),    // topt
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/heather_dn.jpg')}),    // bottom
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/heather_rt.jpg')}),    // front
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('./texture/heather_lf.jpg')})   //back
];


for(var i=0;i<6;i++){
    material[i].side=THREE.BackSide;
}
const cube = new THREE.Mesh(geometry, material)
cube.scale.set(1000,1000,1000)
scene.add(cube)

const planeGeometry = new THREE.PlaneGeometry(1000, 1000)
const planeMesh = new THREE.Mesh(planeGeometry, phongMaterial)

const texture = new THREE.TextureLoader().load('texture/ice_field_albedo.png')

planeMesh.position.y = -0.01
planeMesh.rotateX(-Math.PI / 2)
planeMesh.receiveShadow = true
scene.add(planeMesh)
const planeShape = new CANNON.Plane()
const planeBody = new CANNON.Body({ mass: 0 })
planeBody.addShape(planeShape)
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
world.addBody(planeBody)
const loader = new GLTFLoader();

const group = new THREE.Group();

// Load the first model and add it to the group
loader.load( './assets/bheeshma tank.glb', function ( gltf ) {
    group.add( gltf.scene );
    gltf.scene.scale.set(1,1,1);
    gltf.scene.position.set(0, 0, 0);
}, undefined, function ( error ) {
    console.error( error );
} );

// Load the second model and add it to the group

scene.add(group);

const group1 = new THREE.Group();

// Load the first model and add it to the group1
loader.load( './assets/ship2.glb', function ( gltf ) {
    group1.add( gltf.scene );
    gltf.scene.scale.set(4,4,4);
    gltf.scene.position.set(3, 4, 0);
}, undefined, function ( error ) {
    console.error( error );
} );

// Load the second model and add it to the group1

scene.add(group1);

window.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return;
  }
  switch (event.code) {
    case "ArrowUp":
      group.position.z += 0.8;
      break;
    case "ArrowDown":
      group.position.z -= 0.8;
      break;
    case "ArrowLeft":
      group.rotation.y -= 0.1;
      break;
    case "ArrowRight":
      group.rotation.y += 0.1;
      break;
    case "KeyW":
      group1.position.z -= 0.8;
      break;
    case "KeyS":
      group1.position.z += 0.8;
      break;
    case "KeyA":
      group1.rotation.y -= 0.1;
      break;
    case "KeyD":
      group1.rotation.y += 0.1;
      break;
    default:
      return;
  }
  

  event.preventDefault();
}, true);

const mirrorBack1: Reflector = new Reflector(
    new THREE.PlaneGeometry(1000, 1000),
    {
        color: new THREE.Color(0x7f7f7f),
        textureWidth: 1000,
        // window.innerWidth * window.devicePixelRatio,
        textureHeight: 1000,
        // window.innerHeight * window.devicePixelRatio
    }
)

mirrorBack1.position.y = 1
mirrorBack1.position.z = -1

scene.add(mirrorBack1)



// const mirrorFront1: Reflector = new Reflector(
//     new THREE.PlaneGeometry(1000, 1000),
//     {
//         color: new THREE.Color(0x7f7f7f),
//         clipBias: 0.5,
//         textureWidth: 1000,
//         // window.innerWidth * window.devicePixelRatio,
//         textureHeight: 1000,
//         // window.innerHeight * window.devicePixelRatio
//     }
// )
// mirrorFront1.position.y = 1
// mirrorFront1.position.z = 1
// mirrorFront1.rotateY(Math.PI)
// scene.add(mirrorFront1)



// const planeGeometry = new THREE.PlaneGeometry(1000, 1000)
// const planeMesh = new THREE.Mesh(planeGeometry, phongMaterial)
// planeMesh.position.y = -0.01
// planeMesh.position.z = -10
// planeMesh.rotateX(-Math.PI / 2)
// planeMesh.receiveShadow = true
// scene.add(planeMesh)
// const planeShape = new CANNON.Plane()
// const planeBody = new CANNON.Body({ mass: 0 })
// planeBody.addShape(planeShape)
// planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
// world.addBody(planeBody)
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

group.position.x += 0.5
const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const physicsFolder = gui.addFolder('Physics')
physicsFolder.add(world.gravity, 'x', -10.0, 10.0, 0.1)
physicsFolder.add(world.gravity, 'y', -10.0, 10.0, 0.1)
physicsFolder.add(world.gravity, 'z', -10.0, 10.0, 0.1)
physicsFolder.open()
const clock = new THREE.Clock()
let delta
function animate() {
    requestAnimationFrame(animate)
    orbitControls.update()
    delta = Math.min(clock.getDelta(), 0.1)
    world.step(delta)
    camera2.lookAt(group.position);

    // cannonDebugRenderer.update()

    // Copy coordinates from Cannon to Three.js
 
   
   
    
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
    renderer2.render(scene, camera2);
}

animate()