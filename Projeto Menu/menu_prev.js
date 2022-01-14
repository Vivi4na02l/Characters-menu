import * as THREE from './libs/three.module.js';
let camera, scene, renderer;
let sBody, sRightArm, sRightShoulder;

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {

    // create an empty scene, that will hold all our elements (objects, cameras and lights)
    scene = new THREE.Scene();
    
    // create a camera, which defines where we're looking at
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(100, aspect, 0.1, 1000); // perspective camera
    
    // place the camera using world coordinates
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;
    camera.lookAt(scene.position); //point the camera to the center of the scene
    
    // create a renderer: if no Canvas parameter is passed, a new canvas element will be created
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); // set output canvas and viewport size
    renderer.setClearColor("#FFFFFF"); // configure clear color (background color)
    // add the output of the renderer to an HTML element (adds a Canvas element to the body)
    document.body.appendChild(renderer.domElement);

    sackboy()

    // set the animation function: if `null` is passed it will stop any already ongoing animation
    renderer.setAnimationLoop(render);
}




// Personagem Viviana
function sackboy() {
    // MATERIAL
    let texture = new THREE.TextureLoader().load('images/sackboy.png')
    let material = new THREE.MeshPhongMaterial({ map: texture });
    let texture = new THREE.TextureLoader().load ('texture.png',
        function () { callback(); });

    // CORPO
    let body = { w: 2, h: 3.5, d: 2 }
    let geoBody = new THREE.BoxGeometry(body.w, body.h, body.d);
    sBody = new THREE.Mesh(geoBody, material);

    // OMBRO DIREITO
    let shoulder = { w: 1, h: 1, d: 1 }
    let sRightShoulder = new THREE.Object3D();
    // sRightShoulder = new THREE.Mesh(geoRightShoulder, material);
    sRightShoulder.position.set(body.x/2,body.y/2,0)

    // BRAÇO DIREITO                                                         let geometrySphere = new THREE.SphereGeometry(1);
    let arm = { w: 2, h: 1, d: 1 }
    let geoRightArm = new THREE.Mesh(arm.w, arm.h, arm.d);
    sRightArm = new THREE.Mesh(geoRightArm, material);
    sRightArm.position.set(shoulder.w,0,0)

    // EIXOS HELPER
    let axes = new THREE.AxesHelper(3)
    let axesRightArm = new THREE.AxesHelper(2)
    scene.add(axes)
    sBody.add(axes)
    sRightArm.add(axesRightArm)

    // ADICIONAR À CENA
    scene.add(sBody);
    sBody.add(sRightShoulder);
    sRightShoulder.add(sRightArm);

}





function render() {
    // rotate the cube around its axes
    // cube.rotation.y += 0.01;
    // cube.rotation.z += 0.01;

    // sackRightArm.rotation.y += 0.05;

    renderer.render(scene, camera);
};