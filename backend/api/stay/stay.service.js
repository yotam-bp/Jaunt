
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById
}

async function query(filterBy) {
    const criteria = _buildCriteria(filterBy)
    logger.debug(`stay.service-query filterby ${filterBy.location}`)
    try {
        const collection = await dbService.getCollection('stay')
        var stays = await collection.find(criteria).toArray()
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = await collection.findOne({ '_id': ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    const specChars = /[-!$%^&*()\\_+|~=`{}\[\]:";'<>?,.\/]/
    if (filterBy.keyword && !specChars.test(filterBy.keyword)) {
        const criteriaTxt = { $regex: filterBy.keyword, $options: 'i' }
        criteria.$or = [
            {
                name: criteriaTxt
            },
            {
                type: criteriaTxt
            }
        ]

    }
    // if (filterBy.type !== 'all' && filterBy.type) {
    //     criteria.type = { $regex: filterBy.type, $options: 'i' }
    // }

    // if (filterBy.ctg === 'inStock') {
    //     criteria.inStock = { $eq: true }
    // }
    return criteria
}
