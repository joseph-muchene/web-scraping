import axios from "axios";
import cheerio from "cheerio";
import json2csv from "json2csv";
import * as fsp from "fs/promises";
// get population data

const getPopulationData = async () => {
  const targetUrl =
    "https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population";
  const pageResponse = await axios.get(targetUrl);

  //   hold the results
  const keys = [];
  const result = [];

  const $ = cheerio.load(pageResponse.data);

  // Finding the right Nodes
  $("table.wikitable")
    .find("tr")
    .each((row, element) => {
      if (row === 0) {
        $(element)
          .find("th")
          .each((idx, elem) => {
            const key = $(elem).text().trim();

            keys.push(key);
          });
        return;
      }

      const nextCountry = {};
      $(element)
        .find("td,th")
        .each((idx, elem) => {
          const value = $(elem).text().trim();
          const key = keys[idx];

          nextCountry[key] = value;
        });
      result.push(nextCountry);
    });
  return result;
};

getPopulationData().then((results) =>
  saveCsv(results)
);

const saveCsv = async (countries) => {
  const j2cp = new json2csv.Parser();
  const csv = j2cp.parse(countries);

  await fsp.writeFile("./output.csv", csv, { encoding: "utf-8" });
};
