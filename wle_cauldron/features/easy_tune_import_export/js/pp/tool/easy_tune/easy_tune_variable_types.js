/*
Easy Tune Variables Examples

Number:         PP.myEasyTuneVariables.add(new PP.EasyTuneNumber("Float", 1.00, 0.1, 3));
Number Array:   PP.myEasyTuneVariables.add(new PP.EasyTuneNumberArray("Float Array", [1.00,2.00,3.00], 0.1, 3));
Int:            PP.myEasyTuneVariables.add(new PP.EasyTuneInt("Int", 1, 1));
Int Array:      PP.myEasyTuneVariables.add(new PP.EasyTuneIntArray("Int Array", [1,2,3], 1));
Bool:           PP.myEasyTuneVariables.add(new PP.EasyTuneBool("Bool", false));
Bool Array:     PP.myEasyTuneVariables.add(new PP.EasyTuneBoolArray("Bool Array", [false, true, false]));
Transform:      PP.myEasyTuneVariables.add(new PP.EasyTuneTransform("Transform", PP.mat4_create(), true));
*/

PP.EasyTuneVariableType = {
    NONE: 0,
    NUMBER: 1,
    BOOL: 2,
    TRANSFORM: 3
};

PP.EasyTuneVariable = class EasyTuneVariable {
    constructor(name, type) {
        this.myName = name.slice(0);
        this.myType = type;

        this.myValue = null;
        this.myInitialValue = null;

        this.myIsActive = false;

        this._myValueChangedCallbacks = new Map();      // Signature: callback(name, value)
    }

    getValue() {
        return this.myValue;
    }

    setValue(value, resetInitialValue = false) {
        let oldValue = this.myValue;
        this.myValue = value;

        if (resetInitialValue) {
            PP.EasyTuneVariable.prototype.setInitialValue.call(this, value);
        }

        PP.refreshEasyTuneWidget();

        if (oldValue != value) {
            this._triggerValueChangedCallback();
        }
    }

    setInitialValue(value) {
        this.myInitialValue = value;
    }

    registerValueChangedEventListener(id, callback) {
        this._myValueChangedCallbacks.set(id, callback);
    }

    unregisterValueChangedEventListener(id) {
        this._myValueChangedCallbacks.delete(id);
    }

    _triggerValueChangedCallback() {
        if (this._myValueChangedCallbacks.size > 0) {
            this._myValueChangedCallbacks.forEach(function (callback) { callback(this.myName, this.getValue()); }.bind(this));
        }
    }
};

PP.EasyTuneVariableArray = class EasyTuneVariableArray extends PP.EasyTuneVariable {
    constructor(name, type, value) {
        super(name, type);

        PP.EasyTuneVariableArray.prototype.setValue.call(this, value, true);
    }

    getValue() {
        return this.myValue.slice(0);
    }

    setValue(value, resetInitialValue = false) {
        let oldValue = this.myValue;
        this.myValue = value.slice(0);

        if (resetInitialValue) {
            PP.EasyTuneVariableArray.prototype.setInitialValue.call(this, value);
        }

        PP.refreshEasyTuneWidget();

        if (oldValue == null || !oldValue.pp_equals(value)) {
            this._triggerValueChangedCallback();
        }
    }

    setInitialValue(value) {
        this.myInitialValue = value.slice(0);
    }
};

//NUMBER

PP.EasyTuneNumberArray = class EasyTuneNumberArray extends PP.EasyTuneVariableArray {
    constructor(name, value, stepPerSecond, decimalPlaces, min = null, max = null, editAllValuesTogether = false) {
        super(name, PP.EasyTuneVariableType.NUMBER, value);

        this.myDecimalPlaces = decimalPlaces;
        this.myStepPerSecond = stepPerSecond;

        this.myInitialStepPerSecond = this.myStepPerSecond;

        this.myMin = min;
        this.myMax = max;

        this.myEditAllValuesTogether = editAllValuesTogether;

        this._clampValue(true);
    }

    setMax(max) {
        this.myMax = max;
        this._clampValue(false);
    }

    setMin(min) {
        this.myMin = min;
        this._clampValue(false);
    }

    _clampValue(resetInitialValue) {
        let clampedValue = this.myValue.vec_clamp(this.myMin, this.myMax);

        if (!resetInitialValue) {
            let clampedInitialValue = this.myInitialValue.vec_clamp(this.myMin, this.myMax);
            let initialValueChanged = !clampedInitialValue.vec_equals(this.myInitialValue, 0.00001);
            if (initialValueChanged) {
                PP.EasyTuneVariableArray.prototype.setInitialValue.call(this, clampedInitialValue);
            }
        }

        PP.EasyTuneVariableArray.prototype.setValue.call(this, clampedValue, resetInitialValue);
    }
};

PP.EasyTuneNumber = class EasyTuneNumber extends PP.EasyTuneNumberArray {
    constructor(name, value, stepPerSecond, decimalPlaces, min, max) {
        super(name, [value], stepPerSecond, decimalPlaces, min, max);
    }

    getValue() {
        return this.myValue[0];
    }

    setValue(value, resetInitialValue = false) {
        super.setValue([value], resetInitialValue);
    }

    setInitialValue(value) {
        super.setValue([value]);
    }
};

PP.EasyTuneInt = class EasyTuneInt extends PP.EasyTuneNumber {
    constructor(name, value, stepPerSecond, min, max) {
        super(name, value, stepPerSecond, 0, min, max);
    }
};

PP.EasyTuneIntArray = class EasyTuneIntArray extends PP.EasyTuneNumberArray {
    constructor(name, value, stepPerSecond, min, max, editAllValuesTogether) {
        let tempValue = value.slice(0);

        for (let i = 0; i < value.length; i++) {
            tempValue[i] = Math.round(tempValue[i]);
        }

        super(name, tempValue, stepPerSecond, 0, min != null ? Math.round(min) : null, max != null ? Math.round(max) : max, editAllValuesTogether);
    }
};

//BOOL

PP.EasyTuneBoolArray = class EasyTuneBoolArray extends PP.EasyTuneVariableArray {
    constructor(name, value) {
        super(name, PP.EasyTuneVariableType.BOOL, value);
    }
};

PP.EasyTuneBool = class EasyTuneBool extends PP.EasyTuneBoolArray {
    constructor(name, value) {
        super(name, [value]);
    }

    getValue() {
        return this.myValue[0];
    }

    setValue(value, resetInitialValue = false) {
        super.setValue([value], resetInitialValue);
    }

    setInitialValue(value) {
        super.setValue([value]);
    }
};

//EASY TUNE EASY TRANSFORM

PP.EasyTuneTransform = class EasyTuneTransform extends PP.EasyTuneVariable {
    constructor(name, value, scaleAsOne = true, positionStepPerSecond = 1, rotationStepPerSecond = 50, scaleStepPerSecond = 1) {
        super(name, PP.EasyTuneVariableType.TRANSFORM);

        this.myDecimalPlaces = 3;

        this.myPosition = value.mat4_getPosition();
        this.myRotation = value.mat4_getRotationDegrees();
        this.myScale = value.mat4_getScale();

        let decimalPlacesMultiplier = Math.pow(10, this.myDecimalPlaces);
        for (let i = 0; i < 3; i++) {
            this.myScale[i] = Math.max(this.myScale[i], 1 / decimalPlacesMultiplier);
        }

        this.myScaleAsOne = scaleAsOne;

        this.myPositionStepPerSecond = positionStepPerSecond;
        this.myRotationStepPerSecond = rotationStepPerSecond;
        this.myScaleStepPerSecond = scaleStepPerSecond;

        this.myInitialPosition = this.myPosition.vec3_clone();
        this.myInitialRotation = this.myRotation.vec3_clone();
        this.myInitialScale = this.myScale.vec3_clone();

        this.myInitialPositionStepPerSecond = this.myPositionStepPerSecond;
        this.myInitialRotationStepPerSecond = this.myRotationStepPerSecond;
        this.myInitialScaleStepPerSecond = this.myScaleStepPerSecond;

        this.myTransform = PP.mat4_create();
        this.myTransform.mat4_setPositionRotationDegreesScale(this.myPosition, this.myRotation, this.myScale);

        this.myTempTransform = PP.mat4_create();
    }

    getValue() {
        this.myTransform.mat4_setPositionRotationDegreesScale(this.myPosition, this.myRotation, this.myScale);
        return this.myTransform.slice(0);
    }

    setValue(value, resetInitialValue = false) {
        this.myTempTransform.mat4_setPositionRotationDegreesScale(this.myPosition, this.myRotation, this.myScale);

        value.mat4_getPosition(this.myPosition);
        value.mat4_getRotationDegrees(this.myRotation);
        value.mat4_getScale(this.myScale);

        this.myTransform.mat4_setPositionRotationDegreesScale(this.myPosition, this.myRotation, this.myScale);

        if (resetInitialValue) {
            PP.EasyTuneTransform.prototype.setInitialValue.call(this, value);
        }

        PP.refreshEasyTuneWidget();

        if (!this.myTempTransform.pp_equals(this.myTransform)) {
            this._triggerValueChangedCallback();
        }
    }

    setInitialValue(value) {
        this.myInitialPosition = value.mat4_getPosition();
        this.myInitialRotation = value.mat4_getRotationDegrees();
        this.myInitialScale = value.mat4_getScale();
    }
};