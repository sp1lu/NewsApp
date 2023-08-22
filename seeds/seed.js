// Import tmodules
import mongoose from "mongoose";
import Channel from '../models/channel.js';
import User from '../models/user.js'

import { rssChannels } from "./rss.js";


// Connect Mongoose to MongoDB and handle success or errors
const dbUrl = 'mongodb://127.0.0.1:27017/newsapp';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

// Seed database
const seedDb = async () => {
    await Channel.deleteMany({});

    for (let rssChannel of rssChannels) {
        rssChannel = new Channel({
            name: rssChannel.name,
            url: rssChannel.url
        })

        await rssChannel.save();
    }

    await User.deleteMany({});
    const user = new User({
        email: 'davide.rivolta@yahoo.it',
        username: 'spilu',
        salt: '0fa9f21255e4b9520858bf2e7a29492623288b9e3ff7bdd8269b1fdea72a9e23',
        hash: 'cfc3b930d43a9c0aa9d15d0e68c95139968640935ed6c23b9361153dd48292d841d3dd3ad98753933a96bd74c05d7268d1f9d3007667874c495d6b9639f3a6895200711c8b6fbcd10def48a9e4c0268302c8d912b6ac39af8957b20e14e2423b81b5cf9478afa080592662dfca09b315edb4c51b0785831213e6afa001625e382feca962aeb8667cfe651db0ac29fa72a9288767270a459af95ace847c0071bb09e209ef7eda3c243f484b202745fbc2c7c2e2b4da6c366c73ba779af7695c1a89836d5aa32f17c00d505564748187c5065957c8216d5d7dc517d1c1dff5f7d4dc43279f845f54d7f73be916695f097c59f9b2a57ecd738096a3e8050babdd977914bcfd8471a1253a73445bb71a3bac2b6de8ccee1bbc7a34c56e04aba6f8cd68a48d5ee9924ce72b827703e548f8a9012f6c0d67db201d329eb2ecce527ed047c63a851f858665f69ead32bfa6dad448cb1889f22571613c9befc92679cdde94c2609ef67404b94f4ceacb4f973507c263c11a2810e7d00e27cf98b7226f11e11db8996990fe776217e48904bbde209d0b183529a770ee555660f7b8a33e0f564625c10426a452db55378592f345345681495d7594d4f349db402acab44a78b8d4ee49e1ec070c648cb35680b80ae64e6e7410cfaa3b1dae31b608833592a5ac1526dc6a6177e88e8c070b9112d29349f51c34bf59061369c7b26654b19770',
        channels: [
            'https://www.reddit.com/r/chickens/new/.rss',
            'https://www.dunkest.com/it/rss/notizie/nba/ultime'
        ]
    });

    await user.save();
}

seedDb()
    .then(() => {
        mongoose.connection.close();
    })