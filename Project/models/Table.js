var mongoose = require('mongoose');
var SequenceID = require('./SequenceID')


var tableSchema = mongoose.Schema({
    row_id: {
        type: Number
    },
    product: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    },
    subtotal: {
        type: mongoose.Schema.Types.Decimal128
    },
    date: {
        type: String
    }
});

// Auto Increment ID
tableSchema.pre('save', async function(next) {
    var document = this;
    if(document.isNew) {
        seq_id = await SequenceID.findOne({seq_type: 'row_id'}).exec();
        if (!seq_id) {
            seq_id = await SequenceID.create({seq_type: 'row_id'});
        }
        seq_id.seq_length++;
        seq_id.save();
        document.row_id = seq_id.seq_length;
    }
    return next();
});

var Table = mongoose.model('row', tableSchema);
module.exports = Table;