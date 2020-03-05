module.exports = {
    name: 'Reload',
    description: 'Reloads the whole bot for quick updates of the code',
    execute(message, args) {
        message.channel.send('Shutting down...');
        process.kill()
    },
};