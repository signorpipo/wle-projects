VirtualGamepadButtonParams = class VirtualGamepadButtonParams {
    constructor() {
        this.myBackColor = "";
        this.myIconColor = "";

        this.myIconShape = VirtualGamepadIconShape.NONE;
        this.myLabel = "";
    }
};

VirtualGamepadThumbstickParams = class VirtualGamepadThumbstickParams {
    constructor() {
        this.myBackColor = "";
        this.myThumbstickColor = "";
        this.myIconColor = "";

        this.myIconShape = VirtualGamepadIconShape.NONE;
        this.myLabel = "";
    }
};

VirtualGamepadIconShape = {
    NONE: 0,
    LABEL: 1,
    DOT: 2,
    CIRCLE: 3,
    SQUARE: 4,
    RING: 5,
    FRAME: 6,
};

VirtualGamepadParams = class VirtualGamepadParams {
    constructor() {
        this.myShowOnDesktop = false;

        this.myOpacity = 0.5;

        this.myScale = 1;
        this.myScaleFont = 1;
        this.myScaleMargin = 1;

        this.myLabelFontFamily = "";
        this.myLabelFontWeight = "";

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

        this._defaultSetup();
    }

    _defaultSetup() {
        this.myLabelFontFamily = "sans-serif";
        this.myLabelFontWeight = "normal";

        // Params

        let backColor = "#616161";
        let iconColor = "#e0e0e0";

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SQUEEZE].myBackColor = backColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SQUEEZE].myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SQUEEZE].myIconShape = VirtualGamepadIconShape.SQUARE;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myBackColor = backColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.SELECT].myIconShape = VirtualGamepadIconShape.FRAME;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.TOP_BUTTON].myBackColor = backColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.TOP_BUTTON].myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.TOP_BUTTON].myIconShape = VirtualGamepadIconShape.CIRCLE;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.BOTTOM_BUTTON].myBackColor = backColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconShape = VirtualGamepadIconShape.RING;

        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.THUMBSTICK].myBackColor = backColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.THUMBSTICK].myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.LEFT][PP.GamepadButtonID.THUMBSTICK].myIconShape = VirtualGamepadIconShape.DOT;

        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SQUEEZE].myBackColor = backColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SQUEEZE].myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SQUEEZE].myIconShape = VirtualGamepadIconShape.SQUARE;

        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SELECT].myBackColor = backColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SELECT].myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.SELECT].myIconShape = VirtualGamepadIconShape.FRAME;

        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myBackColor = backColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.TOP_BUTTON].myIconShape = VirtualGamepadIconShape.CIRCLE;

        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.BOTTOM_BUTTON].myBackColor = backColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.BOTTOM_BUTTON].myIconShape = VirtualGamepadIconShape.RING;

        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.THUMBSTICK].myBackColor = backColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.THUMBSTICK].myIconColor = iconColor;
        this.myButtonParams[PP.Handedness.RIGHT][PP.GamepadButtonID.THUMBSTICK].myIconShape = VirtualGamepadIconShape.DOT;

        this.myThumbstickParams[PP.Handedness.LEFT].myBackColor = backColor;
        this.myThumbstickParams[PP.Handedness.LEFT].myThumbstickColor = iconColor;
        this.myThumbstickParams[PP.Handedness.LEFT].myIconColor = backColor;

        this.myThumbstickParams[PP.Handedness.RIGHT].myBackColor = backColor;
        this.myThumbstickParams[PP.Handedness.RIGHT].myThumbstickColor = iconColor;
        this.myThumbstickParams[PP.Handedness.RIGHT].myIconColor = backColor;

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
    }
};