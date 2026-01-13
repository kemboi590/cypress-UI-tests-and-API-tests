pm.test("Status code is 201", () => {
    // pm.response.to.have.status(201);
    pm.expect(pm.response.to.have.status(201))
})

pm.test("Response body is an Object", () => {
    pm.expect(pm.response.json()).to.be.an('object')
})

pm.test("Todo created successfully", () => {
    pm.expect(pm.response.json()).to.have.property(
        "message",
        "Todo created successfully"
    )
})

pm.test("Response doesnot contain an error", () => {
    pm.expect(pm.response.json()).to.not.have.property("error")
})

