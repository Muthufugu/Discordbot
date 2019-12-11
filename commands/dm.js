const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    try{

        var text = "**retard** \n\n **_kom vechten_**"

        message.author.send(text);
   
    }catch (error){
        message.channel.send("smhhhhh");
    }

}

module.exports.help = {
    name: "dm"
}