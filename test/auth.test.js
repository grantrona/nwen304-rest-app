const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp)

const testEmail = "authtesting@test.com";
const testDisplayName = "auth_testing";
const testPassword = "Qwerty123456@"

after(async () => {
    require('../index').stop();
});

describe("Testing authorization for authenticated user", () => {
    it('Sucessful /GET home screen for unauthenticated user', (done) => {
        chai.request(server)
            .post('/')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object');
                done();
            })

    });

    it('Sucessful /POST login information', (done) => {
        chai.request(server)
            .post('/')
            .end((err, res) => {
                done();
            })
    });
})


describe("Testing authorization for unauthenticated user", () => {

    it('/POST login bad login info', (done) => {
        // TODO
        done();
    })
})