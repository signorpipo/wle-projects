VirtualGamepadButtonParams = class VirtualGamepadButtonParams {
    constructor() {
        this.myIconParams = new VirtualGamepadIconParams();
    }
};

VirtualGamepadThumbstickParams = class VirtualGamepadThumbstickParams {
    constructor() {
        this.myBackColor = "";
        this.myBackColorPressed = "";

        this.myMaxDistanceFromCenterMultiplier = 1;

        this.myIconParams = new VirtualGamepadIconParams();
    }
};

VirtualGamepadParams = class VirtualGamepadParams {
    constructor() {
        this.myShowOnDesktop = false;

        this.myOpacity = 1;

        this.myScale = 1;

        this.myReleaseOnMouseLeave = false; // if mouse leaves the canvas it will be like it was released
        this.myStopPropagatingMouseDownEvents = true; // this can be used to make it so the rest of the game will ignore clicks on the virtual gamepad

        // Advanced Params

        this.myButtonParams = [];
        this.myButtonParams[PP.Handedness.LEFT] = [];
        this.myButtonParams[PP.Handedness.RIGHT] = [];

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT] = new VirtualGamepadButtonParams();
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SQUEEZE] = new VirtualGamepadButtonParams();
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.THUMBSTICK] = new VirtualGamepadButtonParams();
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.TOP_BUTTON] = new VirtualGamepadButtonParams();
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.BOTTOM_BUTTON] = new VirtualGamepadButtonParams();

        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SELECT] = new VirtualGamepadButtonParams();
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SQUEEZE] = new VirtualGamepadButtonParams();
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.THUMBSTICK] = new VirtualGamepadButtonParams();
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON] = new VirtualGamepadButtonParams();
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.BOTTOM_BUTTON] = new VirtualGamepadButtonParams();

        this.myThumbstickParams = [];
        this.myThumbstickParams[PP.Handedness.LEFT] = new VirtualGamepadThumbstickParams();
        this.myThumbstickParams[PP.Handedness.RIGHT] = new VirtualGamepadThumbstickParams();

        this.myButtonsOrder = [];
        this.myButtonsOrder[PP.Handedness.LEFT] = [null, null, null, null, null];
        this.myButtonsOrder[PP.Handedness.RIGHT] = [null, null, null, null, null];

        this.myThumbsticksOrder = [];
        this.myThumbsticksOrder[PP.Handedness.LEFT] = null;
        this.myThumbsticksOrder[PP.Handedness.RIGHT] = null;

        // Even More Advanced Params

        this.myScaleLabelFont = 1;
        this.myScaleMargin = 1;

        this.myMarginLeft = 0;
        this.myMarginRight = 0;
        this.myMarginBottom = 0;

        this.myThumbstickSize = 0;

        this.myButtonSize = 0;
        this.myButtonsRingRadius = 0;
        this.myButtonsRingStartAngle = 0;
        this.myButtonsRingEndAngle = 0;

        this.myFontSize = 0;

        this.myMinSizeMultiplier = 0;  // can be used to specify a min size based on the view width for when the view is in portrait mode

        this._defaultSetup();
    }

    _defaultSetup() {
        this.myOpacity = 0.5;

        // Params

        let backColor = "#616161";
        let iconColor = "#e0e0e0";

        for (let handedness in this.myButtonParams) {
            for (let gamepadButtonID in this.myButtonParams[handedness]) {
                let buttonParams = this.myButtonParams[handedness][gamepadButtonID];
                buttonParams.myIconParams.myBackColor = backColor;
                buttonParams.myIconParams.myBackColorPressed = iconColor;
                buttonParams.myIconParams.myIconColor = iconColor;
                buttonParams.myIconParams.myIconColorPressed = backColor;
            }
        }

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SQUEEZE].myIconParams.myIconShape = VirtualGamepadIconShape.SQUARE;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SQUEEZE].myIconParams.myIconShape = VirtualGamepadIconShape.SQUARE;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myIconShape = VirtualGamepadIconShape.FRAME;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SELECT].myIconParams.myIconShape = VirtualGamepadIconShape.FRAME;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myIconShape = VirtualGamepadIconShape.CIRCLE;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myIconShape = VirtualGamepadIconShape.CIRCLE;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconParams.myIconShape = VirtualGamepadIconShape.RING;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconParams.myIconShape = VirtualGamepadIconShape.RING;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.THUMBSTICK].myIconParams.myIconShape = VirtualGamepadIconShape.DOT;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.THUMBSTICK].myIconParams.myIconShape = VirtualGamepadIconShape.DOT;


        for (let handedness in this.myThumbstickParams) {
            let thumbstickParams = this.myThumbstickParams[handedness];
            thumbstickParams.myBackColor = backColor;
            thumbstickParams.myIconParams.myBackColor = iconColor;
            thumbstickParams.myIconParams.myBackColorPressed = iconColor;
            thumbstickParams.myIconParams.myIconColor = backColor;
            thumbstickParams.myIconParams.myIconColorPressed = backColor;
        }

        // Orders

        this.myButtonsOrder[PP.Handedness.LEFT][0] = [PP.Handedness.LEFT, PP.GamepadButtonID.SQUEEZE];
        this.myButtonsOrder[PP.Handedness.LEFT][1] = [PP.Handedness.LEFT, PP.GamepadButtonID.SELECT];
        this.myButtonsOrder[PP.Handedness.LEFT][2] = [PP.Handedness.LEFT, PP.GamepadButtonID.TOP_BUTTON];
        this.myButtonsOrder[PP.Handedness.LEFT][3] = [PP.Handedness.LEFT, PP.GamepadButtonID.BOTTOM_BUTTON];
        this.myButtonsOrder[PP.Handedness.LEFT][4] = [PP.Handedness.LEFT, PP.GamepadButtonID.THUMBSTICK];

        this.myButtonsOrder[PP.Handedness.RIGHT][0] = [PP.Handedness.RIGHT, PP.GamepadButtonID.SQUEEZE];
        this.myButtonsOrder[PP.Handedness.RIGHT][1] = [PP.Handedness.RIGHT, PP.GamepadButtonID.SELECT];
        this.myButtonsOrder[PP.Handedness.RIGHT][2] = [PP.Handedness.RIGHT, PP.GamepadButtonID.TOP_BUTTON];
        this.myButtonsOrder[PP.Handedness.RIGHT][3] = [PP.Handedness.RIGHT, PP.GamepadButtonID.BOTTOM_BUTTON];
        this.myButtonsOrder[PP.Handedness.RIGHT][4] = [PP.Handedness.RIGHT, PP.GamepadButtonID.THUMBSTICK];

        this.myThumbsticksOrder[PP.Handedness.LEFT] = PP.Handedness.LEFT;
        this.myThumbsticksOrder[PP.Handedness.RIGHT] = PP.Handedness.RIGHT;

        // Sizes

        this.myThumbstickSize = 15;
        this.myMarginLeft = 3;
        this.myMarginRight = 3;
        this.myMarginBottom = 3;

        this.myButtonSize = 5;
        this.myButtonsRingRadius = 12;
        this.myButtonsRingStartAngle = 385;
        this.myButtonsRingEndAngle = 245;

        this.myLabelFontSize = 2;

        this.myMinSizeMultiplier = 5 / 3;
    }
};