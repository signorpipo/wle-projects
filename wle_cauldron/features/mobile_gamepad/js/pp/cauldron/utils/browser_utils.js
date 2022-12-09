PP.BrowserUtils = {
    isMobileBrowser: function () {
        return /Mobi/i.test(window.navigator.userAgent) && !PP.BrowserUtils.isVRBrowser();
    },
    isDesktopBrowser: function () {
        return !PP.BrowserUtils.isMobileBrowser() && !PP.BrowserUtils.isVRBrowser();
    },
    isVRBrowser: function () {
        return WL.vrSupported == 1;
    },
};