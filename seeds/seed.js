// Import tmodules
import mongoose from "mongoose";
import Channel from '../models/channel.js';

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
}

seedDb()
    .then(() => {
        mongoose.connection.close();
    })