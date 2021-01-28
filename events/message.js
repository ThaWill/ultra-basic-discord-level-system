const scoreSystem = require("../level/score");

exports.run = (client, message, sql) => {
    if (message.content.startsWith(message.guild.commandPrefix)) return;
    if (client.talkedRecently.has(message.author.id)) return;
    if (message.author.bot) return;    

    scoreSystem(message, sql);
    client.talkedRecently.add(message.author.id);

    return setTimeout(() => {
        client.talkedRecently.delete(message.author.id);
    }, 1000);
}