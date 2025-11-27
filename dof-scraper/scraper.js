import axios from "axios";
import * as cheerio from "cheerio";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function getExchangeRate(day, month, year) {
  const url = `http://dof.gob.mx/indicadores_detalle.php?cod_tipo_indicador=158&dfecha=${String(
    day
  ).padStart(2, "0")}%2F${String(month).padStart(
    2,
    "0"
  )}%2F${year}&hfecha=${String(day).padStart(2, "0")}%2F${String(
    month
  ).padStart(2, "0")}%2F${year}`;

  try {
    const response = await axios.get(url, { httpsAgent: agent });
    const html = response.data;

    const $ = cheerio.load(html);

    const cell = $("tr.Celda");
    const exchangeRate = $(cell).find("td:nth-child(2)").text().trim();

    return exchangeRate;
  } catch (error) {
    console.error("Error fetching or parsing the content:", error);
  }
};

getExchangeRate(27, 11, 2025).then((rate) => {
  console.log("Exchange Rate:", rate);
});
