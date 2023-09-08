// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// import Stats from 'three/examples/jsm/libs/stats.module'

// const scene = new THREE.Scene()
// const renderer = new THREE.WebGLRenderer()


// let materialArray = [
//     './texture/heather_ft.jpg',
//     './texture/heather_bk.jpg',
//     './texture/heather_up.jpg',
//     './texture/heather_dn.jpg',
//     './texture/heather_rt.jpg',
//     './texture/heather_lf.jpg'
// ];

// const pmremGenerator = new THREE.PMREMGenerator(renderer)
// const envTexture = new THREE.CubeTextureLoader().load(
//     [
//         './texture/heather_ft.jpg',
//         './texture/heather_bk.jpg',
//         './texture/heather_up.jpg',
//         './texture/heather_dn.jpg',
//         './texture/heather_rt.jpg',
//         './texture/heather_lf.jpg'
//     ],
//     () => {
//         materialRef.envMap = pmremGenerator.fromCubemap(envTexture).texture
//         pmremGenerator.dispose()

//     }
// )
// const materialRef = new THREE.MeshPhysicalMaterial({})
// materialRef.reflectivity = 1.0
// materialRef.transmission = 0.9
// materialRef.roughness = 0
// materialRef.metalness = 0.2
// materialRef.clearcoat = 1
// materialRef.clearcoatRoughness = 0
//     // materialRef.color = new THREE.Color(0xffffff)
// materialRef.ior = 1.2
// materialRef.thickness = 10.0
// renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.shadowMap.enabled = true
// document.body.appendChild(renderer.domElement)
// const cubeRenderTarget1 = new THREE.WebGLCubeRenderTarget(128, {
//     generateMipmaps: true,
//     minFilter: THREE.LinearMipmapLinearFilter,
// })

// const cubeCamera1 = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget1)


// let loader = new THREE.CubeTextureLoader();
// scene.background = loader.load(materialArray)


// // const texture = new THREE.TextureLoader().load('img/grid.png')
// // materialRef.map = texture



// const ambientLight = new THREE.AmbientLight(0xaaaaaa)
// scene.add(ambientLight)

// const light1 = new THREE.PointLight()
// light1.position.set(10, 10, 10)
// light1.castShadow = true
// light1.shadow.bias = -0.0002
// light1.shadow.mapSize.height = 2048
// light1.shadow.mapSize.width = 2048
// scene.add(light1)

// const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.01,
//     100
// )
// camera.position.set(1.75, 1.75, 3.5)


// const orbitControls = new OrbitControls(camera, renderer.domElement)
// orbitControls.enableDamping = true

// var textureLoader = new THREE.TextureLoader();
// const grassBaseColor = textureLoader.load("texture/grass2/base.jpg", function(texture) {

//     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//     texture.offset.set(0, 0);
//     texture.repeat.set(100, 100);

// });
// const grassNormalMap = textureLoader.load("texture/grass2/base.jpgNR.png", function(texture) {

//     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//     texture.offset.set(0, 0);
//     texture.repeat.set(100, 100);

// });
// const grassHeightMap = textureLoader.load("texture/grass2/base.jpgHGT.png", function(texture) {

//     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//     texture.offset.set(0, 0);
//     texture.repeat.set(100, 100);

// });
// const grassBumpMap = textureLoader.load("texture/grass2/base.jpgNR.png", function(texture) {

//     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//     texture.offset.set(0, 0);
//     texture.repeat.set(100, 100);

// });

// const material = new THREE.MeshPhongMaterial({
//     map: grassBaseColor,
//     normalMap: grassNormalMap,
//     bumpMap: grassBumpMap,
//     bumpScale: 0.8,
//     displacementMap: grassHeightMap,
//     displacementScale: 0.5,
//     side: THREE.DoubleSide
// })

// const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material);
// mesh.rotation.x = -Math.PI / 2;
// mesh.receiveShadow = true;
// mesh.position.set(0, -0.27, 0);
// scene.add(mesh);

// window.addEventListener('resize', onWindowResize, false)

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }



// const material1 = new THREE.MeshPhongMaterial({
//     envMap: cubeRenderTarget1.texture,
// })
// const box2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materialRef);
// box2.castShadow = true
// box2.receiveShadow = true
// box2.position.set(-2, 1.1, 3);
// const ball2 = new THREE.Mesh(new THREE.SphereGeometry(0.6, 50, 50), materialRef)
// ball2.position.set(1, 1.1, 3)
// ball2.castShadow = true
// ball2.receiveShadow = true

// scene.add(ball2);
// const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), materialRef)
// scene.add(planeMesh);
// const stats = Stats()
// document.body.appendChild(stats.dom)

// const clock = new THREE.Clock()

// function animate() {
//     requestAnimationFrame(animate)

//     const delta = clock.getDelta()


//     orbitControls.update()

//     render()

//     stats.update()
// }

// function render() {
//     cubeCamera1.update(renderer, scene)

//     renderer.render(scene, camera)
// }

// animate()