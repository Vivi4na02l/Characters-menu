import * as THREE from './libs/three.module.js';

let camera, scene, renderer;
let shoulderRight, elbow, trunk, vase, topTrunk, leftEye, leftBlackEye, rightEye, rightBlackEye; // PIVOTS (Object3D)

let shoulderRotation = false
let shoulderRotationH = false
let elbowRotation = false
let elbowRotationH = false

let mousePos = { x: 0, y: 0 };

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {

    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 10);
    camera.position.y = 2;
    camera.position.z = 9;
    camera.lookAt(scene.position); //point the camera to the center of the scene
    

    // listen to the mouse
    document.addEventListener('mousemove', handleMouseMove, false);

    // create a render and set the size
    renderer = new THREE.WebGLRenderer({ antialias: false }); // aliasing (jagged edges when rendering)
    renderer.setSize(window.innerWidth, window.innerHeight);
    // configure renderer clear color
    renderer.setClearColor("#72bde0");

    // add the output of the renderer to an HTML element (this case, the body)
    document.body.appendChild(renderer.domElement);


    /**********************************************************************************
     * ROBOTIC ARM: SHOULDER (pivot) -> ARM (mesh) -> ELBOW (pivot) -> FOREARM (mesh)
     * ********************************************************************************/
    // define a parallelepiped geometry and a normal material for the meshes (arm & forearm)
    
    //Futuro
    //let geometry = new THREE.CylinderGeometry(1, 2, 1);

    // GEOMETRIA
    let geometry = new THREE.CylinderGeometry(0.40, 0.40, 1);
    let geoTrunk = new THREE.CylinderGeometry(1,1,4)
    let geoTopTrunk = new THREE.SphereGeometry(1)
    let geoVase = new THREE.CylinderGeometry(1, 1.5,1)
    let geoEye = new THREE.SphereGeometry(0.3)
    let geoBlackEye = new THREE.SphereGeometry(0.1)

    // MATERIAL
    let matVase = new THREE.MeshBasicMaterial({ color:"white" });
    let matTrunk = new THREE.MeshBasicMaterial({ color: "green" });
    let matTopTrunk = new THREE.MeshBasicMaterial({ color: "green" });
    let matBlackEye = new THREE.MeshBasicMaterial({ color: "black" });

    // const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
    // const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    // const cylinder = new THREE.Mesh( geometry, material );
    // scene.add( cylinder );

    /* VASE */
    vase = new THREE.Mesh(geoVase, matVase);
    vase.position.x = 0
    vase.position.y = -2
    vase.rotation.z = 3.15

    /* TRUNK */
    trunk = new THREE.Mesh(geoTrunk, matTrunk);

    // COLORS TRUNK

    topTrunk = new THREE.Mesh(geoTopTrunk, matTopTrunk); 
    topTrunk.position.x = 0
    topTrunk.position.y = 2.1

    /* Eyes */

    //left
    leftEye = new THREE.Mesh(geoEye, matVase);
    leftEye.position.z = 1
    leftEye.position.x = -0.3
    leftEye.position.y = 1.5

    leftBlackEye = new THREE.Mesh(geoBlackEye, matBlackEye);
    leftBlackEye.position.z = 1
    leftBlackEye.position.x = -0.1
    leftBlackEye.position.y = 0.2

    //right
    rightEye = new THREE.Mesh(geoEye, matVase);
    rightEye.position.z = 1
    rightEye.position.x = 0.2
    rightEye.position.y = 1.5

    rightBlackEye = new THREE.Mesh(geoBlackEye, matBlackEye);
    rightBlackEye.position.z = 1
    rightBlackEye.position.x = -0.1
    rightBlackEye.position.y = 0.2



    /* SHOULDER */
    shoulderRight = new THREE.Object3D();
    

    // show axes for the SHOULDER CS
    let axesShoulder = new THREE.AxesHelper(4);
    
    

    /* ARM */
    let arm = new THREE.Mesh(geometry, matTrunk);
    arm.position.x = 0.4+1
    
    
    
    

    // show axes for the ARM CS
    let axesArm = new THREE.AxesHelper(2);
    


    /* ELBOW */
    elbow = new THREE.Object3D();
    
    elbow.position.x = 0
    elbow.position.y = -0.6

    

    // show axes for the SHOULDER CS
    let axesElbow = new THREE.AxesHelper(4);
    arm.rotation.z = 1.6
    axesElbow.position.x = -3


    /* FOREARM */
    let forearm = new THREE.Mesh(geometry, matTrunk);
    // forearm.position.x = -2
    forearm.position.y = -0.4
    // forearm.rotation.z = 1.6
    

    // show axes for the FOREARM CS
    let axesForearm = new THREE.AxesHelper(2);
    axesForearm.position.x = -5
    
    /*LIGAÇÕES */

    scene.add(trunk);
    trunk.add(topTrunk)
    // topTrunk.add(cylinder);
    trunk.add(leftEye)
    leftEye.add(leftBlackEye)
    trunk.add(rightEye)
    rightEye.add(rightBlackEye)
    trunk.add(vase);
    shoulderRight.add(axesShoulder);
    trunk.add(shoulderRight);
    shoulderRight.add(arm);// add the ARM to the SHOULDER
    arm.add(axesArm);
    arm.add(elbow); // add the ELBOW to the ARM
    elbow.add(axesElbow);
    elbow.add(forearm);// add the FOREARM to the ELBOW
    forearm.add(axesForearm);


    /*****************************
        * ANIMATE 
        * ***************************/
    // set the animation function
    renderer.setAnimationLoop(render);
}

/*****************************
* ANIMATION FUNCTION 
* ***************************/
function render() {
    

    // rotate the shoulder around its Z-axis (on key S)
    if (shoulderRotation)
        shoulderRight.rotation.z += 0.01;
    if (shoulderRotationH)
        shoulderRight.rotation.z -= 0.01;
    // rotate the elbow around its Z-axis (on key E)
    if (elbowRotation)
        elbow.rotation.z += 0.01;
    if (elbowRotationH)
        elbow.rotation.z -= 0.01;

    updateEye();
    // render the scene into viewport using the camera
    renderer.render(scene, camera);
}


/*****************************
* KEYBOARD EVENTS 
* ***************************/
document.addEventListener("keydown", event => {
    if (event.key == 'a') {
        shoulderRotation = true;
    }
    if (event.key == 'd') {
        shoulderRotationH = true;
    }
    if (event.key == 'q') {
        elbowRotation = true;
    }
    if (event.key == 'e') {
        elbowRotationH = true;
    }
    if (event.key == 'w') {
        elbow.children[1].material.wireframe = true;
        // HINT: inspect elbow object with console.log(elbow)
    }
})

document.addEventListener("keyup", event => {
    if (event.key == 'a') {
        
        shoulderRotation = false;
    }
    if (event.key == 'd') {
        shoulderRotationH = false;
    }
    if (event.key == 'q') {
        elbowRotation = false;
    }
    if (event.key == 'e') {
        elbowRotationH = false;
    }
    if (event.key == 'w') {
        elbow.children[1].material.wireframe = false
    }
})

// HANDLE MOUSE EVENTS
function handleMouseMove(event) {
    // convert mouse window coordinates into normalized coordinates: [-1, 1]
    let tx = -1 + (event.clientX / window.innerWidth) * 2;
    let ty = 1 - (event.clientY / window.innerHeight) * 2;
    mousePos = { x: tx, y: ty };
}

function updateEye() {
    let targetX = mousePos.x * 100;
    let targetY = mousePos.y * 100;
    // console.log(mousePos.x, mousePos.y)
    console.log(targetY);
    

    // update the airplane's position
    // leftEye.position.x = targetX;
    // leftEye.position.y = targetY + 100;
    

    // // update the airplane's Y position SMOOTHLY
    // leftEye.position.z += (targetX - leftEye.position.x + 100) * 0.1;
    // // update the airplane's rotation proportionally to distance between actual and target positions

    if (targetY >  -23){ 
        leftEye.position.z = (targetY - leftEye.position.y + 100) * 0.013;
        rightEye.position.z = (targetY - rightEye.position.y + 100) * 0.013;
    }

    
}