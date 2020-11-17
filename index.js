const Discord = require('discord.js');
const client = new Discord.Client();

const botApp = {
    members: [],
    rand: (max) => Math.floor(Math.random() * max),
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const guild = client.guilds.cache.first();
    const mutedRole = guild.roles.cache.find(r => r.name === 'Muted');

    botApp.members = guild.members.cache.array();

    setInterval(() => {
        let index = botApp.rand(botApp.members.length);
        let actualMember = botApp.members[index];

        let actualRole = actualMember.roles.cache.find(r => r.id === mutedRole.id);

        if(actualRole){
            actualMember.roles.remove(mutedRole);
            console.log(`desmuted: ${actualMember.user.username}`);
        } else {
            actualMember.roles.add(mutedRole);
            console.log(`muted: ${actualMember.user.username}`);
        }
    }, 3000);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login('{key}');