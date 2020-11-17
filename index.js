const Discord = require('discord.js');
const client = new Discord.Client();

const botApp = {
    commands: { 
        start: (msg)=>{
            botApp.intervalId = setInterval(task, 3000);
            msg.reply('iniciando a trolagem');
        },
        stop: (msg)=>{
            unmuteAll();
            clearInterval(botApp.intervalId);
            msg.reply('parei e demutei geral');
        }
    },
    muteds: [],
    intervalId: undefined
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.author.id === "777990452741144607"){
        return;
    }

    const command = botApp.commands[msg.content];

    if(!command){
        msg.reply('isso ai n funciona cmg fii..');
    } else {
        command(msg);
    }
})

async function task(){
    const guild = await client.guilds.fetch("760247323975876659", false, true);

    const member = guild.members.cache.random();//guild.members.cache.find(m=>m.id=="760246769803591721")
   
    if(member.user.id=="777990452741144607"){
        console.info(`${member.user.username} skiped`);
        return;
    }

    if (botApp.muteds.find(id => id == member.user.id)) {
        unmute(member);
    } else {
       mute(member);
    }

    console.log(`all muteds users: ${botApp.muteds}`);
}

async function unmute(member){
    try {
        await member.voice.setMute(false);
        botApp.muteds = botApp.muteds.filter(id => id != member.user.id);
        console.log(`unmuted ${member.user.username}, ${member.user.id}`);   
    } catch (error) {
        console.error(`error on desmute user ${member.user.username}, ${member.user.id}`)
    }
}

async function unmuteAll(){
    const guild = await client.guilds.fetch("760247323975876659", false, true);
    guild.members.cache.forEach(m=>unmute(m))
}

async function mute(member){
    try {
        botApp.muteds.push(member.user.id);
        member.voice.setMute(true);
        console.log(`muted ${member.user.username}, ${member.user.id}`);
    } catch (error) {
        console.error(`error on mute user ${member.user.username}, ${member.user.id}`)
    }
}

client.login('{key}');