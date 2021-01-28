const { getStadistics, incrementXP } = require("../util/Util"), levelUpEmbed = require("./embeds/levelup");

module.exports = (message, sql, user) => {
    const newLevel = user.level + 1;
    const stats = getStadistics(newLevel);

    sql.prepare("UPDATE userScores SET exp=?, level=?, oldPL=?, nextPL=? WHERE guildID=? AND userID=?")
        .run(user.exp + incrementXP(process.env.xpIncrement), newLevel, stats.oldPL, stats.nextPL, message.guild.id, message.member.id);

    levelUpEmbed(message, newLevel);
}