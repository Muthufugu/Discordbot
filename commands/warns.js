const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    // !warn @user (reason)

    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Mensen willen mensen warnen maar mensen zijn geen administrator??");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef goeie naam smh");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Mensen willen admins warneren??");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef redenen g");

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("warn")
        .setColor("ee0000")
        .addField("warned user:", user)
        .addField("warned by:", message.author)
        .addField("number of warns:", warns[user.id].warns)
        .addField("reason:", reason);

    var warnChannel = message.guild.channels.find(`name`, "report");
    if (!warnChannel) return message.guild.send("Bestaat niet");

    warnChannel.send(warnEmbed);

    if (warns[user.id].warns == 3) {

        var warnbericht = new discord.RichEmbed()
            .setDescription("PAS OP " + user)
            .setColor("ee0000")
            .addField("warn", "Als je nog 1x stout doet word je gekickt g en sinterklaas gaat je haten!!");

        message.channel.send(warnbericht);

    }

    else if (warns[user.id].warns == 4) {

        message.guild.member(banUser).ban(reason);
        message.channel.send(`${user} got banned because he's a retard...`);

    }

}

module.exports.help = {
    name: "warn"
}