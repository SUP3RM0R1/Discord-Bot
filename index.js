const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json')
const db = low(adapter);

db.defaults({histoires: []})
.write()

var bot = new Discord.Client();
var prefix = ("sb?")
var randnum = 0;

var storynumber = db.get('histoires').map('story_value').value();

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: '[?help] Beta', type: 0}})
    console.log('Bot Ready !');
});

bot.login('NDM4MzYxMDI2ODExOTIwMzg0.DcGkag.0iBNZsZ7xJXhzIHL3wEXH_RpDRI');

bot.on("guildMemberAdd", member => {
    let role = member.guild.roles.find("name", "Membre");
    member.guild.channels.find("name", "bienvenue").send(":grin:  vien de rejoindre le serveur !")
    member.addRole(role)
})

bot.on("guildMemberRemove",member => {
    member.guild.channels.find("name", "au-revoir").send(":disappointed_relieved: ${client.user.tag} a quitté(e) le serveur")
})

bot.on('message', message => {
    if (message.content === ("ping")){
        message.channel.send(":ping_pong:pong");
        console.log('ping pong');
    }

    if (message.content.startsWith(prefix)) return;
    var arg = message.content.substring(prefix.lenght).split(" ");

    switch (arg[0].toLowerCase()){
        case "newstory":
        var value = message.content.substr(10);
        var author = message.author.toString;
        var number = db.get('histoires').map('id').value();
       // var storyid = number + 1;
        console.log(value);
        message.reply("Ajout de l'histoire a la base de données")

        db.get("histoires")
        .push({ id: number, story_value: value, story_author: author})
        .write();
       
        break;

        case 'tellstory':

        storyrandom();
        console.log(randnum);

        var story = db.get('histoires[${randnum}].story_value').toString().value();
        var author_story = db.get('histoires[${randnum}].story_author').toString().value();
        console.log(story)

        
        break;

        case "slt SUP3RB0T":{
            random();
    
            if (randnum == 1){
                message.reply ;"Salut";
                console.log(randnum);
            }
            if (randnum == 2){
                message.reply("Hey")
                console.log(randnum2);
            }
        }break;
    
        case "kick":
    
            if (!message.channel.permissionsfor(message.member).hasPermission("KICK_MEMBERS")){
                message.reply("Vous n'avez pas la pemission de kicker des personnes !")
            }else{
                var memberkick = message.mentions.members.firsts();
                if (!memberkick){
                    message.reply("L'utilisateur n'éxiste pas ou n'est pas connecté");
                }else{
                    if (!message.guild.member(memberkick).kickable){
                        message.reply("Cet utilisateur ne peut pas être kick");
                    }else{
                        message.guild.member(memberkick).then((member) =>{
                        message.channel.send('${displayName} a été kick');
                    }).catch(() => {
                        message.channel.send("Kick refusé !")
                    })
                }
            }
        }
        break;
    
        case "ban":
    
            if (!message.channel.permissionsfor(message.member).hasPermission("BAN_MEMBERS")){
                message.reply("Vous n'avez pas la pemission de bannir des personnes !")
            }else{
                var memberban = message.mentions.members.firsts();
                if (!memberban){
                    message.reply("L'utilisateur n'éxiste pas ou n'est pas connecté");
                }else{
                    if (!message.guild.member(memberban).kickable){
                        message.reply("Cet utilisateur ne peut pas être banni");
                    }else{
                        message.guild.member(memberban).then((member) =>{
                        message.channel.send('${displayName} a été banni');
                    }).catch(() => {
                        message.channel.send("Ban refusé !")
                    })
                }
            }
        }
        break;
    }

    if (message.content === prefix + "aide"){
       // var help_embed = new Discord.RichEmbed()
       // .setColor('#00059F')
       // .addField("Commandes du Bot", "Bot en construction")
       // .addField("truc a savoir", "j'aime les paillettes et les licornes")
       // message.channel.sendEmbed(help_embed)
        message.channel.send("Voici les commandes du bot :\n bot en construction");
        console.log('help');
    }
    
});

function storyrandom(min, max) {
    min = Math.ceil(0);
    max = Math.floor(storynumber);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(2);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
;}
