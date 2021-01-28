const { MessageEmbed } = require('discord.js');
module.exports = (message, level) => {
    const embed = new MessageEmbed()
        .setTitle(message.member.displayName)
        .setDescription(`**Has subido de nivel** :up:\n¡Felicidades, ahora eres **nivel ${level}**!`)        
        .setThumbnail(message.author.displayAvatarURL())
    return message.channel.send({ embed: embed });
}