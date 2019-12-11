const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if(!message.member.voiceChannel) return message.channel.send("Ga eerst in die voicechannel smh");

    if(!message.guild.me.voiceChannel) return message.channel.send("Bot is geen eens in voicechannel smh");

    if(message.guild.me.voiceChannelID != message.member.voiceChannelID) return message.channel.send("Mensen zijn niet in hetzelfde kanaaltje verbonden smh");

    message.guild.me.voiceChannel.leave();

    message.channel.send("Mensen zijn geleaved hierzo");

}

module.exports.help = {
    name: "leave"
}