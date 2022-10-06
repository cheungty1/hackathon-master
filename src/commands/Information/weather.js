const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
async function getWeather(query) {
  try {
    const weather = await axios.get(
      `https://goweather.herokuapp.com/weather/${query}`
    );
    return weather;
  } catch (error) {
    console.log(error);
  }
}
const capitalizeFirstLetter = (query) => {
  return query.charAt(0).toUpperCase() + query.slice(1);
};
module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("This will search weather")
    .addStringOption((option) =>
      option
        .setName("location")
        .setDescription("Insert Location")
        .setRequired(true)
    ),
  async execute(interaction) {
    const query = interaction.options.getString("location");
    const {
      data: { temperature, wind, description, forecast },
    } = await getWeather(query);
    const contentEmbed = new EmbedBuilder();
    contentEmbed.setTitle(
      `Weather Temperature for ${capitalizeFirstLetter(query)}`
    );
    contentEmbed.setDescription(`
      Temperature: ${temperature}
      Wind: ${wind}
      Description: ${description}
    `);
    forecast.map((f) => {
      contentEmbed.addFields({ name: "Day", value: f.day, inline: true });
      contentEmbed.addFields({
        name: "Temperature",
        value: f.temperature,
        inline: true,
      });
      contentEmbed.addFields({ name: "Wind", value: f.wind, inline: true });
    });
    contentEmbed.setImage("https://i.imgur.com/ut4L2Qc.png");
    contentEmbed.setTimestamp();
    contentEmbed.setFooter({
      text: "Weather BOT",
      iconURL: "https://i.imgur.com/ut4L2Qc.png",
    });
    contentEmbed.setColor(0x4f5d73);
    await interaction.reply({ embeds: [contentEmbed] });
  },
};