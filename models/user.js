// Import modules
import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

// Mongoose schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    /* channels: [ String ] */
    channels: [
        {
            name: String,
            url: String
        }
    ],
    customChannels: [
        {
            name: String,
            url: String
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

// Export user schema
export default mongoose.model('User', UserSchema);