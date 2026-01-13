pm.test("Status code is 200", () => {
    pm.response.to.have.status(200);
})

// pm.test("Response time is less than 500ms", () => {
//     pm.expect(pm.response.responseTime).to.be.below(500);
// })

pm.test("Response body is not empty", () => {
    pm.expect(pm.response.text()).to.not.be.empty;
})

pm.test("Response body is an object", () => {
    pm.expect(pm.response.json()).to.be.an('object')
})

pm.test("Response has data property", () => {
    pm.expect(pm.response.json()).to.have.property("data")
})

