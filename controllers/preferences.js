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

    const userCustomChannels = user.customChannels;

    const isContained = (arr, item) => {
        let isContained = false;
        if (arr.includes(item)) {
            isContained = true;
            return isContained;
        }
    }

    res.render('pages/user/preferences', { pageTitle, channels, dbChannelsUrl, userChannelsUrl, userCustomChannels, isContained });
}

export const savePreferences = async (req, res) => {
    if (req.body.channels != undefined) {
        const channelsNamesRaw = req.body.channels.name;
        const preferredChannelsUrls = [];

        if (Array.isArray(channelsNamesRaw)) {
            channelsNamesRaw.forEach(item => {
                if (!item == '') {
                    preferredChannelsUrls.push(item);
                }
            });
        } else {
            preferredChannelsUrls.push(channelsNamesRaw);
        }

        // const user = await User.findById(req.user._id);
        const user = await User.findOne({ username: 'spilu' });
        user.channels = [];
        const userCustomChannels = [];

        for (const url of preferredChannelsUrls) {
            const channelObj = await Channel.findOne({ url: url });

            if (channelObj != null) {
                user.channels.push(channelObj);

            } else {
                let customChannelObj = user.customChannels.find(channel => channel.url == url);
                userCustomChannels.push(customChannelObj);
            }
        }

        user.customChannels = [];
        userCustomChannels.forEach(element => {
            user.customChannels.push(element);
        });

        await user.save();

        res.redirect('/dashboard');

    } else {
        req.flash('error', 'Select at least one rss source');
        res.redirect('/preferences');
    }
}

export const renderAddFeed = async (req, res) => {
    const pageTitle = 'Add feed';

    res.render('pages/user/addFeed', { pageTitle });
}

export const saveCustomFeed = async (req, res) => {
    const customChannel = req.body.channel;

    try {
        await parser.parseURL(customChannel.url);

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