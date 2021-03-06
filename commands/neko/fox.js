const index = require('./../../index');
const loc = index.getLocalization();

const dc = require('discord.js');

const apiURL = ['https://nekos.life/api/v2/img/fox_girl', 'https://nekos.life/api/v2/img/holo'],
    apiURL_NSFW = ['https://nekos.life/api/v2/img/lewdk', 'https://nekos.life/api/v2/img/holoero', 'https://nekos.life/api/v2/img/hololewd', 'https://nekos.life/api/v2/img/erok'];

module.exports.cmd = {
    name: 'Fox',

    category: index.CommandCategory.NEKOS_LIFE,

    localizationSubGroup: 'Nekos.Life-API'
};

module.exports.onCommand = async (bot, msg, cmd, args = [], guildPrefix) => {
    let nsfw = args.length > 0 && (args.includes('nsfw') || args.includes('lewd'));

    if (nsfw && !msg.channel.nsfw) {
        msg.reply(loc.getStringForGuild(this, 'Bot:ChannelNotNSFW', msg));
        return;
    }

    index.Utils.getJSONFromURL((nsfw ? apiURL_NSFW.random() : apiURL.random()), (json) => {
        if (json && json.url) {
            msg.channel.send(
                new dc.RichEmbed()
                    .setColor(0x00AE86)
                    .setTitle(loc.getStringForGuild(this, '{%cmd}:RichTitle' + (nsfw ? '_NSFW' : ''), msg))

                    .setImage(json.url)

                    .setFooter(loc.getStringForGuild(this, '{%cmd}:RichFooter' + (nsfw ? '_NSFW' : ''), msg)
                        .format(index.Utils.getUsernameFromUser(msg), `${guildPrefix}Help ${this.cmd.name}`), msg.author.avatarURL)
            );
        } else {
            msg.channel.send(
                new dc.RichEmbed()
                    .setColor(0x00AE86)
                    .setTitle(loc.getStringForGuild(this, 'ERR_OCCURRED', msg))
            );
        }
    });
}