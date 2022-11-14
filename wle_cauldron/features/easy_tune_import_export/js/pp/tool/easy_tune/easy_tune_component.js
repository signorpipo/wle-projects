WL.registerComponent('pp-easy-tune', {
    _myHandedness: { type: WL.Type.Enum, values: ['none', 'left', 'right'], default: 'none' },
    _myShowOnStart: { type: WL.Type.Bool, default: false },
    _myShowVisibilityButton: { type: WL.Type.Bool, default: false },
    _myEnableGamepadScrollVariable: { type: WL.Type.Bool, default: true },
    _myVariablesImportURL: { type: WL.Type.String, default: '' },
    _myVariablesExportURL: { type: WL.Type.String, default: '' },
    _myImportVariablesOnStart: { type: WL.Type.Bool, default: false },
    _myEnableVariablesImportExportButtons: { type: WL.Type.Bool, default: false },
    _myResetVariablesDefaultValueOnImport: { type: WL.Type.Bool, default: true }
}, {
    init: function () {
        this._myWidget = new PP.EasyTuneWidget();

        PP.mySetEasyTuneWidgetActiveVariableCallbacks.push(function (variableName) {
            this._myWidget.setActiveVariable(variableName);
        }.bind(this));

        PP.myRefreshEasyTuneWidgetCallbacks.push(function () {
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
        additionalSetup.myVariablesImportCallback = function () {
            PP.importEasyTuneVariables(this._myVariablesImportURL, this._myResetVariablesDefaultValueOnImport);
        };
        additionalSetup.myVariablesExportCallback = function () {
            PP.importEasyTuneVariables(this._myVariablesExportURL);
        };

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
                PP.importEasyTuneVariables(this._myVariablesImportURL, true);
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