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
const weekday = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const d = new Date();
let symbol;
const weatherSymbol = (description) => {
  switch (description) {
    case "Sunny":
      symbol = "☀️";
      return symbol;
    case "Light rain":
      symbol = "🌦";
      return symbol;
    case "Light rain shower":
      symbol = "🌦";
      return symbol;
    case "Partly cloudy":
      symbol = "⛅️";
      return symbol;
    case "Moderate snow":
      symbol = "❄️";
      return symbol;
    case "Clear":
      symbol = "🌞";
      return symbol;
    default:
      symbol = "";
      return symbol;
  }
};
let imageUrl;
const getImageUrl = (description) => {
  switch (description) {
    case "Light rain":
      imageUrl = "https://i.imgur.com/cyjUcoP.png";
      return imageUrl;
    case "Light rain shower":
      imageUrl = "https://i.imgur.com/cyjUcoP.png";
      return imageUrl;
    case "Partly cloudy":
      imageUrl = "https://i.imgur.com/c9GsDBi.png";
      return imageUrl;
    case "Moderate snow":
      imageUrl = "https://i.imgur.com/77GeVE0.png";
      return imageUrl;
    case "Clear":
      imageUrl = "https://i.imgur.com/6nTNzkg.png";
      return imageUrl;
    case "Sunny":
      imageUrl = "https://i.imgur.com/aQAm7Us.png";
      return imageUrl;
    default:
      imageUrl = "";
      return imageUrl;
  }
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
      `Current Weather Temperature for ${capitalizeFirstLetter(query)}`
    );
    contentEmbed.setDescription(`
      Temperature: 🌡️ ${temperature}
      Wind: 💨 ${wind}
      Weather Condition: ${weatherSymbol(description)} ${description}
    `);
    forecast.map((f, i) => {
      contentEmbed.addFields({
        name: "Date",
        value: weekday[d.getDay() + i++],
        inline: true,
      });
      contentEmbed.addFields({
        name: "Temperature",
        value: `🌡️ ${f.temperature}`,
        inline: true,
      });
      contentEmbed.addFields({
        name: "Wind",
        value: `💨 ${f.wind}`,
        inline: true,
      });
    });
    contentEmbed.setImage(getImageUrl(description));
    contentEmbed.setTimestamp();
    contentEmbed.setFooter({
      text: "Weather BOT",
      iconURL: "https://i.imgur.com/ut4L2Qc.png",
    });
    contentEmbed.setColor(0x4f5d73);
    await interaction.reply({ embeds: [contentEmbed] });
  },
};