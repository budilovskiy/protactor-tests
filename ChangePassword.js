/**
 * Created by Maxim on 14.03.2016.
 */

'use strict';

describe('Testing ModalPasswordChangeController', function () {
    var previousState = 'http://localhost:9000/';
    var correctOldPassword = 'correct';
    var incorrectOldPassword = 'incorrect';
    var newPassword = 'correct';
    var correctConfirmPassword = 'correct';
    var incorrectConfirmPassword = 'incorrect';

    var getPwdChangeWindow = function () {
        browser.get(previousState);
        // TODO: assign IDs to elements
        // click on user-info dropdown menu
        element(by.classNamed('dropdown-toggle')).click();
        // click on 'Change password' menu item
        element(by.classNamed('ng-scope')).click();
    };

    it("should render password-change modal window when user clicks on 'Change password' menu item", function () {
        getPwdChangeWindow();
        expect(findElement(by.tagName('h1'))).toMatch("Change password");
    });

    describe('password-change OK', function () {

        beforeEach(function () {
            getPwdChangeWindow();
            element(by.id('form-field-current')).sendKeys(correctOldPassword);
            element(by.id('form-field-new')).sendKeys(newPassword);
            element(by.id('form-field-confirm')).sendKeys(correctConfirmPassword);
            element(by.classNamed('btn btn-sm btn-primary')).click();
        });


        it('should navigate to previous state', function () {
            expect(browser.getLocationAbsUrl()).toMatch(previousState);
        });

    });


    describe('password-change WRONGPASSWORD', function () {

        beforeEach(function () {
            getPwdChangeWindow();
            element(by.id('form-field-current')).sendKeys(incorrectOldPassword);
            element(by.id('form-field-new')).sendKeys(newPassword);
            element(by.id('form-field-confirm')).sendKeys(correctConfirmPassword);
            element(by.classNamed('btn-primary')).click();
        });

        it('should show an alert with "Wrong password" message', function () {
            expect(element(by.classNamed('alert-danger'))).toMatch(previousState);
        });

    });

    describe('password-change PASSWORDMISSMATCH', function () {

        beforeEach(function () {
            getPwdChangeWindow();
            element(by.id('form-field-current')).sendKeys(incorrectOldPassword);
            element(by.id('form-field-new')).sendKeys(newPassword);
            element(by.id('form-field-confirm')).sendKeys(incorrectConfirmPassword);
            element(by.classNamed('btn-primary')).click();
        });

        it('should show an alert with "Passwords don\'t match" message', function () {
            // confirm input by.classNamed(has-error)
        });

    });
});
