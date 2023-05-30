# GitHub Webhook Event Notifications

GitHub is a popular platform used by developers to collaborate on software projects.
However, it can be challenging to keep track of all the activities and events across multiple repositories.
GitHub's built-in notification system may not always meet everyone's specific needs.

The purpose of this project is to simplify the process of receiving GitHub notifications.
With GitHub Event Notifications, you will automatically receive notifications for events like new issues,
pull requests, comments, and releases in your Telegram messenger.
This way, you can stay up to date with the latest developments and never miss important updates.

Whether you're a developer working on multiple repositories,
a team member interested in specific issues, or a project maintainer keeping an eye on pull requests,
GitHub Event Notifications makes it easy to enhance your GitHub experience and improve your workflow efficiency.

In this repository, you'll find all the information and resources you need to set up
and use the GitHub Event Notifications tool. Get started and ensure that you're always
in the loop with GitHub events.

For more API usages:
https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads

# How to deploy?

1. Fork this project
2. Sign up/in into [Deno Deploy](https://deno.com/deploy)
3. Create a [new project](https://dash.deno.com/new)
   1. Select the forked project
   2. Select the main branch (or your custom one)
   3. Name your project
   4. Add 2 environment variables:
      1. Key: TOKEN, Value: **(your custom telegram bot key from [botfather](https://t.me/botfather))**
      2. Key: WEBHOOK, Value: **(your custom telegram channel/group id see [here](https://gist.github.com/mraaroncruz/e76d19f7d61d59419002db54030ebe35))**
      3. Key: WEBHOOK_SECRET, Value: **(random generated string that can contain anything)**
4. Go to [dashboard](https://dash.deno.com/projects/) and select a newly created project
5. Copy deploy domain which does not contain random id
   1. ✅ your-project-name.deno.dev
   2. ❌ your-project-name-1234567890ab.deno.dev
6. Go to your organization page -> settings -> webhooks (https://github.com/organizations/<your-organization>/settings/hooks)
7. Add new webhook
   1. Click on "Add webhook" button
   2. Payload URL: insert deploy domain from step 5
   3. Secret: insert WEBHOOK_SECRET from step 3
   4. Content type: application/json
   5. SSL verification: enable
   6. Which events would you like to trigger this webhook: choose your preferred
   7. Check Active checkbox
8. PROFIT!

> **Reminder!**
> If you forget WEBHOOK_SECRET token, feel free to regenerate and change tokens as this service won't work without it.
