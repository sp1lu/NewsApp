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

    const isContained = (item) => {
        let isContained = false;
        if (userChannels.includes(item)) {
            isContained = true;
            return isContained;
        }
    }

    res.render('pages/user/preferences', { pageTitle, channels, dbChannels, userChannels, isContained });
}