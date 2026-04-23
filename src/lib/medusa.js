// src/lib/medusa.js

import Medusa from "@medusajs/medusa-js";
import { API_KEY, API_URL } from "../constants";

// Medusa backend v2 runs on http://localhost:9000 by default.
const medusa = new Medusa({
  baseUrl: API_URL,
  maxRetries: 3, // Adjust or remove if needed.
  publishableApiKey: API_KEY,
});

export default medusa;
