const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com/'

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    
    instagram.browser = await puppeteer.launch({
      headless: false
    })

    instagram.page = await instagram.browser.newPage();

    
  },

  login: async (username, password) => {

    await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    let loginButton = await instagram.page.$x('//a[contains(text(), "Log in")]');
    // let LOGIN_SELECTOR = '#react-root > section > main > article > div.rgFsT > div:nth-child(2) > p > a'

    // await instagram.page.click(LOGIN_SELECTOR);

    
    // click on the login url button
    await loginButton[0].click();
    
    await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' });

    await instagram.page.waitFor(1000)

    // writing the username and password
    await instagram.page.type('input[name="username"]', username, {delay: 50})
    await instagram.page.type('input[name="password"]', password, {delay: 50})

    loginButton = await instagram.page.$x('//div[contains(text(), "Log in")]');
    await loginButton[0].click();

    debugger;
  }
}

module.exports = instagram;