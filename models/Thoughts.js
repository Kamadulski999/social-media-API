const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema(
    {    reactionId: {
          type: Schema.Types.ObjectId,
          default: ()=> new Types.ObjectId()
        },
          reactionBody: {
          type: String,
          required: true,
          trim: true,        
          maxLength: 280
        },
        userName: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => dateFormat(createdAtVal)
        }
      },
        {
        toJSON: {
          virtuals: true
        },
        id: false
      }
    );

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You must enter a thought!',
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
          },
        userName: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
        {
        toJSON: {
          virtuals: true
        },       
      }
    );

    const Thoughts = model('Thoughts', ThoughtSchema);

    ThoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
      });

      module.exports = Thoughts