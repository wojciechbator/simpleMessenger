import user from '../models/user'

export default {
    find: (parameters, callback) => {
        user.find((err, foundUsers) => {
            if(err) {
                callback(err, null)
                return
            }
            callback(null, foundUsers)
        })
    },
    findById: (parameters, callback) => {
        user.findById((err, foundUser) => {
            if(err) {
                callback(err, null)
                return
            }
            callback(null, foundUser)
        })
    },
    create: (parameters, callback) => {
        user.create(parameters, (err, user) => {
            if(err) {
                callback(err, null)
                return
            }
            callback(null, user)
        })
    },
    update: (id, parameters, callback) => {
        user.findByIdAndUpdate(id, parameters, { new: true }, (err, updatedUser) => {
            if(err) {
                callback(err, null)
                return
            }
            callback(null, user)
        })
    },
    delete: (id, callback) => {
        user.findByIdAndRemove(id, (err) => {
            if(err) {
                callback(err, null)
                return
            }
            callback(null, null)
        })
    }
}