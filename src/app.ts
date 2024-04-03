import { AbstractMesh, Animation, ArcRotateCamera, Color3, CubeTexture, Engine, HemisphericLight, MeshBuilder, PointLight, Scene, SceneLoader, StandardMaterial, Texture, UniversalCamera, Vector3, VideoDome } from "babylonjs";
import { AdvancedDynamicTexture, TextBlock } from "babylonjs-gui";
import "babylonjs-loaders"

export class App {
	private engine: Engine;
	private canvas: HTMLCanvasElement;

	constructor(engine: Engine, canvas: HTMLCanvasElement) {
		this.engine = engine;
		this.canvas = canvas;
		console.log('app is running');
	}

	async createScene() {
		const scene = new Scene(this.engine);
		// scene.createDefaultCameraOrLight();
		this.createCamera(scene);
		this.createLights(scene);

		const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1.3 }, scene);
		sphere.position.y = 1;
		sphere.position.z = 5;

		this.loadModel(scene);

		const helloPlane = MeshBuilder.CreatePlane('hello plane', { size: 15 });
		helloPlane.position.y = 0;
		helloPlane.position.z = 5;
		const helloTexture = AdvancedDynamicTexture.CreateForMesh(helloPlane);
		const helloText = new TextBlock('hello');
		helloText.text = 'Hello XR';
		helloText.color = 'purple';
		helloText.fontSize = 50;
		helloTexture.addControl(helloText);

		// this.createSkybox(scene);
		this.createVideoSkyDome(scene);

		this.addInspectorKeyboardShortcut(scene);

		const xr = await scene.createDefaultXRExperienceAsync({
			uiOptions: {
				sessionMode: 'immersive-vr'
				// sessionMode: 'immersive-ar'
			}
		});
		// only for debugging
		// (window as any).xr = xr

		return scene;
	}

	createCamera(scene: Scene) {
		// const camera = new ArcRotateCamera('arcCamera', -Math.PI / 5, Math.PI / 2, 5, Vector3.Zero(), scene);
		const camera = new UniversalCamera('uniCamera', new Vector3(0, 0, -5), scene);
		camera.attachControl(this.canvas, true);
	}

	createLights(scene: Scene) {
		const hemiLight = new HemisphericLight('hemLight', new Vector3(-1, 1, 0), scene);
		hemiLight.intensity = 0.3;
		hemiLight.diffuse = new Color3(0, 0, 1);

		const pointLight = new PointLight('pointLight', new Vector3(0, 1.5, 2), scene);
		pointLight.intensity = 1;
		pointLight.diffuse = new Color3(1, 0, 0);
	}

	loadModel(scene: Scene) { // Thanks Bryan!!
		// Load a custom "dragon" object
		// The direct URL to the dragon.glb file
		const dragonUrl = "https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/Georgia-Tech-Dragon/dragon.glb";

		// Using SceneLoader to load the model directly from the URL
		SceneLoader.ImportMeshAsync("", dragonUrl, "", scene).then(result => {
			const root = result.meshes[0];
			root.id = 'dragon';
			root.name = 'dragon';
			root.position.y = -1;
			root.rotation = new Vector3(0, 0, Math.PI);
			root.scaling.setAll(10);
			this.createAnimation(scene, root);
		});
	}

	createAnimation(scene: Scene, model: AbstractMesh) {
		const animation = new Animation(
			'rotationAnima', 'rotation', 30,
			Animation.ANIMATIONTYPE_VECTOR3,
			Animation.ANIMATIONLOOPMODE_CYCLE
		);

		const keyframes = [
			{ frame: 0, value: new Vector3(0, 0, 0) },
			{ frame: 30, value: new Vector3(0, 2 * Math.PI, 0) }
		];

		animation.setKeys(keyframes);
		model.animations.push(animation);
		scene.beginAnimation(model, 0, 30, true);
	}

	createSkybox(scene: Scene) {
		const skybox = MeshBuilder.CreateBox('skybox', { size: 1000 }, scene);
		const skyboxMaterial = new StandardMaterial('skybox-mat');

		skyboxMaterial.backFaceCulling = false;
		skyboxMaterial.reflectionTexture = new CubeTexture('assets/textures/skybox', scene);
		skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
		skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
		skyboxMaterial.specularColor = new Color3(0, 0, 0);
		skybox.material = skyboxMaterial;
	}

	createVideoSkyDome(scene: Scene) {
		const dome = new VideoDome(
			'videoDome',
			'assets/videos/bridge-360.mp4',
			{
				resolution: 32,
				size: 1000
			},
			scene
		);
	}

	addInspectorKeyboardShortcut(scene: Scene) {
		window.addEventListener('keydown', e => {
			if (e.ctrlKey && e.altKey && e.key === 'i') {
				if (scene.debugLayer.isVisible()) {
					scene.debugLayer.hide()
				} else {
					scene.debugLayer.show();
				}
			}
		});
	}
}
