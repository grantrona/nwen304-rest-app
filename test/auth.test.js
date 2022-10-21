const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const assert = chai.assert;

chai.use(chaiHttp)

const testEmail = "authtesting@test.com";
const testDisplayName = "auth_testing";
const testPassword = "Qwerty123456@"

describe("Testing authorization for authenticated user", () => {

    it('Sucessful /GET home screen for unauthenticated user', (done) => {
        chai.request(server)
            .post('/')
            .end((err, res) => {
                assert.equal(res.status, 200);
                done();
            })

    })
})


describe("Testing authorization for unauthenticated user", () => {

    it('/POST login bad login info', (done) => {
        // TODO
        done();
    })
})