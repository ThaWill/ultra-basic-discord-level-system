const { Command } = require("discord.js-commando"),
    { MessageEmbed } = require("discord.js"),
    { stripIndents, oneLine } = require("common-tags"),
    top = {
        1: ":first_place:",
        2: ":second_place:",
        3: ":third_place:"
    }

module.exports = class exportCommand extends Command {
    constructor(client) {
        super(client, {
            name: "rank",
            aliases: ["profile", "level"],
            group: "level",
            memberName: "rank",
            guildOnly: true,
            clientPermissions: ["EMBED_LINKS"],
            description: `Show information about the level,
            of your profile, or from a user you mention.`,
            details: `The only value in the format is optional.
            if you don't enter anything for the format, your current
            statistics will be displayed.`,
            args: [{
                key: "member",
                prompt: "Who do you want to get their stats from?",
                type: "member",
                default: message => message.member
            }],
            format: "<user-mention>",
            examples: ["rank @ThaWill#6693"]
        })
    }

    async run(message, { member }) {
        const get = process.sql.prepare(`
        SELECT * FROM (SELECT *, row_number() OVER (ORDER BY exp DESC) AS position 
        FROM userScores WHERE guildID=?
        ORDER BY exp DESC) WHERE userID=?
        `).get(message.guild.id, member.id);

        if (!get) return message.say(oneLine `${message.member}
        ${member.id == message.member.id ? "you haven't accumulated points yet, **start chatting to get them**." 
        : "i'm sorry, the mentioned user has no points. Get him to start chatting to win them."}`);

        let rank = [1, 2, 3].includes(get.position) ? top[get.position] : get.position;

        const embed = new MessageEmbed()
            .setTitle(member.displayName)
            .setDescription(stripIndents `**Level:** ${get.level}
            **Exp:** ${get.exp} / ${get.nextPL}
            **Rank:** ${rank}`)
            .setThumbnail(member.user.displayAvatarURL());
        return message.embed(embed);
    }
}