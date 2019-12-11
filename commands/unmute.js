const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    // if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Mensen willen mensen muteren maar mensen zijn geen administrator??");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef goeie naam smh");

    // if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Mensen willen admins muteren??");

    var muteRole = message.guild.roles.find(`name`, "muted");

    await (user.removeRole(muteRole.id));

    message.channel.send(`${user} is unmuted`)

        user.removeRole(muteRole.id);
    }

module.exports.help = {
    name: "um"
}