const request = require('supertest');
const url = "http://localhost:8080"

describe('Test all my routes', () => {    
    test('should insert a doc into collection', async () => {
        
    const payload = {
        "contentTitle": "1984",
        "contentType": "Book",
        "contentCreator": "George Orwell",
        "releaseDate": "1949-06-08",
        "quantity": 50,
        "averageCondition": "Fair",
        "physicalCopy": true
    } 

    const res = await request(url).post("/inventory").send(payload).expect(201)

    id = res.text.split(":")[2].replace('"', "").replace("}", "").replace('"', "")
});

test("Should get all docs from the collection", async () => {
    const res = await request(url).get("/inventory").expect(200)
})

test("Should get a doc from the collection", async () => {
    const res = await request(url).get("/inventory/" + id).expect(200)
})

test("Should update a doc from the collection", async () => {

    const payload = {
        "contentTitle": "1984",
        "contentType": "Book",
        "contentCreator": "George Orwell",
        "releaseDate": "1949-06-08",
        "quantity": 50,
        "averageCondition": "Fair",
        "physicalCopy": true
      } ;
    const res = await request(url).put("/inventory/" + id).send(payload).expect(204)
})


test("Should remove a doc from the collection", async () => {
    const res = await request(url).delete("/inventory/" + id).expect(204)
})


});