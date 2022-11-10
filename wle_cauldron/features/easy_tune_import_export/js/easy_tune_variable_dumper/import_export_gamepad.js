WL.registerComponent("import-export-gamepad", {
    _myVariablesImportPath: { type: WL.Type.String, default: '' },
    _myVariablesExportPath: { type: WL.Type.String, default: '' },
}, {
    init: function () {
    },
    start: function () {
    },
    update: function (dt) {
        if (PP.myRightGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).isPressEnd(2)) {
            PP.importEasyTuneVariables(this._myVariablesImportPath);
        }

        if (PP.myRightGamepad.getButtonInfo(PP.ButtonType.BOTTOM_BUTTON).isPressEnd(2)) {
            PP.exportEasyTuneVariables(this._myVariablesExportPath);
        }
    }
});

PP.myAudioManager = null;