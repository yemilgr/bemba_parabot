const { Composer } = require('micro-bot');
const conspiracyList = require('./conspirations');

const bot = new Composer();

bot.start(async (ctx) => {
    await ctx.replyWithHTML(
        `Hola <strong>${ctx.from.first_name}</strong> es un gran paso de avance que hayas llegado hasta aquí. \n\n Me presento, soy Bemba ParaBot 🤔, el envíado de los alquimistas e iluminatis. Estoy aquí para mostrarte el único camino posible a la verdad. Estas listo para abrir los ojos. 🤔🤔🤔`
    );
    showMenu(ctx);
});

bot.help(async (ctx) => {
    await ctx.reply('En realidad ya nada puede ayudarte, pero si de algo te consuela puedes usar estos comandos.');
    showMenu(ctx);
});

bot.command('quiensoy', async (ctx) => {
    await ctx.reply(
        'Soy Bemba ParaBot 🤔, el envíado de los alquimistas e iluminatis y estoy aquí para mostrarles el único camino posible a la verdad. En un mundo dominado por los poderosos que controlan la prensa, los gobiernos, los libros y todos los aspectos de nuestras vidas, es necesario que la humanidad se deje guiar por quien conoce la verdad de las cosas. El mundo que conocemos ha sido creada sobre la base de la mentira. Durante más de 4 mil años la humanidad ha creído que la tierra es redonda, que las vacunas evitan las enfermedades, que los pueblos escogen a sus gobernantes. Yo les ofrezco mi mano "robotica" y los invito a seguirme para que pueden conocer la verdad.'
    );
    await ctx.reply('Es hora de abrir el ojo');
    await ctx.replyWithPhoto('https://upload.wikimedia.org/wikipedia/commons/3/3d/Dollarnote_siegel_hq.jpg');
    ctx.reply('Revelar /conspiracion');
});

bot.command('conspiracion', async (ctx) => {
    const randomConspiracy = conspiracyList[Math.floor(Math.random() * conspiracyList.length)];

    await ctx.replyWithHTML(`<strong>${randomConspiracy.title}</strong> \n${randomConspiracy.text}`);

    if (randomConspiracy.pic !== undefined) {
        await ctx.replyWithPhoto(randomConspiracy.pic);
    }

    if (randomConspiracy.url !== undefined) {
        await ctx.replyWithHTML(`<a href="${randomConspiracy.url}">Leer más</a>`);
    }

    await ctx.replyWithHTML("Revelar otra <a href='/conspiracion'>/conspiracion</a> 🤔🤔🤔 ?");
});

bot.command('mimensaje', async (ctx) => {
    await ctx.replyWithHTML(
        '<strong>Este bot es solo una broma entre amigos, no tome en serio ningun mensaje difundido por esta plataforma.</strong> \n\n Las teorías de la conspiración pueden ser vistas como divertidas, pero son potencialmente peligrosas: "Las teorías de la conspiración tienen consecuencias negativas para la sociedad. Esto es especialmente cierto en el caso de una pandemia, ya que la creencia en conspiraciones puede dañar o incluso matar a la gente. Por consiguiente, es esencial que el público esté informado sobre cómo identificar las teorías de la conspiración para que pueda ignorarlas. \n\n Comparte estos recursos de aprendizaje para que todos podamos participar en la educación entre iguales sobre estos temas. Resistir a la Desinfodemia: Alfabetización mediática e informativa para todos, de todos.'
    );
    await ctx.replyWithDocument('https://conspiracytheories.eu/_wpx/wp-content/uploads/2020/03/COMPACT_Guide-2.pdf');
    await ctx.replyWithDocument('https://www.climatechangecommunication.org/wp-content/uploads/2020/03/ConspiracyTheoryHandbook.pdf');

    await ctx.replyWithPhoto('https://es.unesco.org/sites/default/files/styles/extra_large_1600x1600/public/web_newspiensa.jpg?itok=344qoTta');
});

bot.on('text', async (ctx) => {
    await ctx.reply('Disculpa, no te entiendo soy solo Memba Parabot 🤔... Por el momento solo respondo a estos comandos.');
    showMenu(ctx);
});

function showMenu(ctx) {
    ctx.replyWithHTML('/quiensoy      --- QUIÉN SOY? \n/conspiracion --- REVELAR CONSPIRACIÓN 🤔 \n/mimensaje   --- MI MENSAJE AL MUNDO \n/help             --- AYUDA');
}

// Export bot handler
module.exports = bot;
