const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt');
//logging in
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator(val) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
            }
        }
    },
    password: {
        type: String,
        require: true,
        minLength: [6, 'Your password must be at least 6 characters in length']//requirement and err message
    },

    autobots: [{
        type: Schema.Types.ObjectId,
        ref: 'Autobot'
    }]

}, {
    toJSON: {
        transform(user) {
            delete user.password;
            return user;
        }
    }
});
//API TO JUST ADD GET DELETE AND UPDATE ITEMS IN MONGOOSE, NO AUTH GUESTS CAN DO IT



userSchema.pre('save', async function() {
    //check if this is a newly created user and not just a user update
    if (this.isNew) {
        this.password = await hash(this.password, 10);
    }
});

userSchema.methods.validatePassword = async function(formPassword) {
    const is_valid = await compare(this.password, formPassword);
    return is_valid;
}
const USer = model('User', userSchema);
//don't forget to go into compass and delete the inital collection for the unique to work
module.exports = User;