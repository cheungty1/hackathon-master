const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
async function getFox() {
  try {
    const fox = await axios.get("https://randomfox.ca/floof/");
    return fox;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  data: new SlashCommandBuilder()
    .setName("fox")
    .setDescription("This will get a random fox"),
  async execute(interaction) {
    const fox = await getFox();
    const contentEmbed = new EmbedBuilder();
    contentEmbed.setTitle("Random 🦊");
    contentEmbed.setColor(0xffa500);
    console.log(fox.data.image);
    contentEmbed.setURL(fox.data.image);
    contentEmbed.setImage(fox.data.image);
    await interaction.reply({ embeds: [contentEmbed] });
  },
};