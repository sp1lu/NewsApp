// Import modules
import Channel from '../models/channel.js';
import User from '../models/user.js';
import Parser from 'rss-parser';

// Start rss parser
let parser = new Parser();

// Controllers
export const renderPreferences = async (req, res) => {
    const pageTitle = 'Preferences';

    const channels = await Channel.find();
    const dbChannelsUrl = [];
    channels.forEach(element => {
        dbChannelsUrl.push(element.url);
    });

    const user = await User.findOne({ username: 'spilu' });
    const userChannelsUrl = [];
    user.channels.forEach(element => {
        userChannelsUrl.push(element.url);
    });

    const isContained = (arr, item) => {
        let isContained = false;
        if (arr.includes(item)) {
            isContained = true;
            return isContained;
        }
    }

    res.render('pages/user/preferences', { pageTitle, channels, dbChannelsUrl, userChannelsUrl, isContained });
}

export const savePreferences = async (req, res) => {
    if (req.body.channels != undefined) {
        const channelsNamesRaw = req.body.channels.name;
        const channelsUrls = [];

        if (Array.isArray(channelsNamesRaw)) {
            channelsNamesRaw.forEach(item => {
                if (!item == '') {
                    channelsUrls.push(item);
                }
            });
        } else {
            channelsUrls.push(channelsNamesRaw);
        }

        // const user = await User.findById(req.user._id);
        const user = await User.findOne({ username: 'spilu' });
        user.channels = [];

        for (const channelUrl of channelsUrls) {
            const channelObj = await Channel.findOne({ url: channelUrl });
            user.channels.push(channelObj);
        }

        await user.save();

        res.redirect('/preferences');

    } else {
        req.flash('error', 'Select at least one rss source');
        res.redirect('/preferences');
    }

    /* if (req.body.channels != undefined) {
        const channelsNamesRaw = req.body.channels.name;
        const channels = [];

        if (Array.isArray(channelsNamesRaw)) {
            channelsNamesRaw.forEach(item => {
                if (!item == '') {
                    channels.push(item);
                }
            });
        } else {
            channels.push(channelsNamesRaw);
        }

        // const user = await User.findById(req.user._id);
        const user = await User.findOne({ username: 'spilu' });

        user.channels = [];
        for (let channel of channels) {

            try {
                await fetch(channel);
                user.channels.push(channel);

            } catch (error) {
                req.flash('error', `Custom url ${channel} is not a valid rss source`);
            }
        }

        await user.save();
        res.redirect('/dashboard');

    } else {
        req.flash('error', 'Select at least one rss source')
        res.redirect('/preferences');
    } */
}

export const renderAddFeed = async (req, res) => {
    const pageTitle = 'Add feed';

    res.render('pages/user/addFeed', { pageTitle });
}

export const saveCustomFeed = async (req, res) => {
    const customChannel = req.body.channel;

    /* try {
        const response = await fetch(customChannel.url);
        console.log(response.status);
        //user.channels.push(customChannel);

    } catch (error) {
        req.flash('error', `${customChannel.name}'s url is not a valid rss source`);
    } */

    try {
        let feed = await parser.parseURL(customChannel.url);

        // const user = await User.findById(req.user._id);
        const user = await User.findOne({ username: 'spilu' });
        user.customChannels.push(customChannel);
        await user.save();

        res.redirect('/preferences');

    } catch (error) {
        req.flash('error', `${customChannel.name}'s urls is not a valid rss source`);
        res.redirect('/preferences/add');
    }
}