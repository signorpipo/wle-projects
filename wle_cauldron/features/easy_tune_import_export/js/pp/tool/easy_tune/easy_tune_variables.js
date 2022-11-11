PP.EasyTuneVariables = class EasyTuneVariables {
    constructor() {
        this._myMap = new Map();
    }

    add(variable) {
        this._myMap.set(variable.myName, variable);
    }

    remove(variableName) {
        this._myMap.delete(variableName);
    }

    get(variableName) {
        let variable = this._myMap.get(variableName);
        if (variable) {
            return variable.getValue();
        }

        return null;
    }

    set(variableName, value, resetDefaultValue = false) {
        let variable = this._myMap.get(variableName);
        if (variable) {
            variable.setValue(value, resetDefaultValue);
        }
    }

    isActive(variableName) {
        let variable = this._myMap.get(variableName);
        if (variable) {
            return variable.myIsActive;
        }

        return false;
    }

    getEasyTuneVariable(variableName) {
        return this._myMap.get(variableName);
    }

    fromJSON(json, resetDefaultValue = false) {
        let objectJSON = JSON.parse(json);

        for (let variable of this._myStateMap.values()) {
            let variableValue = objectJSON[variable.myName];
            if (variableValue !== undefined) {
                variable.setValue(variableValue, resetDefaultValue);
            }
        }
    }

    toJSON() {
        let objectJSON = {};

        for (let variable of this._myStateMap.values()) {
            objectJSON[variable.myName] = variable.getValue();
        }

        return JSON.stringify(objectJSON);
    }

    registerValueChangedEventListener(variableName, callbackID, callback) {
        this._myMap.get(variableName).registerValueChangedEventListener(callbackID, callback);
    }

    unregisterValueChangedEventListener(variableName, callbackID, callback) {
        this._myMap.get(variableName).unregisterValueChangedEventListener(callbackID);
    }

    _getInternalMap() {
        return this._myMap;
    }
};