const discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {

    // Ophalen van het ID van de server voor de data.
    var guildIDData = ops.active.get(message.guild.id);

    // Nakijken als er al liedjes gepsleet worden in deze server.
    if (!guildIDData) return message.channel.send("Er is geen eens muziek smh");

    // Nakijken als in zelfde kanaal zit als de bot.
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Mensen zitten niet in het zelfde channel smh");

    // Het aantal members opvragen in het spraakkanaal.
    var amountUsers = message.member.voiceChannel.members.size;

    // Berekenen hoe veel er nodig zijn om te stemmen voor het skippen.
    var amountSkip = Math.ceil(amountUsers / 1);

    if (!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];


    if (guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Mensen hebben al gestemd ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);

    // Data toevoegen aan de array.
    guildIDData.queue[0].voteSkips.push(message.member.id);

    // Updaten van de data.
    ops.active.set(message.guild.id, guildIDData);


    if (guildIDData.queue[0].voteSkips.length >= amountSkip) {

        message.channel.send("Skipping...");


        
    }

    message.channel.send(`Added ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);

}

module.exports.help = {
    name: "skip",

}