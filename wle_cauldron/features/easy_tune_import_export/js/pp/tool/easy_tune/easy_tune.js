WL.registerComponent('pp-easy-tune', {
    _myHandedness: { type: WL.Type.Enum, values: ['none', 'left', 'right'], default: 'none' },
    _myShowOnStart: { type: WL.Type.Bool, default: false },
    _myShowVisibilityButton: { type: WL.Type.Bool, default: false },
    _myEnableGamepadScrollVariable: { type: WL.Type.Bool, default: true },
    _myVariablesImportPath: { type: WL.Type.String, default: '' },
    _myVariablesExportPath: { type: WL.Type.String, default: '' },
    _myImportVariablesOnStart: { type: WL.Type.Bool, default: false },
    _myEnableVariablesImportExportButtons: { type: WL.Type.Bool, default: false }
}, {
    init: function () {
        this._myWidget = new PP.EasyTuneWidget();

        PP._setEasyTuneWidgetActiveVariableCallbacks.push(function (variableName) {
            this._myWidget.setActiveVariable(variableName);
        }.bind(this));

        PP._refreshEasyTuneWidgetCallbacks.push(function () {
            this._myWidget.refresh();
        }.bind(this));

        this._myStarted = false;
    },
    start: function () {

        let additionalSetup = {};
        additionalSetup.myHandedness = [null, 'left', 'right'][this._myHandedness];
        additionalSetup.myShowOnStart = this._myShowOnStart;
        additionalSetup.myShowVisibilityButton = this._myShowVisibilityButton;
        additionalSetup.myEnableAdditionalButtons = true;
        additionalSetup.myEnableGamepadScrollVariable = this._myEnableGamepadScrollVariable;
        additionalSetup.myPlaneMaterial = PP.myDefaultResources.myMaterials.myFlatOpaque;
        additionalSetup.myTextMaterial = PP.myDefaultResources.myMaterials.myText;

        additionalSetup.myEnableVariablesImportExportButtons = this._myEnableVariablesImportExportButtons;
        additionalSetup.myVariablesImportPath = this._myVariablesImportPath;
        additionalSetup.myVariablesExportPath = this._myVariablesExportPath;

        this._myWidget.start(this.object, additionalSetup, PP.myEasyTuneVariables._getInternalMap());

        this._myWidgetVisibleBackup = this._myWidget.isVisible();
        this._mySetVisibleNextUpdate = false;

        this._myStarted = true;
        this._myFirstUpdate = true;
    },
    update: function (dt) {
        if (this._myFirstUpdate) {
            this._myFirstUpdate = false;
            if (this._myImportVariablesOnStart) {
                PP.importEasyTuneVariables(this._myVariablesImportPath, true);
            }
        }

        if (this._mySetVisibleNextUpdate) {
            this._mySetVisibleNextUpdate = false;
            this._myWidget.setVisible(false);
            this._myWidget.setVisible(this._myWidgetVisibleBackup);
        }

        this._myWidget.update(dt);
    },
    onActivate() {
        this._mySetVisibleNextUpdate = true;
    },
    onDeactivate() {
        if (this._myStarted) {
            this._myWidgetVisibleBackup = this._myWidget.isVisible();

            this._myWidget.setVisible(false);
        }
    },
});

PP.myEasyTuneVariables = new PP.EasyTuneVariables();

PP.myEasyTuneTarget = null;

PP.setEasyTuneWidgetActiveVariable = function (variableName) {
    for (let callback of PP._setEasyTuneWidgetActiveVariableCallbacks) {
        callback(variableName);
    }
};
PP._setEasyTuneWidgetActiveVariableCallbacks = [];

PP.refreshEasyTuneWidget = function () {
    for (let callback of PP._refreshEasyTuneWidgetCallbacks) {
        callback();
    }
};
PP._refreshEasyTuneWidgetCallbacks = [];

PP.importEasyTuneVariables = function (filePath = null, resetDefaultValue = false) {
    if (filePath == null) {
        // clipboard
    } else {
        // fetch
    }

    PP.refreshEasyTuneWidget();

    console.error("imported");
};

PP.exportEasyTuneVariables = function (filePath = null) {
    if (filePath == null) {
        // clipboard
    } else {
        // fetch
    }

    console.error("exported");
};