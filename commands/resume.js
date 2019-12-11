module.exports.run = async (bot, message, args, ops) => {
 
   
    var guildIDData = ops.active.get(message.guild.id);
 
    
    if (!guildIDData) return message.channel.send("Er is geen eens muziek smh");
 
    
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("je bent niet in het zelfde kanaal als de bot");
 
    
    if (!guildIDData.dispatcher.paused) return message.channel.send("mensen zijn doof?? Muziek is aan het spelen hierzo");
 
    
    guildIDData.dispatcher.resume();
 
    
    message.channel.send(`Succesvol gemanamastart ${guildIDData.queue[0].songTitle}.`);
 
}
 
module.exports.help = {
    name: "resume",
    
}