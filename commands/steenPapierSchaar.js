module.exports.run = async (bot, message, args) => {

    // sps steen papier schaar.

    if (!args[0]) return message.channel.send("Use: <steen> <papier> <schaar>");

    var options = ["steen", "papier", "schaar"];

    var result = options[Math.floor(Math.random() * options.length)];

    if (args[0] == "steen") {

        if (result == "papier") {

            message.channel.send(`Ik heb ${result} :notepad_spiral:, noob`);

        } else if (result == "schaar") {
            message.channel.send(`Ik heb ${result} :scissors:, mensen hebben geluk`);
        } else if (result == "steen") {
            message.channel.send(`Ik heb ${result} :moyai:, gelijkspel g`);
        }

    }
    else if (args[0] == "papier") {

        if (result == "steen") {

            message.channel.send(`Ik heb ${result} :moyai:, mensen hebben geluk`);

        } else if (result == "schaar") {
            message.channel.send(`Ik heb ${result} :scissors:, noob`);
        } else if (result == "papier") {
            message.channel.send(`Ik heb ${result} :notepad_spiral:, gelijkspel g`);
        }

    }
    else if (args[0] == "schaar") {

        if (result == "steen") {

            message.channel.send(`Ik heb ${result} :moyai:, noob`);

        } else if (result == "papier") {
            message.channel.send(`Ik heb ${result} :notepad_spiral:, mensen hebben geluk`);
        } else if (result == "schaar") {
            message.channel.send(`Ik heb ${result} :scissors:, gelijkspel g`);
        }

    }


}

module.exports.help = {
    name: "sps"
}