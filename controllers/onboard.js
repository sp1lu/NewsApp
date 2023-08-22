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
    const channelsNamesRaw = req.body.channels.name;
    const channels = [];
    
    if (Array.isArray(channelsNamesRaw)) {
        channelsNamesRaw.forEach(item => {
            channels.push(item);
        });
    } else {
        channels.push(channelsNamesRaw);
    }

    // const user = await User.findById(req.user._id);
    const user = await User.findOne({ username: 'spilu' });

    user.channels = [];
    for (const channel of channels) {
        user.channels.push(channel);
    }

    await user.save();

    res.redirect('/');
}