const stayService = require('./stay.service')
// const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getStays(req, res) {
    try {
        const filterBy = req.query
        const stays = await stayService.query(filterBy)
        res.send(stays)
    } catch (err) {
        logger.error('Failed to get stays', err)
        res.status(500).send({ err: 'Failed to get stays' })
    }
}

async function getStay(req, res) {
    try {
        const stay = await stayService.getById(req.params.id)
        res.send(stay)
    } catch (err) {
        logger.error('Failed to get stay', err)
        res.status(500).send({ err: 'Failed to get stay' })
    }
}


module.exports = {
    getStay,
    getStays
}