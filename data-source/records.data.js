const {
  Records
} = require('../models')

const getCountsData = async ({
  startDate,
  endDate,
  minCount,
  maxCount
}) => {
  return await Records.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        }
      }
    },
    {
      $group: {
        _id: "$key",
        totalCount: {
          $sum: { $sum: "$counts" }
        },
        createdAt: { "$first": "$createdAt" }
      }
    }, {
      $match: {
        totalCount: {
          $gt: minCount,
          $lt: maxCount
        }
      }
    }, {
      $project: {
        _id: 0,
        key: "$_id",
        totalCount: 1,
        createdAt: 1
      }
    }
  ])
}

module.exports = {
  getCountsData
}