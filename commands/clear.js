const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // !clear (amount)

    if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply("Mensen zijn komedisch");

    if (!args[0]) return message.reply("Geef aantal ofzo")

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (args[0] == 0) {

                message.channel.send(`Mensen willen 0 berichten verwijderen???`).then(msg => msg.delete(3000));

            } else if (args[0] == 1) {

                message.channel.send(`Mensen hebben 1 bericht verwijderd`).then(msg => msg.delete(3000));

            } else {

                message.channel.send(`Mensen hebben ${args[0]} berichten verwijderd`).then(msg => msg.delete(3000));
                
            }

            message.channel.send(`Mensen hebben ${args[0]} berichten verwijderd`).then(msg => msg.delete(3000));

        });

    } else {
        return message.channel.send("geef getal ofzo");
    }


}

module.exports.help = {
    name: "clear"
}