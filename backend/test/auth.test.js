// test/auth.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index'); // Asegúrate de que este apunte a tu archivo principal
const should = chai.should();

chai.use(chaiHttp);

describe('Auth', () => {
    describe('/POST login', () => {
        it('it should login a user', (done) => {
            let user = {
                email: "test@test.com",
                password: "123456"
            }
            chai.request(server)
                .post('/auth/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    done();
                });
        });
    });
});
