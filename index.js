const { Composer } = require('micro-bot');
const conspiracy = require('./conspirations');

const bot = new Composer();

bot.start(async (ctx) => {
    await ctx.replyWithHTML(`Hola <strong>${ctx.from.first_name}</strong>, Soy Bemba ParaBot, que quires saber hoy 🤔🤔🤔`);
    showMenu(ctx);
});

bot.help(async (ctx) => {
    await ctx.reply('En realidad ya nada puede ayudarnos, pero si de algo te consuela puedes usar estos comandos.');
    showMenu(ctx);
});

bot.command('quiensoy', async (ctx) => {
    await ctx.reply(
        'Soy Bemba ParaBot 🤔, el envíado de los alquimistas y estoy aquí para mostrarles el único camino posible a la verdad. En un mundo dominado por los poderosos que controlan la prensa, los gobiernos, los libros y todos los aspectos de nuestras vidas, es necesario que la humanidad se deje guiar por quien conoce la verdad de las cosas. El mundo que conocemos ha sido creada sobre la base de la mentira. Durante más de 4 mil años la humanidad ha creído que la tierra es redonda, que las vacunas evitan las enfermedades, que los pueblos escogen a sus gobernantes. Yo les ofrezco mi mano y los invito a seguirme para que pueden conocer la verdad.'
    );
    await ctx.reply('Es hora de abrir el ojo');
    await ctx.replyWithPhoto('https://upload.wikimedia.org/wikipedia/commons/3/3d/Dollarnote_siegel_hq.jpg');
    ctx.reply('Revelar /conspiracion');
});

bot.command('conspiracion', async (ctx) => {
    const randomConspiracy = conspiracy.list[Math.floor(Math.random() * conspiracy.list.length)];

    await ctx.replyWithHTML(`<strong>${randomConspiracy.title}</strong> \n${randomConspiracy.text}`);

    if (randomConspiracy.pic !== undefined) {
        await ctx.replyWithPhoto(randomConspiracy.pic);
    }

    if (randomConspiracy.url !== undefined) {
        await ctx.replyWithHTML(`<a href="${randomConspiracy.url}">Leer más</a>`);
    }

    await ctx.replyWithHTML("Revelar otra <a href='/conspiracion'>/conspiracion</a> 🤔🤔🤔 ?");
});

bot.on('text', async (ctx) => {
    await ctx.reply('Disculpa, no te entiendo... Por el momento solo respondo a estos comandos.');
    showMenu(ctx);
});

function showMenu(ctx) {
    ctx.replyWithHTML('/quiensoy      --- QUIÉN SOY? \n/conspiracion --- CONSPIRACIÓN 🤔 \n/help             --- AYUDA');
}

// Export bot handler
module.exports = bot;
