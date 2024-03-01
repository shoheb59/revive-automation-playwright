const { test, expect } = require('@playwright/test');
import { DataGenerator } from '../utility/datagenrator';
import testData from '../utility/testData.json'


export class OnboardPage {
    constructor(page) {
        this.page = page;
        this.dataGenerator = new DataGenerator(); 
    }

    

    weblocators = {
        txt_email: "[name = 'email']",
        txt_fName: "[name = 'first_name']",
        txt_lName: "[name = 'last_name']",
        txt_companyName: "[name = 'company_name']",
        txt_storeURL: '[name = "website"]',
        btn_submit: "[type ='submit']",
        txt_createPass: "[name = 'password']",
        btn_skip:"[name= 'ArrowRight']",
        btn_next: "[type = 'submit']",
        btn_checkBox: "[role ='checkbox']",
        btn_next1: "//div[contains(text(),'Next')]",
        btn_logOut: "//p[contains(text(), 'Logout')]",
        duplicateEmail_error: "//p[contains(text(), 'An account with this email already exists')]"

    }

    

    async openURL() {
        await this.page.goto("https://revibe-web-client-voyage-sms-voyagesms.vercel.app");
    }

    async enterEmail() {
        const email = "hasnat" + this.dataGenerator.generateRandomFourDigitPhoneNumber() + "@yopmail.com";
        await this.page.locator(this.weblocators.txt_email).type(email)
    }
    async emailAssertion()
    {
        const emailInputLocator = this.page.locator(this.weblocators.txt_email);
        await expect(emailInputLocator).not.toBeNull();
    }

    async duplicateEmail()
    {
        await this.page.locator(this.weblocators.txt_email).type('hasnat1@yopmail.com')
    }

    async verifyErrorMessage()
    {
        const ErrorMessage = await this.page.locator(this.weblocators.duplicateEmail_error)
        expect(ErrorMessage).toContainText('An account with this email already exists')
    }

    async enterFirstName() {
        
        await this.page.locator(this.weblocators.txt_fName).type(testData.Firstname);
    }

    async firstNameAssertion()
    {
        const nameInputLocator = this.page.locator(this.weblocators.txt_fName);
        await expect(nameInputLocator).not.toBeNull();
    }

    async enterLastName() {
        await this.page.locator(this.weblocators.txt_lName).type(testData.LastName)
    }

    async enterCompanyName() {
        await this.page.locator(this.weblocators.txt_companyName).type(testData.CompanyName)
    }

    async enterStoreURL() {
        await this.page.locator(this.weblocators.txt_storeURL).type(testData.StoreURL)
    }

    async clickSubmitBtn() {
        await this.page.locator(this.weblocators.btn_submit).click()
        await this.page.waitForNavigation();
    }
    async enterPassword()
    {
        await this.page.locator(this.weblocators.txt_createPass).type(testData.PassWord)
       
    }

    async clickNextButton()
    {
        await this.page.locator(this.weblocators.btn_next).click()
        await this.page.waitForNavigation();
    }

    async clickSkipButton()
    {
        await this.page.locator(this.weblocators.btn_skip).click();
        await this.page.waitForNavigation();
    }
    async clickNextButtonOnSetDiscountPage()
    {
       const nextButton = await this.page.locator(this.weblocators.btn_next);
       await nextButton.scrollIntoViewIfNeeded(); // Scroll the button into view if needed
       await nextButton.click();
       await this.page.waitForNavigation();

    }

    async clickCheckbox()
    {
        await this.page.locator(this.weblocators.btn_checkBox).click();
    }
    async clickNextButtonAgain()
    {
        await this.page.locator(this.weblocators.btn_next1).click()
        await this.page.waitForNavigation();

    }

    async verifyLogoutButton()
    {
        const logoutButton = await this.page.locator(this.weblocators.btn_logOut);
        await logoutButton.waitFor({ state: 'visible', timeout: 100000 });
        const buttonText = await logoutButton.innerText();
        
        // Assert that the button text contains "Logout"
        expect(buttonText).to.contain('Logout');
    }
}