require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('clientReady', () => {
  console.log(`Bot is online als ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (
    interaction.isChatInputCommand() &&
    interaction.commandName === 'regels'
  ) {
    const embed = new EmbedBuilder()
      .setColor('#CDD800')
      .setTitle('📚 `Reglementen`')
      .setThumbnail('https://cdn.phototourl.com/member/2026-10-21-3a2b5feb-c33a-43e1-896a-1e2d63407911.png')
      .setDescription(
        '*Welkom bij Decal Designs!*\n\n' +
        '**Hier kunt u de volgende regels bekijken.**\n\n' +
        'Ticket, Discord en Copyright regels.\n\n' +
        '*Houdt u zich niet aan deze regels, dan kunnen er sancties volgen.*'
      )
      .setFooter({
        text: 'Decal Designs ©',
        iconURL: 'https://cdn.phototourl.com/member/2026-10-21-3a2b5feb-c33a-43e1-896a-1e2d63407911.png'
      });

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('discord_regels')
        .setLabel('Discord Rules')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('auteursrecht_regels')
        .setLabel('Copyright Rules')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('ticket_regels')
        .setLabel('Ticket Rules')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      embeds: [embed],
      components: [buttons]
    });

    return;
  }

  if (interaction.isButton()) {
    const rules = {
      discord_regels:
        '📜 **SERVER REGELS**\n\n' +
        '1. Behandel iedereen met respect en blijf netjes tegen elkaar.\n' +
        '2. Geen racisme, discriminatie, haatdragende opmerkingen of onnodig drama.\n' +
        '3. Geen spam, reclame of onnodige mentions zonder toestemming.\n' +
        '4. Geen NSFW of andere ongepaste content.\n' +
        '5. Volg altijd de aanwijzingen van de staff.\n' +
        '6. Gebruik de juiste kanalen waarvoor ze bedoeld zijn.\n' +
        '7. Misbruik geen bugs, exploits of andere fouten.\n' +
        '8. Deel geen persoonlijke gegevens van jezelf of anderen.\n' +
        '9. Houd je aan de Discord Terms of Service en Community Guidelines.\n\n' +
        'Bij overtreding van de regels kan staff een waarschuwing, mute, kick of ban geven.',

      auteursrecht_regels:
        '© **COPYRIGHT REGELS**\n\n' +
        '1. Onze producten mogen niet worden doorverkocht.\n' +
        '2. Deel gekochte bestanden niet zonder toestemming.\n' +
        '3. Respecteer het werk van onze makers.\n' +
        '4. Doe onze producten niet voor als je eigen werk.',

      ticket_regels:
        '🎫 **TICKET REGELS**\n\n' +
        '1. Open een ticket voor het juiste onderwerp.\n' +
        '2. Ping staff niet onnodig.\n' +
        '3. Leg je vraag of bestelling duidelijk uit.\n' +
        '4. Wacht geduldig op een reactie.\n' +
        '5. Behandel staff met respect.'
    };

    const text = rules[interaction.customId];

    if (text) {
      await interaction.reply({
        content: text,
        ephemeral: true
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);