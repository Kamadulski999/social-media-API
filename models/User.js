const { Schema, model, Types } = require('mongoose');

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
                    return /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(v);
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
      virtuals: true
    }, 
    id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
      (total, friends) => total + friends.replies.length + 1,
      0
    );
  });

const User = model('User', UserSchema)

module.exports = User