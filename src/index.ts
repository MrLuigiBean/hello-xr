import { Engine } from "babylonjs";
import { App } from "./app"
console.log('hello world!');

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new Engine(canvas, true);

const app = new App(engine, canvas)
const scenePromise = app.createScene()
scenePromise.then(scene => {
	engine.runRenderLoop(() => {
		scene.render();
	});
})

window.addEventListener('resize', () => {
	engine.resize();
});
