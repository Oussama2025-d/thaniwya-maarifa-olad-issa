import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.ysscores.com/ar/today_matches", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
      },
    });

    const body = await response.text();
    const $ = cheerio.load(body);

    let html = `<html><head><meta charset="UTF-8"><title>مباريات اليوم</title></head><body>`;
    html += `<h2>📅 جدول المباريات</h2>`;

    $(".ajax-match-item").each((i, el) => {
      const home = $(el).attr("home_name");
      const away = $(el).attr("away_name");
      const time = $(el).find(".match-date").text().trim();
      const homeImg = $(el).attr("home_image");
      const awayImg = $(el).attr("away_image");

      html += `
        <div style="border:1px solid #ddd;margin:10px;padding:10px;">
          <img src="${homeImg}" width="40"> ${home}
          vs 
          ${away} <img src="${awayImg}" width="40">
          <br>⏰ ${time}
          <br><a href="go:p1" style="color:red;font-weight:bold;">🎥 مشاهدة</a>
        </div>
      `;
    });

    html += "</body></html>";

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch (e) {
    res.status(500).send("خطأ: " + e.message);
  }
}
