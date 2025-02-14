const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUltU2hpM1YyQTJzdUE3RjQ1eWUwYmZSVm11bjYraURuMVJiK3hGSC8yMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidS9wcjFYQ1FDTGtoakRTcm9VT0ZKbnhpR1R6RTFndzY2M0laanZVWXVCVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHSjZxbHRVcWNINjg3aFA1WGcvUDlscndzVzNNb0JUSWRCdUZrVTRVR1g0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlOU0zbnFtUmNVK1pKSDlrS0NDbkRNdFJtOEtFMVR1RnpIVG1qMTVQWkNNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdCSjI1bGYxQVlBQ0tYQ0pGMDVkZW5nL2VZdk5GeVoxbkcyUzlNR05CMWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikk2dzY3U01yYmdHVjlvYTdFanRHNmRuano4OVhYeU1RTm5qbmx1Ni8xZ2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVBZeFpKMklhNDAwL25mQ0FxRUxhdGZUc0ZxdEtEaVJhK2tsQVpFYlRGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnBzeDNqWW5HcUFwYi9Ibkt5d21YK0tJa0l4VEMrWW1zZ3Mvb2pYTGFXQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5ubndqcWRLaXJHSUo4Z1dkOXJTUUI1STJsUXloUkh0RWRpQTRKS1YySHBTSklEd2c4ZnRlU1FOWVd2S05vRGc2YzlwcW1POGZBWEo1SmtaTk9kbGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIzLCJhZHZTZWNyZXRLZXkiOiJEME9JcUFkOFUwcVJHSHlVZkIxVFV5bTdVd2dud3lsYUxHS0pMUGZiRDhrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzQ5ODU0MzUyN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyOTdENDg3MzMxRTgzQTlEMzRCODQ5MjkwQjRCNDVDOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM5NTIzNzg1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjM0OTg1NDM1MjdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQjgwNTdDRTMyMkE2NTg2NTA5MUFDRUM4MEYyQzg5MjMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczOTUyMzc4NX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjp0cnVlfSwiZGV2aWNlSWQiOiJsVzBrSDR5SFEzRzlCeXRmMUQzNE9BIiwicGhvbmVJZCI6ImE3MDdlMWE0LWU3MzgtNGI0OC04MjFkLWEyN2ZlZjk2YWM1MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmQUxGSjdnQzg0RXUzWEVjK2NwV2VDS3VlN3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUc2cXlXNEtQTzFSTVVUZWxKdVJCcEsxMWV3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik05RVRCQlA3IiwibWUiOnsiaWQiOiI5MjM0OTg1NDM1Mjc6MTVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiRGVlZGFyIEFsaWnwn5KrIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKU016S1FFRUxXTnZMMEdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJrQ3NOU0tQZUt6RUFyZE5qVnFXYTh4YXJGYkNVODlhakN2QTREL044blJvPSIsImFjY291bnRTaWduYXR1cmUiOiI2cmVvOFBIcTJIMkFzdFlscmNucDZ3cHEwTDN6N0xVUDVOaHM2cFd3OGlRY3dwNHMreFV5K3RjcWs2UHk0V1E2dUdSbzQ5TzRXd1JhSVFzdWFzeUNDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiR0plMnFHc0FpVzVhcmFYRHlhakV2V0hNMG95VytIZCtleEFlZ2RQNmhYWGxjTXovRUdnbGJrWDlkWVQwMUNqd2NPZWpqMm5XUFc1cTZ4QTBiSnZwaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjM0OTg1NDM1Mjc6MTVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWkFyRFVpajNpc3hBSzNUWTFhbG12TVdxeFd3bFBQV293cndPQS96ZkowYSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczOTUyMzc3OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGaHIifQ==;;;=>',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "of",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'on',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
