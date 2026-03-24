const fs = require("fs");

const en = JSON.parse(fs.readFileSync("./messages/en.json", "utf-8"));
const pt = JSON.parse(fs.readFileSync("./messages/pt.json", "utf-8"));
const de = JSON.parse(fs.readFileSync("./messages/de.json", "utf-8"));

// Fix Contact title spacing - NO space after <br/>
en.Contact.title = "Let's work <br/>together.";
pt.Contact.title = "Vamos trabalhar <br/>juntos.";
de.Contact.title = "Lass uns zusammen <br/>arbeiten.";

// For AboutPage title, next-intl rich text expects valid XML. <br /> is ok but <br></br> is safer for next-intl.
// But we actually use t.rich() so let's match the <br> tag exactly.
en.AboutPage.title = "The person behind <br></br> <gradient>the code.</gradient>";
pt.AboutPage.title = "A pessoa por trás <br></br> <gradient>do código.</gradient>";
de.AboutPage.title = "Die Person hinter <br></br> <gradient>dem Code.</gradient>";

fs.writeFileSync("./messages/en.json", JSON.stringify(en, null, 2));
fs.writeFileSync("./messages/pt.json", JSON.stringify(pt, null, 2));
fs.writeFileSync("./messages/de.json", JSON.stringify(de, null, 2));
console.log("Dictionaries updated again successfully");
