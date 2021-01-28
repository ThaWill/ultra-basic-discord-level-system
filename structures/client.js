const { CommandoClient } = require("discord.js-commando");

module.exports = class Client extends CommandoClient {
    constructor(options) {
        super(options);

        this.talkedRecently = new Set();
    }

    setDB(sql) {
        sql.prepare(`CREATE TABLE IF NOT EXISTS userScores 
        (guildID TEXT, userID TEXT, exp INTEGER, level INTEGER, oldPL INTEGER, nextPL INTEGER)`).run();
    }
}