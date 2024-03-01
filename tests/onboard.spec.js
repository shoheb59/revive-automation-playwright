import { test, expect } from '@playwright/test';
import { OnboardPage } from "../pages/onboardingPage";


test.describe('Onboard Page Tests', () => {
    let onboardPage;

    // Initialize the page before each test
    test.beforeEach(async ({ page }) => {

        onboardPage = new OnboardPage(page);
        await onboardPage.openURL(); // Open the URL before each test
        await expect(page).toHaveTitle(/LiveRecover/);
    });

    test('Successful Onboard a User', async ({page}) => {
        test.setTimeout(320000);
        await onboardPage.enterEmail();
        await onboardPage.emailAssertion();
        await onboardPage.enterFirstName();
        await onboardPage.firstNameAssertion()
        await onboardPage.enterLastName();
        await onboardPage.enterCompanyName();
        await onboardPage.enterStoreURL();
        await onboardPage.clickSubmitBtn();
        await onboardPage.enterPassword();
        await onboardPage.clickNextButton();
        await onboardPage.clickSkipButton();
        await onboardPage.clickNextButtonOnSetDiscountPage();
        await onboardPage.clickCheckbox();
        await onboardPage.clickNextButtonAgain();

        //LogOut button assertion

        // console.log("log out button")
        // await onboardPage.verifyLogoutButton()
        // console.log("button found")
       
    });


    test('Error Message Check for Duplicate Email', async ({page})=> {
        await onboardPage.duplicateEmail()
        await onboardPage.enterFirstName();
        await onboardPage.enterLastName();
        await onboardPage.enterCompanyName();
        await onboardPage.enterStoreURL();
        await onboardPage.clickSubmitBtn();
        await onboardPage.verifyErrorMessage();
    })
});
