const { Schema, model, Types } = require('mongoose');

const friendSchema = new Schema (
    {

    }
)

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: 'You must provide a user name!',
            unique: true,
            trim: true
        },
        email: {
            type: String,            
            unique:true,
            validate: {
                validator: function(v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                }                
            },
            required: [true, 'Email address is required!']                  
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'    
            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }    
        ]   
    },
    {
    toJSON: {
      virtuals: true,
      getters: true,
    }, 
    id: false
    }
);


UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})



const User = model('User', UserSchema)

module.exports = User