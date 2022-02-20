const records = require('../data-source/records.data')

const getCounts = async (props) => {
  return await records.getCountsData(props)
}
module.exports = {
  getCounts
}