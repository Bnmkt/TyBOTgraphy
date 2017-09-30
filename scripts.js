var Discordie = require("Discordie")
var ReadJson = require("r-json");
var find = require("find");
var WriteJson = require("w-json");
var bot = new Discordie({
    autoReconnect: true,
})
var i = 0;
var fontFamily = {
  "DIDONE": [
    ["BODONI","p1o5l9i8c7e4s (1).png"],
    ["DIDOT","p1o5l9i8c7e4s (2).png"],
    ["WALBAUM","p1o5l9i8c7e4s (3).png"]
  ],
  "FRACTURE": [
    ["FETTE FRAKTUR","p1o5l9i8c7e4s (1).png"],
    ["GOUDY TEXT","p1o5l9i8c7e4s (2).png"]
  ],
  "GARALDE": [
    ["ALDUS","p1o5l9i8c7e4s (1).png"],
    ["BEMBO","p1o5l9i8c7e4s (2).png"],
    ["GALLIARD","p1o5l9i8c7e4s (3).png"],
    ["GARAMOND","p1o5l9i8c7e4s (4).png"],
    ["GRANJON","p1o5l9i8c7e4s (5).png"],
    ["MINION","p1o5l9i8c7e4s (6).png"],
    ["PALATINO","p1o5l9i8c7e4s (7).png"],
    ["SABON","p1o5l9i8c7e4s (8).png"]
  ],
  "HUMANE": [
    ["ADOBE JENSON","p1o5l9i8c7e4s (1).png"],
    ["CENTAUR","p1o5l9i8c7e4s (2).png"],
    ["HOEFLER TEXT","p1o5l9i8c7e4s (3).png"],
    ["QUADRAAT","p1o5l9i8c7e4s (4).png"],
    ["SCALA","p1o5l9i8c7e4s (5).png"]
  ],
  "INCISE": [
    ["ALBERTUR","p1o5l9i8c7e4s (1).png"],
    ["BERLIN SANS","p1o5l9i8c7e4s (2).png"],
    ["COPPERPLATE GOTHIC","p1o5l9i8c7e4s (3).png"],
    ["LITHOS","p1o5l9i8c7e4s (4).png"],
    ["OPTIMA","p1o5l9i8c7e4s (5).png"],
    ["TRAJAN","p1o5l9i8c7e4s (6).png"]
  ],
  "MANUAIRE":[
    ["BANCO","p1o5l9i8c7e4s (1).png"],
    ["COMIC SANS","p1o5l9i8c7e4s (2).png"],
    ["DOLORES","p1o5l9i8c7e4s (3).png"],
    ["DOM CASUAL","p1o5l9i8c7e4s (4).png"],
    ["MISTAL","p1o5l9i8c7e4s (5).png"]
  ],
  "MÉCANE": [
    ["AMERICAN TYPEWRITER","p1o5l9i8c7e4s (1).png"],
    ["CLARENDON","p1o5l9i8c7e4s (2).png"],
    ["COOPER BLACK","p1o5l9i8c7e4s (3).png"],
    ["COURIER","p1o5l9i8c7e4s (4).png"],
    ["ROCKWELL","p1o5l9i8c7e4s (5).png"],
    ["ROSEWOOD","p1o5l9i8c7e4s (6).png"]
  ],
  "RÉALE": [
    ["BASKERVILLE","p1o5l9i8c7e4s (1).png"],
    ["CASLON","p1o5l9i8c7e4s (2).png"],
    ["GEORGIA","p1o5l9i8c7e4s (3).png"],
    ["MRS EAVES","p1o5l9i8c7e4s (4).png"],
    ["TIMES NEW ROMAN","p1o5l9i8c7e4s (5).png"]
  ],
  "SCRIPTE": [
    ["BICKHAM SCRIPT","p1o5l9i8c7e4s (1).png"],
    ["CAFLISCH SCRIPT","p1o5l9i8c7e4s (2).png"],
    ["LIMOSCRIPT","p1o5l9i8c7e4s (3).png"],
    ["ZAPFINO","p1o5l9i8c7e4s (4).png"]
  ]
}
const _token = "MjY1MzkxNDUzNjc1NTg1NTM4.C0uclg.KEdD2SXWenpChgmE__KQBlcB3PI";
const _botID = "265391453675585538";
var pre = "!"
bot.connect({
    token: _token
})

function randomFamily(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

function getRealDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var nn = today.getMinutes();

    if (nn < 10) {
        nn = '0' + nn
    }
    if (hh < 10) {
        hh = '0' + hh
    }
    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return (mm + '/' + dd + '/' + yyyy + ' ' + hh + ':' + nn);
}

function executeCmd(cmd, e, ch) {
    var channel = ch;
    var content = cmd.content;
    var auth = cmd.author;
    var authId = auth.id;
    var response = "";

    if (content == pre + "help") {
        response += "```";
				response += " "+pre+"typo affiche une typo aléatoire et affiche la réponse 20secondes après"
				response += "```"
    }

    if (content == pre + "typo") {
				i++;
				var fam = randomFamily(fontFamily);
				var font = fontFamily[fam][Math.floor(Math.random() * fontFamily[fam].length)];
				console.log(fam);
				console.log(font);
        channel.uploadFile(__dirname + "/Police/"+fam+"/"+font[1]+"", null, "("+i+") Quelle est cette police ? (la réponse sera envoyée dans 20secondes)");
				setTimeout(function(){
					channel.sendMessage(auth.mention+" Famille : "+fam+" / Police : "+font[0]+"");
				},20000)
    }

    return response;
}

bot.Dispatcher.on("GATEWAY_READY", e => {

    conf = ReadJson(__dirname + "/conf.json");
    // all objects except offline members of large guilds
    // have been cached at this point
    console.log("This bot is now connected on : ")
        // get a channel by id
    channel = bot.Channels.get("260456538345308160");
    //channel.sendMessage("**["+getRealDate()+"]** __Bonjour, mon prefix est : "+pre+"__");
    //channel.sendMessage("Tapez __"+pre+"help__ pour avoir la liste des commandes");
});
bot.Dispatcher.on("MESSAGE_CREATE", e => {
    var channel = bot.Channels.get(e.message.channel_id)
    if (e.message.content.startsWith(pre) && e.message.author.id != ("<@" + _botID + ">")) {
        channel.sendMessage(executeCmd(e.message, e, channel))

    }
});
