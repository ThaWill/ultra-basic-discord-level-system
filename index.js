const path = require("path"), fs = require("fs"); require("dotenv").config();
const Client = require("./structures/client"); 
const client = new Client({
    owner: process.env.OWNER_ID,
    commandPrefix: process.env.COMMAND_PREFIX,
    unknownCommandResponse: false,
    disableMentions: "everyone",    
});

const Database = require("better-sqlite3");
process.sql = new Database("mainDB", { timeout: 60000 });
client.setDB(process.sql);

client.registry
    .registerDefaultTypes()
    .registerGroups(["level", "levels"])
    .registerCommandsIn(path.join(__dirname, "commands"));

fs.readdirSync("./events")
    .filter(e => e != "assets")
    .forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args, process.sql));
    });

client.login(process.env.TOKEN);