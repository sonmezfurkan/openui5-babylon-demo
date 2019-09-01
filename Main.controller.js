sap.ui.define([
	'sap/ui/core/mvc/Controller'
], function (Controller) {
    'use strict'
    
	return Controller.extend('demo.babylon.openui5.Main', {

		onInit() {
            // attach after rendering event to HTML5 canvas
            this.getView().byId('idRenderCanvas').attachAfterRendering(this._load3DModel.bind(this))
        },

        // handle color change
        onSelectColor(oEvent) {
            switch (oEvent.getSource().getCustomData()[0].getValue()) {
                case 'black':
                    this._scene.getMaterialByID('Body').diffuseColor = new BABYLON.Color3(0.13, 0.13, 0.13)
                    break
                case 'gray':
                    this._scene.getMaterialByID('Body').diffuseColor = new BABYLON.Color3(0.46, 0.47, 0.48)
                    break
                case 'white':
                    this._scene.getMaterialByID('Body').diffuseColor = new BABYLON.Color3(0.81, 0.81, 0.80)
                    break
                case 'red':
                    this._scene.getMaterialByID('Body').diffuseColor = new BABYLON.Color3(0.67, 0.10, 0.15)
                    break
                case 'blue':
                    this._scene.getMaterialByID('Body').diffuseColor = new BABYLON.Color3(0.00, 0.42, 0.66)
                    break
                default:
                    break
            }
        },

        // handle initial load of 3D scene
        _load3DModel(oEvent) {

            // create scene
            const canvas = document.getElementById(oEvent.getSource().getId())
            const engine = new BABYLON.Engine(canvas, true)
            const scene = new BABYLON.Scene(engine)
            scene.clearColor = BABYLON.Color3.White()

            // save instance reference to scene
            this._scene = scene

            // add lights
            const light = new BABYLON.PointLight('lightOmni', new BABYLON.Vector3(20, 20, 150), scene)
            const lightTop = new BABYLON.PointLight('lightTop', new BABYLON.Vector3(0, 200, 0), scene)
        
            // add camera
            const camera = new BABYLON.ArcRotateCamera('camArc', Math.PI - Math.PI * 0.3, Math.PI * 0.45, 17, new BABYLON.Vector3.Zero())
            camera.attachControl(canvas, false)

            // load 3D object
            BABYLON.SceneLoader.Append('assets/', 'camaro.obj', scene, () => {
                scene.getMaterialByID('Body').diffuseColor = new BABYLON.Color3(0.13, 0.13, 0.13)
            })

            // move the light with camera
            scene.registerBeforeRender(() => {
                light.position = camera.position
            })

            // initiate render loop
            engine.runRenderLoop(() => {
                scene.render()
            })
        }

	})
})