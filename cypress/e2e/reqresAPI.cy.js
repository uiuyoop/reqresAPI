it("SINGLE USER", () => {
    cy.request({
        method: 'GET',
        url: '/api/users/2'
   }).then( (response) => {
        expect(response).to.have.property('status', 200)
        expect(response.body).to.be.not.null
        expect(response.body.data.first_name).to.be.a('string')
        expect(response.body.data.email).to.be.a('string')
        expect(response.body.data.id).to.satisfy((num) => { return num > 0 })
        expect(response.body.data.last_name).to.be.a('string')
    })
})

it("SINGLE USER NOT FOUND", () => {
    cy.request({
        method: 'GET',
        url: '/api/users/23',
        failOnStatusCode: false
   }).then( (response) => {
        expect(response).to.have.property('status', 404)
    })
})

it("SINGLE <RESOURCE", () => {
    cy.request({
        method: 'GET',
        url: '/api/unknown/2'
   }).then( (response) => {
        expect(response).to.have.property('status', 200)
        expect(response.body).to.not.be.null
        expect(response.body.data.color).to.be.a('string')
        expect(response.body.data.id).to.satisfy((num) => { return num > 0 })
        expect(response.body.data.name).to.be.a('string')
        expect(response.body.data.pantone_value).to.be.a('string')
        expect(response.body.data.year).to.satisfy((num) => { return num > 0 })
    })
})

it("CREATE", () => {
    cy.request({
        method: 'POST',
        url: '/api/users',
        body: 
        {
            name: "morpheus",
            job: "leader"
        }
   }).then( (response) => {
        expect(response).to.have.property('status', 201)
        expect(response.body).to.not.be.null
        expect(response.body.createdAt).to.be.a('string')
        expect(response.body.id).to.be.a('string')
        expect(response.body.job).to.be.a('string')
        expect(response.body.name).to.be.a('string')

    })
})

it("UPDATE", () => {
    cy.request({
        method: 'POST',
        url: '/api/users',
        body: 
        {
            name: "morpheus",
            job: "zion resident"
        }
   }).then( (response) => {
        expect(response).to.have.property('status', 201)
        expect(response.body).to.not.be.null
        expect(response.body.createdAt).to.be.a('string')
        expect(response.body.id).to.be.a('string')
        expect(response.body.job).to.be.a('string')
        expect(response.body.name).to.be.a('string')

    })
})

it("REGISTER - SUCCESSFUL", () => {
    cy.request({
        method: 'POST',
        url: '/api/register',
        body: 
        {
            email: "eve.holt@reqres.in",
            password: "pistol"
        }
   }).then( (response) => {
        expect(response).to.have.property('status', 200)
        expect(response.body).to.not.be.null
        expect(response.body.id).to.satisfy((num) => { return num > 0 })
        expect(response.body.token).to.be.a('string')
    })
})

it("REGISTER - UNSUCCESSFUL", () => {
    cy.request({
        method: 'POST',
        url: '/api/register',
        failOnStatusCode: false,
        body: 
        {
            email: "sydney@fife"
        }
   }).then( (response) => {
        expect(response).to.have.property('status', 400)
        expect(response.body).to.not.be.null
        expect(response.body.error).to.be.a('string')
    })
})

it("DELETE", () => {
    cy.request('DELETE', '/api/users/2').then( (response) => {
        expect(response).to.have.property('status', 204)
    })
})