import { expect, test } from "@playwright/test";
import { authLinks } from "@/utils/auth";
import { getDefaultMailSlurpInbox, getMailSlurp } from "@/playwright/utils";

test.beforeAll(async () => {
  console.log("befoofofofofofofofofoof");
});

test("Sign up confirmation", async ({ page }) => {
  await page.goto(authLinks.sign_up);

  await expect(page.getByText("Sign up")).toBeVisible();

  // const mailSlurp = getMailSlurp();
  // const mailSlurpInbox = await getDefaultMailSlurpInbox(mailSlurp);
  //
  // await page.fill("input[name=name]", "John Doe");
  // await page.fill("input[name=e_mail]", mailSlurpInbox.emailAddress);
  // await page.fill("input[name=password]", "qwe123qwe");
  // await page.click("button[type=submit]");

  // const email = await mailSlurp.waitForLatestEmail(mailSlurpInbox.id);
  // console.log("email");
  // console.log(email);

  // await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
});

test("Sign up confirmation 2", async ({ page }) => {
  await page.goto(authLinks.sign_up);

  await expect(page.getByText("Sign up")).toBeVisible();
});
