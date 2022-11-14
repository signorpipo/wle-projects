PP.myEasyTuneVariables = new PP.EasyTuneVariables();

PP.myEasyTuneTarget = null;

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

PP.mySetEasyTuneWidgetActiveVariableCallbacks = [];
PP.setEasyTuneWidgetActiveVariable = function (variableName) {
    for (let callback of PP.mySetEasyTuneWidgetActiveVariableCallbacks) {
        callback(variableName);
    }
};

PP.myRefreshEasyTuneWidgetCallbacks = [];
PP.refreshEasyTuneWidget = function () {
    for (let callback of PP.myRefreshEasyTuneWidgetCallbacks) {
        callback();
    }
};