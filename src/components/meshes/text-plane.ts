import { MeshBuilder, Scene } from 'babylonjs'
import { AdvancedDynamicTexture, TextBlock } from 'babylonjs-gui'

export class TextPlane {
	public textBlock: TextBlock;
	constructor(
		name: string, width: number, height: number,
		x: number, y: number, z: number,
		text: string, backgroundColor: string, textColor: string,
		fontSize: number, scene: Scene
	) {
		const textPlane = MeshBuilder.CreatePlane(name + ' text plane', { width: width, height: height });
		textPlane.position.set(x, y, z);

		const planeTexture = AdvancedDynamicTexture.CreateForMesh(textPlane, width * 100, height * 100, false);
		planeTexture.background = backgroundColor;

		this.textBlock = new TextBlock(name + ' plane text');
		this.textBlock.text = text;
		this.textBlock.color = textColor;
		this.textBlock.fontSize = fontSize;

		planeTexture.addControl(this.textBlock);
	}
}
