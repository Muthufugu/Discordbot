const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    // !tm @user 20s

    // if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Mensen willen mensen muteren maar mensen zijn geen administrator??");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef goeie naam smh");

    // if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Mensen willen admins muteren??");

    var muteRole = message.guild.roles.find(`name`, "Muted");

    if (!muteRole) return message.channel.send("Rol Muted bestaat niet.");

    var muteTime = args[1];

    if (!muteTime) return message.channel.send("Geef een tijd g");

    await (user.addRole(muteRole.id));

    message.channel.send(`${user} is muted for ${muteTime}`);

    setTimeout(function() {

        user.removeRole(muteRole.id);

        message.channel.send(`${user} is unmuted`);

    }, ms(muteTime));




}

module.exports.help = {
    name: "tm"
}