import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/*
*   Debug
*/
const gui = new GUI({
    width: 300,
    title: 'Kennedii Kube Debugger',
    closeFolders: true,
})
gui.close()
gui.hide()

window.addEventListener('keydown', (k) => {
    if (k.key === 'h') {
        gui.show(gui._hidden)
    }
})
const debugObj = {}

/**
 * Different types of tweaks
 * Range - for numbers with min and max vals
 * Color - for colors with various formats
 * Text - for simple texts
 * Checkbox - for booleans
 * Select - for a choice from a list of vals 
 * Button - to trigger functions
 * */ 

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
*/
debugObj.color = '#2adf3f'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObj.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const kubeTweaks = gui.addFolder('Kube tweaks')

kubeTweaks.add(mesh.position, 'z', -3, 3, 0.01).name('Box Z pos')
kubeTweaks.add(mesh.position, 'y', -3, 3, 0.01).name('Box Y pos')
kubeTweaks.add(mesh.position, 'z', -3, 3, 0.01).name('Box Z pos')
kubeTweaks.add(mesh, 'visible')
kubeTweaks.add(material, 'wireframe')
kubeTweaks.addColor(debugObj, 'color')
    .onChange((v) => {
        material.color.set(debugObj.color)
    })

debugObj.spin = () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2})
}

kubeTweaks.add(debugObj, 'spin')

debugObj.subdivision = 2
kubeTweaks.add(debugObj, 'subdivision', 1, 20, 1)
    .onFinishChange(() => {
        mesh.geometry.dispose() // important to include to avoid mem leaks
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObj.subdivision, debugObj.subdivision, debugObj.subdivision)
    })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()