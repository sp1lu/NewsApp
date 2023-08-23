// Import modules
import Channel from '../models/channel.js';
import User from '../models/user.js';

// Controllers
export const renderPreferences = async (req, res) => {
    const pageTitle = 'preferences';

    const channels = await Channel.find();
    const dbChannels = [];
    channels.forEach(item => {
        dbChannels.push(item.url);
    });

    const user = await User.findOne({ username: 'spilu' });
    const userChannels = user.channels;

    const isContained = (arr, item) => {
        let isContained = false;
        if (arr.includes(item)) {
            isContained = true;
            return isContained;
        }
    }

    res.render('pages/user/preferences', { pageTitle, channels, dbChannels, userChannels, isContained });
}

export const savePreferences = async (req, res) => {

    if (req.body.channels != undefined) {
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
    }
}
