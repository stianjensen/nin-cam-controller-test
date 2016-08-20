(function(global) {
  class DemoNode extends NIN.Node {
    constructor(id, options) {
      super(id, {
        inputs: {
          camera: new NIN.CameraInput()
        },
        outputs: {
          A: new NIN.TextureOutput()
        }
      });

      this.scene = new THREE.Scene();
      this.cube = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({color: 0xff0000}));
      this.cube2 = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({color: 0x00ff00}));
      this.cube.position.x = -1;
      this.cube2.position.x = 1;
      this.scene.add(this.cube);
      this.scene.add(this.cube2);

      this.light = new THREE.PointLight({color: 0xaaccff});
      this.light.position.set(0, 2, 2);
      this.scene.add(this.light);

      this.renderTarget = new THREE.WebGLRenderTarget(640, 360, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat
      });
    }

    update(frame) {
      this.cube.rotation.x = frame / 47;
      this.cube.rotation.z = frame / 79;
      this.cube2.rotation.x = frame / 47;
      this.cube2.rotation.z = frame / 79;
    }

    render(renderer) {
      renderer.render(this.scene, this.inputs.camera.getValue(), this.renderTarget, true);
      this.outputs.A.setValue(this.renderTarget.texture);
    }

    resize() {
      this.renderTarget.setSize(16 * GU, 9 * GU);
    }
  }

  global.DemoNode = DemoNode;
})(this);
