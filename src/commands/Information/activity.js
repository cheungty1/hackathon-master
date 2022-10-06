const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("activity")
		.setDescription("Gives you suggested activities to do!")
		.addStringOption(option =>
            option.setName("weather-type")
                .setDescription("Type either Sunny, Raining, Snowing or Windy")
                .setRequired(true)
                .addChoices(
                    { name: "Sunny", value: "sunny" },
                    { name: "Raining", value: "raining" },
                    { name: "Thunderstorm", value: "thunderstorm" },
                    { name: "Snowing", value: "snowing" },
                    { name: "Windy", value: "windy" },
                )),
	async execute(interaction) {
        console.log(interaction.options.getString("weather-type"));

        if (interaction.options.getString("weather-type") === "sunny") {
            const randomSunny = [
                { item: "surfing!", image: "https://i.imgur.com/IHZyjhB.png" },
                { item: "on a picnic!", image: "https://i.imgur.com/4tuOyY1.png" },
                { item: "swimming!", image: "https://i.imgur.com/1jSkXVZ.png" },
                { item: "bush walking!", image: "https://i.imgur.com/d2HFYRM.png" },
                { item: "walk the dog!", image: "https://i.imgur.com/SNJG9o2.png" }];
            
            const answer = randomSunny[Math.floor(Math.random() * randomSunny.length)]; 
            const contentEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`You should go ${answer.item}`)
            .setImage(answer.image);
            
            await interaction.reply({ embeds: [contentEmbed] });
        } 
        
        if (interaction.options.getString("weather-type") === "raining") {
            const randomRain = [
                { item: "go to the cinemas!", image: "https://i.imgur.com/ZSexzQL.png" },
                { item: "go to a cafe!", image: "https://i.imgur.com/wyRcZJ5.png" },
                { item: "read a book", image: "https://i.imgur.com/ECRTkQx.png" }];

            const answer = randomRain[Math.floor(Math.random() * randomRain.length)]; 
            const contentEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`You should ${answer.item}`)
            .setImage(answer.image);

            await interaction.reply({ embeds: [contentEmbed] });
        }

        if (interaction.options.getString("weather-type") === "thunderstorm") {
            const randomThunderstorm = [
                { item: "have some wine and a charcuterie board!", image: "https://i.imgur.com/ggQSfWK.png" },
                { item: "take cover under a bridge!", image: "https://i.imgur.com/EaYSv2p.png" },
                { item: "play a board game inside!", image: "https://i.imgur.com/tWvowhI.png" }];

            const answer = randomThunderstorm[Math.floor(Math.random() * randomThunderstorm.length)]; 
            const contentEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`You should ${answer.item}`)
            .setImage(answer.image);

            await interaction.reply({ embeds: [contentEmbed] });
        }

        if (interaction.options.getString("weather-type") === "snowing") {
            const randomSnowing = [
                { item: "snow boarding!", image: "https://i.imgur.com/OBxF19A.png" },
                { item: "skiing!", image: "https://i.imgur.com/wyeBgCV.png" },
                { item: "to the onsen day spa!", image: "https://i.imgur.com/73ELyVQ.png" },
                { item: "make snow angels!", image: "https://i.imgur.com/QYmviSf.png" },
                { item: "make a snow man!", image: "https://i.imgur.com/Vy9g0GN.png" }];

            const answer = randomSnowing[Math.floor(Math.random() * randomSnowing.length)];
            const contentEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`You should go ${answer.item}`)
            .setImage(answer.image);

            await interaction.reply({ embeds: [contentEmbed] });
        }

        if (interaction.options.getString("weather-type") === "windy") {
            const randomWindy = [
                { item: "kite surfing!", image: "https://i.imgur.com/0h42uoX.png" },
                { item: "have a party!", image: "https://i.imgur.com/wkqQ5aO.png" },
                { item: "put out your washing to dry!", image: "https://i.imgur.com/ufqjzAP.png" }];

            const answer = randomWindy[Math.floor(Math.random() * randomWindy.length)];
            const contentEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`You should go ${answer.item}`)
            .setImage(answer.image);

            await interaction.reply({ embeds: [contentEmbed] });
        }
	},
};

// interaction.options.getString("weather-type").equals("sunny")

// const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
// const image = new AttachmentBuilder("../assets/surfing.png");
// .setImage("attachment://surfing.png");
// .setImage("https://unsplash.com/photos/_CFv3bntQlQ");
// .setImage("https://imgur.com/IHZyjhB");
// await interaction.reply({ embeds: [contentEmbed], files: [image] });

// const answer = randomRain(Math.floor(Math.random() * randomRain.length)); 

