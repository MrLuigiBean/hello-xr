import { AbstractMesh, Mesh, MeshBuilder, Scene, StandardMaterial } from "babylonjs";
import { TextPlane } from "./text-plane"

export interface HelloMesh {
	scene: Scene;
	mesh: Mesh;
	label: TextPlane;
}

export class HelloSphere extends AbstractMesh implements HelloMesh {
	scene: Scene;
	mesh: Mesh;
	label: TextPlane;

	constructor(name: string, options: { diameter: number }, scene: Scene) {
		super(name, scene);
		this.scene = scene;
		this.mesh = MeshBuilder.CreateSphere('hello sphere mesh', options, scene);
		this.mesh.material = new StandardMaterial('hello sphere material', scene);
		this.addChild(this.mesh);
		this.label = new TextPlane('hello sphere label', 1.5, 1,
			0, options.diameter / 2 + 0.2, 0,
			"hello sphere", "purple", "white", 25, scene);
		this.addChild(this.label.mesh);
	}
}
