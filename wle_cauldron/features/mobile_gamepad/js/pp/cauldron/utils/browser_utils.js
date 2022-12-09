PP.BrowserUtils = {
    isMobileBrowser: function () {
        return /Mobi/i.test(window.navigator.userAgent);
    },
    isVRBrowser: function () {
        return WL.vrSupported == 1;
    },
    isDesktopBrowser: function () {
        return !PP.BrowserUtils.isMobileBrowser() && !PP.BrowserUtils.isVRBrowser();
    },
};