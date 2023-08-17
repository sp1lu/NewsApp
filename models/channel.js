// Import modules
import mongoose, { Schema } from "mongoose";

// Mongoose schema
const ChannelSchema = new Schema({
    name: String,
    url: String
});

export default mongoose.model('Channel', ChannelSchema);