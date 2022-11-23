# Update Checker for Pi-hole

Checks for a new version of [Pi-hole](https://pi-hole.net/) and send [Pushover](https://pushover.net/) notification.

This script is a one time checker, so it needs to be scheduled to continuously
check for updates. It sends a notification even if there is no update, as I run
this once a week and want to have a confirmation that the script is still
running.

## Prerequisites

- [Deno](https://deno.land)

## Configuration

Create a `.env` file in the root of the project folder with the following
content:

```
PUSHOVER_TOKEN=Your access token, see (https://pushover.net/api)
PUSHOVER_USER=Pushover User ID (the user/group key (not e-mail address often referred to as USER_KEY)
```

## Compile

`deno compile --allow-read --allow-write --allow-env --allow-net main.ts`

## Running

`deno run --allow-read --allow-write --allow-env --allow-net main.ts`

