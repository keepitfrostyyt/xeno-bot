const Discord = require ('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`${client.user.username} Is online your prefix is ${config.prefix}`)
});

client.on('message', message => {
    const args = message.content.split(" ").slice(1);
    const user = message.mentions.users.first() || client.users.get(args[0]);
    const reason = args.slice(1).join(" ");
    const member = message.guild.member(user);
    if (message.content.startsWith(config.prefix + 'purge')) {
        var result = args.join(' ');
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('You Dont Have Enough Permissions!');
            if (!result)
                return message.reply('Please add a Amount Of Messages to Delete!');
            limit: 99
            let messagecount = parseInt(result);
            message.channel.fetchMessages({
            limit: messagecount + 1
        }).then(messages => message.channel.bulkDelete(messages));
        var purgeEmbed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle(':ok_hand: Cleaned The Chat!')
            .setDescription(`Cleared __**${result}**__ Messages at __*${message.guild.name}*__`)
            .addField('> Cleared By', `- **${message.author.tag}**`, true)
            .setFooter('Message Auto-Delete in 5 Seconds!')
            .setTimestamp()
        message.channel.send({embed: purgeEmbed}).then(m => m.delete(5000))
    }
});

client.on('message', message => {
  if(message.content.startsWith(config.prefix + 'ban')) {
     if(message.author.bot) return;
    var user = message.mentions.users.first();
    var member = message.guild.member(user);
    var reason = message.content.split(' ').slice(2).join(' ');
      let role = (message.member.hasPermission('BAN_MEMBERS') && message.author.id !== config.owner);
        if (!message.member.hasPermission('BAN_MEMBERS') && message.author.id !== config.owner)
        return message.channel.sendMessage("You don't have the permission Ban Members !");
           if (!user)
        return message.channel.sendMessage('Who is the person that you will ban?');
           if (!reason)
        return message.channel.sendMessage(`Why are you gonna ban ${user.username}`);
           message.channel.sendMessage(`**${user.username}** got banned by **${message.author}** for **${reason}**.`)
member.ban()
}
});

client.on('message', message => {
  if(message.content.startsWith(config.prefix + 'kick')) {
     if(message.author.bot) return;
    var user = message.mentions.users.first();
    var member = message.guild.member(user);
    var reason = message.content.split(' ').slice(2).join(' ');
      let role = (message.member.hasPermission('KICK_MEMBERS') && message.author.id !== config.owner);
        if (!message.member.hasPermission('KICK_MEMBERS') && message.author.id !== config.owner)
        return message.channel.sendMessage("You don't have the permission kick Members !");
           if (!user)
        return message.channel.sendMessage('Who is the person that you will kick?');
           if (!reason)
        return message.channel.sendMessage(`Why are you gonna kick ${user.username}`);
           message.channel.sendMessage(`**${user.username}** got kicked by **${message.author}** for **${reason}**.`)
member.kick()
}
});

client.on('message', message => {
const args = message.content.split(' ').slice(1);
  if(message.content.startsWith(config.prefix + 'embed')) {
        if(message.author.bot) return;
                message.delete();
        var embedmsg = args.join(' ');
        const embed = new Discord.RichEmbed()
  .setAuthor(client.user.username, message.author.avatarURL)
  .setColor('RANDOM')
  .setDescription(embedmsg)
    message.channel.send({embed});
      }
});

client.on('message', message => {
if(message.content.startsWith(config.prefix + 'help')) {
    if(message.author.bot) return;
    message.channel.send(`**\`\`\`\A Perfectly Good Help Message!\nCommands List:\n${config.prefix}ytchannel - comming soon\n${config.prefix}Purge - clears messages\n${config.prefix}help!\n${config.prefix}ping - Pong!\n${config.prefix}setgame - Sets Bots game!\n${config.prefix}kick - Kicks a member!\n${config.prefix}Ban - Bans a member\n${config.prefix}embed - fancy block besides the bots text!\`\`\`\**`);
}
});

client.on('message', message => {
  if(message.content.startsWith(config.prefix + 'invite'))
   message.channel.send(`https://discordapp.com/oauth2/authorize?client_id=351239707210022922&scope=bot&permissions=0`)
});

client.on('message', message => {
if(message.content.startsWith(config.prefix + 'ping')) {
  message.channel.send(`Pong! :ping_pong:  ${Math.round(client.ping)}ms`)
}
if (message.content.startsWith(config.prefix + 'setgame')) {
  let args = message.content.split(" ").slice(1);
  let game = args.join(" ")
  console.log(game)
  client.user.setGame(game)
}
  if(message.content.startsWith(config.prefix + 'info')) {
    message.channel.sendEmbed({
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
     },
     fields: [{
       name: 'Guilds',
       value: `i am In ${client.guilds.size} guilds`,
       inline: true
     },
     {
       name: 'Total Users',
       value: `${client.guilds.reduce((p, c) => c.memberCount, 0)} Users`,
       inline: true
     },
     {
       name: 'My Owner',
       value: `@keepItFrosty YT#6450`,
       inline: true
     },
     {
       name: 'Uptime',
       value: `${require('ms')(client.uptime, {long:true})}`,
       inline: true
     }]
   })}});

   client.on('message', message => {
     if(message.content.startsWith(config.prefix + 'serverinfo')) {
       message.channel.send({
         embed: {
           color: 11206655,
           author: {
             name: `${message.guild.name}`,
             icon_url: message.guild.iconURL
          },
          "thumbnail": {
            "url": `${message.guild.iconURL}`
          },
          filds: [{
                  name: "Default Guild Channel",
                  value: `${message.guild.defaultChannel}`
                },
                {
                  name: "Guild Owner",
                  value: `${message.guild.owner}`
                },
                {
                  name: "Total Amount of Members",
                  value: `${message.guild.memberCount} Members`
                },
                {
                  name: "Date This Guild Was Created",
                  value: `${message.guild.createdAt.toLocaleString()}`
                }
          ],
       }
    })
  }
});
         client.login(config.token);
