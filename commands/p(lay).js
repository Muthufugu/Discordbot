const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, ops) => {

    if (!message.member.voiceChannel) return message.channel.send("Je zit niet in een voice channel smh");

    // if (message.guild.me.voiceChannel) return message.channel.send("De bot is al in een andere voice channel");

    if (!args[0]) return message.channel.send("Geef url ofzo");

    var validate = await ytdl.validateURL(args[0]);

    if (!validate) return message.channel.send("Geef goede url ofzo");

    var info = await ytdl.getInfo(args[0]);


    var data = ops.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await message.member.voiceChannel.join();

    if (!data.queue) data.queue = [];

    data.guildID = message.guild.id;

    data.queue.push({

        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id

    });

    if (!data.dispatcher) {
        Play(bot, ops, data);
    } else {

        message.channel.send(`Added to kwakoe: ${info.title} - Requested by: ${message.author.tag}`);

    }

    ops.active.set(message.guild.id, data);

}

async function Play(bot, ops, data) {

    bot.channels.get(data.queue[0].announceChannel).send(`Playing: ${data.queue[0].songTitle} - Requested by: ${data.queue[0].requester}`);

    var options = { seek: 2, volume: 1, bitrate: 128000 };

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }), options);
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function () {

        Finish(bot, ops, this);

    });

}

function Finish(bot, ops, dispatcher) {

    var fetchedData = ops.active.get(dispatcher.guildID);

    fetchedData.queue.shift();

    if (fetchedData.queue.length > 0) {

        ops.active.set(dispatcher.guildID, fetchedData);

        Play(bot, ops, fetchedData);

    } else {

        ops.active.delete(dispatcher.guildID);

        var voiceChannel = bot.guilds.get(dispatcher.guildID).me.voiceChannel;

        if (voiceChannel) voiceChannel.leave();

    }

}

module.exports.help = {
    name: "p"
}