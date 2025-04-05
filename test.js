import "dotenv/config";
import Terminal from "@terminaldotshop/sdk";
import fs from "fs";

const client = new Terminal({
  bearerToken: process.env.TERMINAL_BEARER_TOKEN,
});

const apps = await client.app.list();

// deleta all apps
for (const app of apps.data) {
  await client.app.delete(app.id);
  console.log(`Deleted app: ${app.id}`);
}

const redirectURI = "http://localhost:3000/api/auth/callback/terminalProvider";
const app = await client.app.create({
  id: "testing",
  name: "testing",
  redirectURI,
});

// write the secrets to the .env.local file
const envFilePath = ".env.local";
const envContent = `
CLIENT_ID=${app.data.id}
CLIENT_SECRET=${app.data.secret}
`;

fs.writeFileSync(envFilePath, envContent.trim(), {
  encoding: "utf8",
  flag: "w",
});

console.log("Created app and saved credentials to .env.local");
// print the details of the created app
console.log("App created:", {
  clientId: app.data.id, // This is the client ID
  clientSecret: app.data.secret, // Be cautious with logging secrets
  redirectURI,
});
