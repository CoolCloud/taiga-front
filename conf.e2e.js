require("babel/register")({
    stage: 1
});

var utils = require('./e2e/utils');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'mocha',
    mochaOpts: {
        timeout: 5000
    },
    suites: {
        auth: 'e2e/auth/*.e2e.js',
        full: 'e2e/full/**/*.e2e.js'
    },
    onPrepare: function() {
        browser.get('http://localhost:9001/login');

        var username = $('input[name="username"]');
        username.sendKeys('admin');

        var password = $('input[name="password"]');
        password.sendKeys('123123');

        $('.submit-button').click();

        return browser.driver.wait(function() {
            return utils.common.closeCookies()
                .then(function() {
                    return browser.driver.getCurrentUrl()
                })
                .then(function(url) {
                    return url === 'http://localhost:9001/';
                });
        }, 10000);
    }
}