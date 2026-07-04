const { Client } = require("pg");
const fs = require("fs");

async function tryConnect(url) {
  const c = new Client({ connectionString: url, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 5000 });
  try {
    await c.connect();
    await c.query("SELECT 1");
    return c;
  } catch (e) {
    await c.end().catch(() => {});
    return null;
  }
}

async function main() {
  const ref = "lyeppwhjwwdauduyfmzg";
  const pw = "0bQ0g9ztvPSBo8cD";
  const sql = fs.readFileSync("fix_trigger.sql", "utf8");

  const formats = [
    `postgresql://postgres.${ref}:${pw}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres.${ref}:${pw}@aws-0-eu-central-1.pooler.supabase.com:5432/postgres`,
    `postgresql://${ref}.postgres:${pw}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres:${pw}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&user=postgres.${ref}`,
  ];

  for (const fmt of formats) {
    console.log("Trying:", fmt.substring(0, 70) + "...");
    const c = await tryConnect(fmt);
    if (c) {
      console.log("CONNECTED!");
      try {
        await c.query(sql);
        console.log("SQL fix uygulandi! Trigger yeniden olusturuldu.");
      } catch (e) {
        console.log("SQL Error:", e.message);
      }
      await c.end();
      return;
    }
  }
  console.log("Hicbir baglanti calismadi.");
}

main();
