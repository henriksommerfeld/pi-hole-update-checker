import { config } from "https://deno.land/std@0.165.0/dotenv/mod.ts";

export async function sendPushoverNotification(message: string) {
  const pushoverConfig = await config();
  const request = new Request("https://api.pushover.net/1/messages.json", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      user: pushoverConfig["PUSHOVER_USER"],
      token: pushoverConfig["PUSHOVER_TOKEN"],
      message,
    }),
  });
  await fetch(request)
    .then((response) => {
      if (response.ok) {
        console.log(`Pushover notification sent: ${message}`);
      } else {
        console.error(response);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
