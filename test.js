const puppeteer = require("puppeteer");
const inquirer = require("inquirer");
var fs = require("fs");

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  var questions = [
    {
      type: "input",
      name: "ssense-email",
      message: "What's your SSense email?"
    },
    {
      type: "password",
      name: "ssense-pw",
      message: "What's your SSense password?"
    }
  ];
  await page.goto("https://www.ssense.com/en-us/account/login");
  await inquirer.prompt(questions).then(answers => {
    let se = answers["ssense-email"];
    let sp = answers["ssense-pw"];
    page.$eval("input[name=email]", (el, _se) => (el.value = _se), se);
    page.$eval("input[name=password]", (el, _sp) => (el.value = _sp), sp);
    page.$eval(
      "#wrap > div > div > div > div.login-section.span5.offset2.no-padding.tablet-landscape-full-fluid-width > form",
      form => form.submit()
    );
  });
  await page.waitFor(1000);
  await page.goto("https://www.ssense.com/en-us/account/wishlist");
  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    let arr = "";
    let items = document.querySelectorAll(".browsing-product-item > a");

    items.forEach(item => {
      arr = '<DT><A HREF="' + item.href + '"></A>' + arr;
    });
    return arr;
  });

  browser.close();
  return result;
};

scrape().then(value => {
  // writeFile function with filename, content and callback function
  fs.writeFile(
    "ssense-export.html",
    "<!DOCTYPE NETSCAPE-Bookmark-file-1><HTML><DL><p>" + value + "</DL></HTML>",
    function(err) {
      if (err) throw err;
      console.log("File is created successfully.");
    }
  );
});
