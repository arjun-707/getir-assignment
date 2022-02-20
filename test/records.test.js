const axios = require("axios")

describe("Records", () => {
  it('fetch count: ', async () => {
    const { status, data = null } = await axios.post("http://localhost:3000/v1/records/counts", {
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: 2700,
      maxCount: 3000
    })
    expect(status).toBe(200);
    expect(typeof data).toBe("object");
    expect(data.msg).toBe("success");
    expect(data.code).toBe(0);
    expect("records" in data).toBe(true);
    expect(Array.isArray(data.records)).toBe(true);
  })
  it('fetch count error: ', async () => {
    let result
    try {
      result = await axios.post("http://localhost:3000/v1/records/counts", {
      startDate: "2016-01-26",
      endDate: "2018-02-02"
    })
    } catch (ex) {
      result = ex
    }
    expect(typeof result).toBe("object");
    expect("response" in result).toBe(true)
    expect("status" in result.response).toBe(true)
    expect(result.response.status).toBe(400);
    expect("data" in result.response).toBe(true)
    expect(result.response.data.msg).toBe("Invalid params");
    expect(result.response.data.code).toBe(400);
  })
})
