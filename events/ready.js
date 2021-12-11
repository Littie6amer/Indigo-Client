module.exports = (client) => {
    client.membercount = 0;
    client.guilds.cache.forEach(g => {
        client.membercount += g.memberCount
    });
    setInterval(() => {
        client.membercount = 0;
        client.guilds.cache.forEach(g => {
            client.membercount += g.memberCount
        });
    }, 30000)
    let guildcount = client.guilds.cache.size
    console.log(`[${client.user.username}]: Ready!`)
    console.log(`[${client.user.username}]: ${guildcount} Guild(s) with ${client.membercount} Member(s)`)
    console.log('~~~')
}