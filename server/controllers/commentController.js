import comment from '../models/comment'

export default {
    find: (parameters, callback) => {
        comment.find((err, comment) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, comment)
        })
    },
    findById: (parameters, callback) => {
        comment.findById((err, comment) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, comment)
        })
    },
    create: (parameters, callback) => {
        comment.create(parameters, (err, comment) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, comment)
        })
    },
    update: (id, parameters, callback) => {
        comment.findByIdAndUpdate(id, parameters, {
            new: true
        }, (err, comment) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, comment)
        })
    },
    delete: (id, callback) => {
        comment.findByIdAndRemove(id, (err) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, null)
        })
    }
}