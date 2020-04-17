var mongoose = require('mongoose');

var SequenceIDSchema = mongoose.Schema({
    seq_type: {
        type: String, 
        required: true
    },
    seq_length: {
        type: Number,
        default: 0
    }
});

var SequenceID = mongoose.model('sequenceId', SequenceIDSchema);
module.exports = SequenceID;