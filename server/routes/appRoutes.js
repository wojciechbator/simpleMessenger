import express from 'express'
import controllers from '../controllers'

const router = express.Router()

router.get('/:resource', (req, res, next) => {
    let resource = req.params.resource
    let controller = controllers[resource]
    if (controller === null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: ' + resource
        })
        return
    }
    let promise = new Promise((resolve, reject) => {
        controller.find(req.query, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })

    promise.then((result) => {
        res.json({confirmation: 'success', result: result})
    }).catch((err) => {
        res.json({confirmation: 'fail', message: err})
    })
})

router.get('/:resource/:id', (req, res, next) => {
    let resource = req.params.resource
    let id = req.params.id
    let controller = controllers[resource]

    if (controller === null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: ' + resource
        })
        return
    }

    let promise = new Promise((resolve, reject) => {
        controller.findById(id, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })

    promise.then((result) => {
        res.json({confirmation: 'success', result: result})
    }).catch((err) => {
        res.json({confirmation: 'fail', message: err})
    })
})

router.post('/:resource', (req, res, next) => {
    let resource = req.params.resource
    let controller = controllers[resource]

    if (controller === null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: ' + resource
        })
        return
    }

    let promise = new Promise((resolve, reject) => {
        controller.create(req.body, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })

    promise.then((result) => {
        res.json({confirmation: 'success', result: result})
    }).catch((err) => {
        res.json({confirmation: 'fail', message: err})
    })
})

router.put('/:resource/:id', (req, res, next) => {
    let id = req.params.id
    let resource = req.params.resource
    let controller = controllers[resource]

    if (controller === null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: ' + resource
        })
        return
    }

    let promise = new Promise((resolve, reject) => {
        controller.update(id, req.body, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })

    promise.then((result) => {
        res.json({confirmation: 'fail', result: result})
    }).catch((err) => {
        res.json({confirmation: 'fail', message: err})
    })
})

router.delete('/:resource/:id', (req, res, next) => {
    let id = req.params.id
    let resource = req.params.resource
    let controller = controllers[resource]

    if (controller === null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: ' + resource
        })
        return
    }

    let promise = new Promise((resolve, reject) => {
        controller.destroy(id, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })

    promise.then((result) => {
        res.json({confirmation: 'success', result: result})
    }).catch((err) => {
        res.json({confirmation: 'fail', message: err})
    })
})
module.exports = router