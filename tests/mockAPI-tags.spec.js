import { test, expect } from '@playwright/test';

test.beforeEach ( async ({page}) =>
{
    await page.route('https://conduit.productionready.io/api/tags', async route =>{
        const tags = {
            "tags": [
                "automation",
                "playwright",
                "Hasnat"
            ]
        }
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })
    await page.goto('https://angularjs.realworld.io');

})

test('has title', async ({page})=>{
    await expect (page.locator('.navbar-brand')).toHaveText('conduit')
})