// qawolf allows you to record the actions straight to playwright code

const qawolf = require("qawolf");

let browser;
let context;

beforeAll(async () => {
  browser = await qawolf.launch();
  context = await browser.newContext();
  await qawolf.register(context);
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("myToDoList", async () => {
  const page = await context.newPage();
  await page.goto("http://todomvc.com/examples/react/", { waitUntil: "domcontentloaded" });
  await qawolf.scroll(page, "html", { x: 0, y: 1 });
  await page.click(".new-todo");
  await page.fill(".new-todo", "Task 1");
  await page.press(".new-todo", "Enter");
  await page.fill(".new-todo", "Task 2");
  await page.press(".new-todo", "Enter");

  const page = await qawolf.waitForPage(context, 0, { waitUntil: "domcontentloaded" });
  await page.click(".new-todo");
  await page.fill(".new-todo", "Task 3");
  await page.press(".new-todo", "Enter");
  await page.click("li:nth-of-type(3) .toggle");

  await page.click(".toggle");
});