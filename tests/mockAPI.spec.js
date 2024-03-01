import { test, expect } from '@playwright/test';
const { skip } = require('node:test');

test.skip('Mocking Third-Party API Call', async ({ page }) => {
    // Define a route handler to intercept the API request
    await page.route('https://cdp.customer.io/v1/p', async (route) => {
        console.log('Route intercepted:', route.request().url());
        // Respond with mock data
        const json = [{ success: true }]
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(json)
            
        });
    });

    // Perform actions on the page that trigger the API call
    await page.goto('https://app.liverecover.io/account/signup/info');

});

test.skip('Mock API 2', async({page})=>{
    await page.route('https://forms.hscollectedforms.net/collected-forms/v1/config/json?portalId=8313797&utk=081df9adb635a686dd79d94e5bd54ec5', async(route) =>{
    console.log('Route intercepted:', route.request().url());
    
    await route.fulfill({
            status: 200,
            contentType: 'applicaiton/json',
            body: JSON.stringify({

                "portalId": 8313797,
                "submissionsApiDomain": "forms.hubspot.com",
                "reportScraperTest": true,
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




test('Mock API for fetching settings', async ({ page }) => {
    // Define mock response data
    const mockResponseData = {
        "integrations": {
            "Customer.io Data Pipelines": {
                "addBundledMetadata": false,
                "apiHost": "mocked-api-host.com",
                "apiKey": "mocked-api-key",
                "protocol": "https"
            }
        },
        "metrics": {
            "sampleRate": 0
        },
        "remotePlugins": []
    };

    // Intercept network requests
    await page.route('https://cdp.customer.io/v1/projects/c68cc12f162a8090de34/settings', async route => {
        // Respond with the mock response data
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockResponseData)
        });
    });

    // Visit the page that triggers the API request
    await page.goto('https://app.liverecover.com/');

    // Wait for the response
    const response = await page.waitForResponse('https://cdp.customer.io/v1/projects/c68cc12f162a8090de34/settings');

    // Assert the response status
    expect(response.status()).toBe(200);

    // Assert the response body content if needed
    const responseBody = await response.json();
    // Add assertions based on the structure of the response body
    // For example:
    // expect(responseBody.integrations["Customer.io Data Pipelines"].apiHost).toBe("mocked-api-host.com");
});







