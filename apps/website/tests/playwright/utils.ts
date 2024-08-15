import MailSlurp from "mailslurp-client";

export function getMailSlurp() {
  return new MailSlurp({
    apiKey: process.env.MAILSLURP_API_KEY ?? "",
  });
}

export async function getDefaultMailSlurpInbox(mailSlurp: MailSlurp) {
  return mailSlurp.getInbox(process.env.MAILSLURP_INBOX_ID ?? "");
}

export async function deleteUserFromSupabase() {}
