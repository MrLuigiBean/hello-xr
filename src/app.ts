import { Color3, CubeTexture, Engine, MeshBuilder, Scene, StandardMaterial, Texture } from "babylonjs";
import { AdvancedDynamicTexture, TextBlock } from "babylonjs-gui";

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
		scene.createDefaultCameraOrLight();

		const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1.3 }, scene);
		sphere.position.y = 1;
		sphere.position.z = 5;

		const helloPlane = MeshBuilder.CreatePlane('hello plane', { size: 15 });
		helloPlane.position.y = 0;
		helloPlane.position.z = 5;
		const helloTexture = AdvancedDynamicTexture.CreateForMesh(helloPlane);
		const helloText = new TextBlock('hello');
		helloText.text = 'Hello XR';
		helloText.color = 'purple';
		helloText.fontSize = 50;
		helloTexture.addControl(helloText);

		this.createSkybox(scene);

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
}
