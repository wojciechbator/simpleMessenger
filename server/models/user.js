import mongoose from 'mongoose'

class UserSchema extends mongoose.Schema {
    constructor() {
        super({
            login: {
                type: String,
                default: '',
                required: true
            },
            password: {
                type: String,
                default: '',
                required: true
            },
            name: {
                type: String,
                default: '',
                required: false
            },
            surname: {
                type: String,
                default: '',
                required: false
            },
        })
    }
}

export default mongoose.model('UserSchema', new UserSchema())