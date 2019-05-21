const request = require('supertest')
const app = require('../app') 
const assert = require('assert')

describe('GET foo test', function() {
  it('foo test', function(done) {
    request(app)
      .get('/footest')
      .expect(200)
      .end(function(err, res) {
        if(err) throw err
        assert(res.body, 'API is working')
        done()
      })
  })
})