class YinchLine extends PP.VisualLine {
    _build() {
        super._build();
        this._myLineMeshComponent.mesh = PP.myDefaultResources.myMeshes.myCube;
    }
}

WL.registerComponent('test-visual-line', {
    mat: { type: WL.Type.Material }
}, {
    init: function () {
    },
    start: function () {
        this.visualParams = new PP.VisualLineParams();
        this.visualParams.myStart.vec3_copy([0, 0, 0]);
        this.visualParams.myDirection.vec3_copy([0, 1, 1]);
        this.visualParams.myLength = 2.2;
        this.visualParams.myMaterial = this.mat.clone();
        this.visualParams.myParent = WL.scene.addObject();

        //this._myLineMeshComponent.mesh = this.mesh;//PP.myDefaultResources.myMeshes.myCylinder;
        //this.visualLine = new PP.VisualLine(this.visualParams);
        this.visualLine = new YinchLine(this.visualParams);
        this.visualLine.paramsUpdated();
        this.visualLine.update(0);
    },
    update: function (dt) {
    },
});