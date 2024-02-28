const { test, expect } = require('@playwright/test');
const { skip } = require('node:test');

test.only('Mocking Third-Party API Call', async ({ page }) => {
    // Define a route handler to intercept the API request
    await page.route('https://cdp.customer.io/v1/p', async (route) => {
        console.log('Route intercepted:', route.request().url());
        // Respond with mock data
        const json = [{ success: true }]
        await route.fulfill({
            // status: 200,
            // contentType: 'application/json',
            // body: JSON.stringify({ success: true })
            json
        });
    });

    // Perform actions on the page that trigger the API call
    await page.goto('https://app.liverecover.io/account/signup/info');

    // Add assertions here if needed
});

test.skip('Mock API 2', async({page})=>{
    await page.route('https://forms.hscollectedforms.net/collected-forms/v1/config/json?portalId=8313797&utk=081df9adb635a686dd79d94e5bd54ec5', async(route) =>{
    console.log('Route intercepted:', route.request().url());
    
    await route.fulfill({
            status: 404,
            contentType: 'applicaiton/json',
            body: JSON.stringify({

                "portalId": 8313797,
                "submissionsApiDomain": "forms.hubspot.com",
                "reportScraperTest": false,
                "formCaptureEnabled": true
            })
        })

    })
     // Perform actions on the page that trigger the API call
     await page.goto('https://app.liverecover.io/account/signup/info');
      // Assert that a specific element is present on the page after the API call
    const elementExists = await page.waitForSelector('[name="email"]', { timeout: 5000 });
    expect(elementExists).toBeTruthy();
})