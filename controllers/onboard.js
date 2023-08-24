// Import modules
import Channel from '../models/channel.js';
import User from '../models/user.js';

// Controller
export const renderOnBoard = async (req, res) => {
    const pageTitle = 'On board';
    const channels = await Channel.find();
    res.render('pages/user/onboard', { pageTitle, channels });
}

export const saveInitialFeed = async (req, res, next) => {
    if (req.body.channels != undefined) {
        const channelsNamesRaw = req.body.channels.name;
        const userPreferences = [];

        if (Array.isArray(channelsNamesRaw)) {
            channelsNamesRaw.forEach(item => {
                if (!item == '') {
                    userPreferences.push(item);
                }
            });
            
        } else {
            userPreferences.push(channelsNamesRaw);
        }

        const channels = [];

        for (const userPreference of userPreferences) {
            const channelObj = await Channel.findOne({ url: userPreference });
            channels.push(channelObj);
        }

        // const user = await User.findById(req.user._id);
        const user = await User.findOne({ username: 'spilu' });

        user.channels = [];
        for (const channel of channels) {
            user.channels.push(channel);
        }

        await user.save();
        res.redirect('/onboard');

    } else {
        req.flash('error', 'Select at least one rss source')
        res.redirect('/onboard');
    }
}