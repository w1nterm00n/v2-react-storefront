// src/lib/medusa.js

import Medusa from "@medusajs/medusa-js";

// Здесь ты указываешь, куда цепляться — по дефолту Medusa backend v2 работает на http://localhost:9000
const medusa = new Medusa({
  baseUrl: "http://localhost:9000", // Или свой адрес, если не локалка
  maxRetries: 3, // Можно убрать или изменить по вкусу
  publishableApiKey: "pk_03343001037bbe734ff63d70aae9a7797b5b381f248cc85fad3404dec1675847",
});

export default medusa;

