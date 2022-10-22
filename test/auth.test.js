const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp)
chai.use(require('chai-dom'))

// Stops server once test cases have executed
after(async () => {
    require('../index').stop();
});

// Credentials for testing account
const testEmail = "authtesting@test.com";
const testDisplayName = "auth_testing";
const testPassword = "Qwerty123456@"
const loginInfo = {
    email: testEmail,
    password: testPassword,
}


describe("Testing authorization for authenticated user", () => {
    it('Sucessful /GET home screen for unauthenticated user', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object');
                done();
            })

    });

    it('Sucessful /POST login with  correct credantials', (done) => {
        chai.request(server)
            .post('/login/email')
            .send(loginInfo)
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('OK')
                // Check cookie exists in response
                expect(res).to.have.cookie('session');
                done();
            })
    });

    it('Accept /GET to add-post page after login passing correct cookie', (done) => {
        chai.request(server)
            .post('/login/email')
            .send(loginInfo)
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('OK')
                expect(res).to.have.cookie('session');
                // get gernerated cookie from header
                const cookie = res.header['set-cookie'][0];

                // Test accessing add-post page with correct cookie header
                chai.request(server)
                    .get('/protected/addPostPage')
                    .set('Cookie', cookie)
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        // Expect for a html page to be returned
                        expect(res.header['content-type']).to.equal('text/html; charset=utf-8')
                        done();
                    })
            });
    });

    it('Accept /GET to my-posts page after login passing correct cookie', (done) => {
        chai.request(server)
            .post('/login/email')
            .send(loginInfo)
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('OK')
                expect(res).to.have.cookie('session');
                // get gernerated cookie from header
                const cookie = res.header['set-cookie'][0];

                // Test accessing add-post page with correct cookie header
                chai.request(server)
                    .get('/protected/myposts')
                    .set('Cookie', cookie)
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        // Expect for a html page to be returned
                        expect(res.header['content-type']).to.equal('text/html; charset=utf-8')
                        done();
                    })
            });
    });

    it('Accept /GET to user profile page after login passing correct cookie', (done) => {
        chai.request(server)
            .post('/login/email')
            .send(loginInfo)
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('OK')
                expect(res).to.have.cookie('session');
                // get gernerated cookie from header
                const cookie = res.header['set-cookie'][0];

                // Test accessing add-post page with correct cookie header
                chai.request(server)
                    .get('/protected/profile')
                    .set('Cookie', cookie)
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        // Expect for a html page to be returned
                        expect(res.header['content-type']).to.equal('text/html; charset=utf-8')
                        done();
                    })
            });
    });

})


describe("Testing authorization for unauthenticated user", () => {
    badEmail = 'wrong-email@email.com'
    badPassword = 'mochatesting123'

    it('Reject /POST login with incorrect email information', (done) => {
        const badLoginInfo = {
            email: badEmail,
            password: testPassword,
        }

        chai.request(server)
            .post('/login/email')
            .send(badLoginInfo)
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.text).to.equal('No account with this email found')
                done();
            })
    });

    it('Reject /POST login with incorrect password', (done) => {
        const badLoginInfo = {
            email: testEmail,
            password: badPassword,
        }

        chai.request(server)
            .post('/login/email')
            .send(badLoginInfo)
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.text).to.equal('Incorrect password')
                done();
            })
    });

    it('Reject /GET for protected addPostPage path from unauthenticated user', (done) => {
        chai.request(server)
            .get('/protected/addPostPage')
            .end((err, res) => {
                expect(res.status).to.equal(401);
                // Expect for a html page to be returned
                expect(res.header['content-type']).to.equal('text/html; charset=utf-8')
                done();
            })
    });

    it('Reject /GET for protected myposts path from unauthenticated user', (done) => {
        chai.request(server)
            .get('/protected/myposts')
            .end((err, res) => {
                expect(res.status).to.equal(401);
                // Expect for a html page to be returned
                expect(res.header['content-type']).to.equal('text/html; charset=utf-8')
                done();
            })
    });


    it('Reject /GET for protected profile path from unauthenticated user', (done) => {
        chai.request(server)
            .get('/protected/profile')
            .end((err, res) => {
                expect(res.status).to.equal(401);
                // Expect for a html page to be returned
                expect(res.header['content-type']).to.equal('text/html; charset=utf-8')
                done();
            })
    });

    it('Accept /POST login but reject incorrect cookie', (done) => {
        chai.request(server)
            .post('/login/email')
            .send(loginInfo)
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('OK')
                expect(res).to.have.cookie('session');
                const cookie = "incorrect-cookie value"

                // Test accessing add-post page with malformed cookie
                chai.request(server)
                    .get('/protected/addPostPage')
                    .set('Cookie', cookie)
                    .end((err, res) => {
                        expect(res.status).to.equal(401);
                        // Expect for a html page to be returned
                        expect(res.header['content-type']).to.equal('text/html; charset=utf-8')
                        done();
                    })
            });
    });

    it('User Signs out and cannot access protected paths again', (done) => {
        chai.request(server)
            .post('/login/email')
            .send(loginInfo)
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('OK')
                expect(res).to.have.cookie('session');

                // Sign our of session
                chai.request(server)
                    .get('/signout')
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res).to.not.have.cookie('session');

                        // Test accessing add-post page after sign out
                        chai.request(server)
                            .get('/protected/addPostPage')
                            .end((err, res) => {
                                expect(res.status).to.equal(401);
                                // Expect for a html page to be returned
                                expect(res.header['content-type']).to.equal('text/html; charset=utf-8')
                                done();
                            })
                    })
            });
    })
})