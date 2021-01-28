const levelUp = require("./levelup"), { incrementXP } = require("../util/Util");

module.exports = (message, sql) => {
    const user = sql.prepare("SELECT * FROM userScores WHERE guildID=? AND userID=?").get(message.guild.id, message.author.id);
    const currentPoints = user ? user.exp + incrementXP(process.env.xpIncrement) : incrementXP(process.env.xpIncrement);

    if (user && currentPoints > user.nextPL) return levelUp(message, sql, user);

    const currentLvL = user ? user.level : 1;
    const currentLvLInfo = user ? [user.oldPL, user.nextPL] : [0, 50];

    if (!user) {
        sql.prepare("INSERT INTO userScores VALUES(?,?,?,?,?,?)")
        .run(message.guild.id, message.member.id, currentPoints, currentLvL, ...currentLvLInfo);
    } else {
        sql.prepare("UPDATE userScores SET exp=?, level=? WHERE guildID=? AND userID=?")
        .run(currentPoints, currentLvL, message.guild.id, message.member.id);
    }
}