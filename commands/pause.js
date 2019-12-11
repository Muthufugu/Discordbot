module.exports.run = async (bot, message, args, ops) => {
 
    // Gegevens ophalen.
    var guildIDData = ops.active.get(message.guild.id);
 
    // Nakijken als er al een liedje aan het afspelen is.
    if (!guildIDData) return message.channel.send("Er zijn geen liedjes aan het afspelen hierzo");
 
    // Nakijken als de gebruiker in het kanaal zit van de bot.
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("mensen moeten eerst samen met de bot in de manama channel");
 
    // Nakijken als het liedje al gepauzeerd is.
    if (guildIDData.dispatcher.paused) return message.channel.send("de muziek is al gepauzeerd hierzo");
 
    // Pauzeer het liedje.
    guildIDData.dispatcher.pause();
 
    // Stuur bericht.
    message.channel.send(`Gemanamapauzeerd ${guildIDData.queue[0].songTitle}.`);
 
}
 
module.exports.help = {
    name: "pause",
    
}