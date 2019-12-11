const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const active = new Map();

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);


    })

});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`);

    bot.user.setActivity("Richano - Mama ", { type: "LISTENING" })

});


bot.on("message", async message => {

    if (message.author.bot) return;


    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    var options = {

        active: active

    }

    if (commands) commands.run(bot, message, arguments, options);

    // if (command === `${prefix}aa`) {

    //     return message.channel.send("kom dan");

    //  }


    if (command === `${prefix}kick`) {

        // !kick @user reason

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

        if (!kickUser) return message.channel.send("Gebruiker niet gevonden");

        var reason = arguments.join(" ").slice(22);

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Mensen zijn grappig...");

        if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Mensen willen admins kicken??");

        var kick = new discord.RichEmbed()
            .setDescription("kick")
            .setColor("ee0000")
            .addField("kicked user", kickUser)
            .addField("kicked by", message.author)
            .addField("reason", reason);

        var kickChannel = message.guild.channels.find(channel => channel.name === "retards");
        if (!kickChannel) return message.guild.send("Bestaat niet");

        message.guild.member(kickUser).kick(reason);

        kickChannel.send(kick);


        return;

    }

    if (command === `${prefix}ban`) {

        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

        if (!banUser) return message.channel.send("Gebruiker niet gevonden");

        var reason = arguments.join(" ").slice(22);

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Mensen zijn grappig...");

        if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Mensen willen admins bannen??");

        var ban = new discord.RichEmbed()
            .setDescription("ban")
            .setColor("ee0000")
            .addField("banned user", banUser)
            .addField("banned by", message.author)
            .addField("reason", reason);

        var banChannel = message.guild.channels.find(channel => channel.name === "retards");
        if (!banChannel) return message.guild.send("Bestaat niet");

        message.guild.member(banUser).ban(reason);

        banChannel.send(ban);

        return;

    }



});


bot.login(process.env.token);