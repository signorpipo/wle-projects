WL.registerComponent('test-visual-line', {
}, {
    init: function () {
    },
    start: function () {
        this.visualParams = new PP.VisualLineParams();
        this.visualParams.myStart.vec3_copy([0, 0, 0]);
        this.visualParams.myDirection.vec3_copy([0, 1, 1]);
        this.visualParams.myLength = 2.2;
        this.visualParams.myMaterial = PP.myDefaultResources.myMaterials.myFlatOpaque.clone();
        this.visualParams.myMaterial.color = [1, 1, 1, 1];
        //this.visualLine = new PP.VisualLine(this.visualParams);
        this.visualLine = new PP.VisualLine(this.visualParams);
    },
    update: function (dt) {
    },
});