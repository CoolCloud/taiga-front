var utils = require('../utils');

var helper = module.exports;

helper.saveWebHook = async function(name, email, key) {
    let inputs = $$('input[type="text"]');

    await utils.common.clear(inputs.get(0));
    await utils.common.clear(inputs.get(1));
    await utils.common.clear(inputs.get(2));

    await inputs.get(0).sendKeys(name);
    await inputs.get(1).sendKeys(email);
    await inputs.get(2).sendKeys(key);

    let newWebHook = await $('.add-new').isDisplayed();

    if(newWebHook) {
        await $('.add-new').click();
        return browser.waitForAngular();
    } else {
        await $('.edit-existing').click();
        return browser.waitForAngular();
    }
};

helper.getErrors = function() {
    return $$('.checksley-error-list');
};

helper.currentWebHookIsPresent = function() {
    return $('div[tg-webhook]').isPresent();
};

helper.deleteWebhook = async function() {
    let deleteButton = $('.delete-webhook');

    await browser.actions().mouseMove(deleteButton).click().perform();

    await utils.lightbox.confirm.ok();

    return browser.waitForAngular();
};

helper.openEditModeWebHook = function() {
    let editButton = $('.edit-webhook');

    editButton.click();
};

helper.getWebHookMode = async function() {
    let visualizationMode = $('.visualization-mode');

    let vModeState = await utils.common.hasClass(visualizationMode, 'hidden');

    if (vModeState) return 'edit';
    else return 'read';
};
