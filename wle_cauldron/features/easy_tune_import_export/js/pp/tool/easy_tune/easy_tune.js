WL.registerComponent('pp-easy-tune', {
    _myHandedness: { type: WL.Type.Enum, values: ['none', 'left', 'right'], default: 'none' },
    _myShowOnStart: { type: WL.Type.Bool, default: false },
    _myShowVisibilityButton: { type: WL.Type.Bool, default: false },
    _myEnableGamepadScrollVariable: { type: WL.Type.Bool, default: true },
    _myVariablesImportURL: { type: WL.Type.String, default: '' },
    _myVariablesExportURL: { type: WL.Type.String, default: '' },
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
        additionalSetup.myVariablesImportURL = this._myVariablesImportURL;
        additionalSetup.myVariablesExportURL = this._myVariablesExportURL;

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

PP.importEasyTuneVariables = function (fileURL = null, resetDefaultValue = false) {
    if (fileURL == null || fileURL.length == 0) {
        if (navigator.clipboard) {
            navigator.clipboard.readText().then(
                function (clipboard) {
                    PP.myEasyTuneVariables.fromJSON(clipboard, resetDefaultValue);

                    PP.refreshEasyTuneWidget();

                    console.log("Easy Tune Variables Imported from: clipboard");
                    console.log(clipboard);
                }, function () {
                    console.error("An error occurred while importing the easy tune variables from: clipboard");
                }
            ).catch(function (reason) {
                console.error("An error occurred while importing the easy tune variables from: clipboard");
                console.error(reason);
            });
        }
    } else {
        fetch(fileURL).then(
            function (response) {
                if (response.ok) {
                    response.text().then(
                        function (text) {
                            PP.myEasyTuneVariables.fromJSON(text, resetDefaultValue);

                            PP.refreshEasyTuneWidget();

                            console.log("Easy Tune Variables Imported from:", fileURL);
                            console.log(text);
                        },
                        function (response) {
                            console.error("An error occurred while importing the easy tune variables from:", fileURL);
                            console.error(response);
                        }
                    );
                } else {
                    console.error("An error occurred while importing the easy tune variables from:", fileURL);
                    console.error(response);
                }
            },
            function (response) {
                console.error("An error occurred while importing the easy tune variables from:", fileURL);
                console.error(response);
            }
        ).catch(function (reason) {
            console.error("An error occurred while importing the easy tune variables from:", fileURL);
            console.error(reason);
        });
    }

    PP.refreshEasyTuneWidget();
};

PP.exportEasyTuneVariables = function (fileURL = null) {
    let jsonVariables = PP.myEasyTuneVariables.toJSON();

    if (fileURL == null || fileURL.length == 0) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(jsonVariables).then(
                function () {
                    console.log("Easy Tune Variables Exported to: clipboard");
                    console.log(jsonVariables);
                },
                function () {
                    console.error("An error occurred while exporting the easy tune variables to: clipboard");
                }
            ).catch(function (reason) {
                console.error("An error occurred while exporting the easy tune variables to: clipboard");
                console.error(reason);
            });
        }
    } else {
        fetch(fileURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: jsonVariables
        }).then(
            function (response) {
                if (response.ok) {
                    console.log("Easy Tune Variables Exported to:", fileURL);
                    console.log(jsonVariables);
                } else {
                    console.error("An error occurred while exporting the easy tune variables to:", fileURL);
                    console.error(response);
                }
            },
            function (response) {
                console.error("An error occurred while exporting the easy tune variables to:", fileURL);
                console.error(response);
            }
        ).catch(function (reason) {
            console.error("An error occurred while exporting the easy tune variables to:", fileURL);
            console.error(reason);
        });
    }
};