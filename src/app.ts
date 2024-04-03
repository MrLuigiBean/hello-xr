import { Engine, MeshBuilder, Scene } from "babylonjs";

export class App {
	private engine: Engine;
	private canvas: HTMLCanvasElement;

	constructor(engine: Engine, canvas: HTMLCanvasElement) {
		this.engine = engine;
		this.canvas = canvas;
		console.log('app is running');
	}

	createScene() {
		const scene = new Scene(this.engine);
		scene.createDefaultCameraOrLight();

		const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1.3 }, scene);
		sphere.position.y = 1;
		sphere.position.z = 5;

		return scene;
	}
}
