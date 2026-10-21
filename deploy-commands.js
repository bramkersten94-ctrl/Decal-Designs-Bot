require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('regels')
    .setDescription('Bekijk de serverregels')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Slash commands registreren...');

    await rest.put(
      Routes.applicationCommands('1562389889012727818'),
      { body: commands }
    );

    console.log('De /regels opdracht is geregistreerd!');
  } catch (error) {
    console.error(error);
  }
})();