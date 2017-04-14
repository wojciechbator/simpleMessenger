import mongoose from 'mongoose'

class CommentSchema extends mongoose.Schema {
    constructor() {
        super({
            author: {
                type: String,
                default: '',
                required: true
            },
            message: {
                type: String,
                default: ''
            },
            timestamp: {
                type: Date,
                default: Date.now,
                required: true
            }
        })
    }
}

export default mongoose.model('comments', new CommentSchema())