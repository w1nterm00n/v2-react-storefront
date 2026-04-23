// src/lib/medusa.js

import Medusa from "@medusajs/medusa-js";

// Medusa backend v2 runs on http://localhost:9000 by default.
const medusa = new Medusa({
  baseUrl: "http://localhost:9000", // Use your own address if it is not local.
  maxRetries: 3, // Adjust or remove if needed.
  publishableApiKey: "pk_03343001037bbe734ff63d70aae9a7797b5b381f248cc85fad3404dec1675847",
});

export default medusa;
