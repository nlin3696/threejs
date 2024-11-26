import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const gui = new GUI()


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTx = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTx = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTx = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTx = textureLoader.load('./textures/door/height.jpg')
const doorNormalTx = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTx = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTx = textureLoader.load('./textures/door/roughness.jpg')
const matcapTx = textureLoader.load('./textures/matcaps/8.png')
const gradientTx = textureLoader.load('./textures/gradients/5.jpg')

doorColorTx.colorSpace = THREE.SRGBColorSpace
matcapTx.colorSpace = THREE.SRGBColorSpace



// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTx
// material.color = new THREE.Color('green')
// material.wireframe = true 
// material.opacity = 0.2
// material.transparent = true
// material.alphaMap = doorAlphaTx
// material.side = THREE.DoubleSide // watch out for doubleside performance


// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()

// MeshMapcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTx

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial
// need lights
// const material = new THREE.MeshLambertMaterial()


// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial() // kinda like cell shading
// gradientTx.minFilter = THREE.NearestFilter
// gradientTx.magFilter = THREE.NearestFilter
// gradientTx.generateMipmaps = false
// material.gradientMap = gradientTx


// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTx
// material.aoMap = doorAmbientOcclusionTx
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTx
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTx
// material.roughnessMap = doorRoughnessTx
// material.normalMap = doorNormalTx
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTx

// gui.add(material, 'metalness', 0, 1, 0.0001)
// gui.add(material, 'roughness', 0, 1, 0.0001)

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = doorColorTx
// material.aoMap = doorAmbientOcclusionTx
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTx
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTx
// material.roughnessMap = doorRoughnessTx
// material.normalMap = doorNormalTx
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTx

gui.add(material, 'metalness', 0, 1, 0.0001)
gui.add(material, 'roughness', 0, 1, 0.0001)

// Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material, 'clearcoat', 0, 1, 0.0001)
// gui.add(material, 'clearcoatRoughness', 0, 1, 0.0001)

// Sheen
// material.sheen = 1
// material.sheenRoughness = 0
// material.sheenColor.set(1, 1, 1)


// gui.add(material, 'sheen', 0, 1, 0.0001)
// gui.add(material, 'sheenRoughness', 0, 1, 0.0001)
// gui.addColor(material, 'sheenColor')


// Iridenscence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 800]


// gui.add(material, 'iridescence', 0, 1, 0.0001)
// gui.add(material, 'iridescenceIOR', 1, 2.333, 0.0001)
// gui.add(material.iridescenceThicknessRange, '0', 1, 1000, 1)
// gui.add(material.iridescenceThicknessRange, '1', 1, 1000, 1)

// Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission', 0, 1, 0.0001)
gui.add(material, 'ior', 0, 1, 0.0001)
gui.add(material, 'thickness', 0, 1, 0.0001)


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material,
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)

torus.position.x = 1.5
scene.add(sphere, plane, torus)

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
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

    // Update objects 
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime


    sphere.rotation.x = -0.15 * elapsedTime
    plane.rotation.x = -0.15 * elapsedTime
    torus.rotation.x = -0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()