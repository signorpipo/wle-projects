WL.registerComponent("add-easy-tune-variables", {
}, {
    init: function () {
    },
    start: function () {
        PP.myEasyTuneVariables.add(new PP.EasyTuneNumber("Float 1", 1.00, 0.1, 3));
        PP.myEasyTuneVariables.add(new PP.EasyTuneNumberArray("Float Array", [1.00, 2.00, 3.00], 0.1, 3));
        PP.myEasyTuneVariables.add(new PP.EasyTuneNumberArray("Float Array 2", [1.00, 3.00, 2.00], 0.1, 3));
        PP.myEasyTuneVariables.add(new PP.EasyTuneInt("Int", 1, 1));
        PP.myEasyTuneVariables.add(new PP.EasyTuneIntArray("Int Array", [1, 2, 3], 1));
        PP.myEasyTuneVariables.add(new PP.EasyTuneBool("Bool", false));
        PP.myEasyTuneVariables.add(new PP.EasyTuneBoolArray("Bool Array", [false, true, false]));
        PP.myEasyTuneVariables.add(new PP.EasyTuneTransform("Transform", PP.mat4_create(), true));
        PP.myEasyTuneVariables.add(new PP.EasyTuneTransform("Transform 2", PP.mat4_create(), true));
    },
    update: function (dt) {
    }
});

PP.myAudioManager = null;