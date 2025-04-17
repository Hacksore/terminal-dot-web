import ssh from "ssh2";
import { generateKeyPairSync } from "node:crypto";

// TODO: use a static key in pr
const { privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1", // Use pkcs1 format which is compatible with ssh2
    format: "pem",
  },
});

const server = new ssh.Server(
  {
    hostKeys: [privateKey], // Using our generated key
  },
  (client) => {
    console.log("Client connected!");

    // Accept any authentication method
    client.on("authentication", (ctx) => {
      // Accept any authentication attempt
      console.log(
        `Authentication attempt from ${ctx.username} using ${ctx.method}`,
      );
      ctx.accept();
    });

    client.on("ready", () => {
      console.log("Client authenticated!");

      client.on("session", (accept) => {
        const session = accept();

        session.on("shell", (accept) => {
          const stream = accept();
          stream.write("You buy things on the web, not via SSH!\n");
          stream.write("terminalcoffeee.shop");
        });
      });
    });

    client.on("error", (err) => {
      console.error("Client error:", err);
    });
  },
);

// Listen on all interfaces
const PORT = 2222;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`SSH server listening on port ${PORT}`);
  console.log("WARNING: This server accepts any connection and is NOT secure!");
  console.log("This is for demonstration purposes only.");
});
