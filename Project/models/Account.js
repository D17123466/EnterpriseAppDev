var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var account_schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false,
        // match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/, "Please enter a minimum 8 characters of alphabet and number"]
    }
}, {
    toObject: {
        virtual: true
    }
});

account_schema.virtual('password_confirm')
    .get(function () {
        return this._password_confirm;
    })
    .set(function (value) {
        this._password_confirm = value;
    });

account_schema.virtual('password_old')
    .get(function () {
        return this._password_old;
    })
    .set(function (value) {
        this._password_old = value;
    })

account_schema.virtual('password_current')
    .get(function () {
        return this._password_current;
    })
    .set(function (value) {
        this._password_current = value;
    })

account_schema.virtual('password_new')
    .get(function () {
        return this._password_new;
    })
    .set(function (value) {
        this._password_new = value;
    })

account_schema.path('password').validate(function (v) {
    var account = this;
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    if (account.isNew) {
        if (!regex.test(account.password)) {
            return account.invalidate('password', "Please enter a minimum 8 characters of alphabet and number");
        }
        // if  (!account.password_confirm) {
        //     account.invalidate('password_confirm', "Please confirm your password");
        // }
        if (account.password !== account.password_confirm) {
            return account.invalidate('password_confirm', "Your password don't match");
        }
    }
    
    if (!account.isNew) { 
        // if (!account.password_current) {
        //     account.invalidate('password_current', "Please confirm your password");
        // }
        // else 
        if (!bcrypt.compareSync(account.password_current, account.password_old)) {
            return account.invalidate('password_current', "Your password is invalid");
        }

        if (!regex.test(account.password_new)) {
            return account.invalidate('password_new', "Please enter a minimum 8 characters of alphabet and number");
        }
        if (account.password_new !== account.password_confirm) {
            return account.invalidate('password_confirm', "Your password don't match");
        }        
    }
});

account_schema.pre('save', function (next) {
    var account = this;
    if (!account.isModified('password')) {
        return next();
    }
    else {
        account.password = bcrypt.hashSync(account.password);
        return next();
    }
});

account_schema.methods.authenticate = function (password) {
    var account = this;
    return bcrypt.compareSync(password, account.password);
};

var Account = mongoose.model('account', account_schema);
module.exports = Account;



