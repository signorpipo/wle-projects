VirtualGamepadButtonParams = class VirtualGamepadButtonParams {
    constructor() {
        this.myIconParams = new VirtualGamepadIconParams();
    }
};

VirtualGamepadThumbstickParams = class VirtualGamepadThumbstickParams {
    constructor() {
        this.myBackColor = "";

        this.myIconParams = new VirtualGamepadIconParams();
    }
};

VirtualGamepadParams = class VirtualGamepadParams {
    constructor() {
        this.myShowOnDesktop = false;

        this.myOpacity = 0.5;

        this.myScale = 1;

        this.myLabelFontFamily = "";
        this.myLabelFontWeight = "";

        this.myReleaseOnMouseLeave = false; // if mouse leaves the canvas it will be like it was released

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
        // Params

        let backColor = "#616161";
        let iconColor = "#e0e0e0";

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SQUEEZE].myIconParams.myBackColor = backColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SQUEEZE].myIconParams.myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SQUEEZE].myIconParams.myIconShape = VirtualGamepadIconShape.SQUARE;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myBackColor = backColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconParams.myIconShape = VirtualGamepadIconShape.FRAME;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myBackColor = backColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myIconShape = VirtualGamepadIconShape.CIRCLE;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconParams.myBackColor = backColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconParams.myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconParams.myIconShape = VirtualGamepadIconShape.RING;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.THUMBSTICK].myIconParams.myBackColor = backColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.THUMBSTICK].myIconParams.myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.THUMBSTICK].myIconParams.myIconShape = VirtualGamepadIconShape.DOT;

        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SQUEEZE].myIconParams.myBackColor = backColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SQUEEZE].myIconParams.myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SQUEEZE].myIconParams.myIconShape = VirtualGamepadIconShape.SQUARE;

        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SELECT].myIconParams.myBackColor = backColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SELECT].myIconParams.myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SELECT].myIconParams.myIconShape = VirtualGamepadIconShape.FRAME;

        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myBackColor = backColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconParams.myIconShape = VirtualGamepadIconShape.CIRCLE;

        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconParams.myBackColor = backColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconParams.myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconParams.myIconShape = VirtualGamepadIconShape.RING;

        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.THUMBSTICK].myIconParams.myBackColor = backColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.THUMBSTICK].myIconParams.myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.THUMBSTICK].myIconParams.myIconShape = VirtualGamepadIconShape.DOT;

        this.myThumbstickParams[PP.Handedness.LEFT].myBackColor = backColor;
        this.myThumbstickParams[PP.Handedness.LEFT].myIconParams.myBackColor = iconColor;
        this.myThumbstickParams[PP.Handedness.LEFT].myIconParams.myIconColor = backColor;

        this.myThumbstickParams[PP.Handedness.RIGHT].myBackColor = backColor;
        this.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myBackColor = iconColor;
        this.myThumbstickParams[PP.Handedness.RIGHT].myIconParams.myIconColor = backColor;

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