module.exports.run = async (bot, message, args, ops) => {

    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("Er zijn geen liedjes meer g");

    var queue = guildIDData.queue;
    var nowPlaying = queue[0];

    var response = `Now playing ${nowPlaying.songTitle} | Requested by ${nowPlaying.requester} \n\n Queue \n`;

    for (var i = 0; i < queue.length; i++) {

        response += `${i} - ${queue[i].songTitle} | Requested by ${queue[i].requester} \n`;



    }

    message.channel.send(response);

}

module.exports.help = {
    name: "queue"
}