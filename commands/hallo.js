const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    return message.channel.send("gang");

}

module.exports.help = {
    name: "gang"
}