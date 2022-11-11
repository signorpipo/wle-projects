WL.registerComponent("import-export-gamepad", {
    _myVariablesImportURL: { type: WL.Type.String, default: '' },
    _myVariablesExportURL: { type: WL.Type.String, default: '' },
}, {
    init: function () {
    },
    start: function () {
    },
    update: function (dt) {
        if (PP.myRightGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).isPressEnd(2)) {
            PP.importEasyTuneVariables(this._myVariablesImportURL);
        }

        if (PP.myRightGamepad.getButtonInfo(PP.ButtonType.BOTTOM_BUTTON).isPressEnd(2)) {
            PP.exportEasyTuneVariables(this._myVariablesExportURL);
        }
    }
});

PP.myAudioManager = null;