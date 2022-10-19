const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

//user:dbuser1
//pass:ohO160tFcuYcLdXx

const uri = "mongodb+srv://dbuser1:ohO160tFcuYcLdXx@cluster0.pyvcmep.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//insertOne method
async function run() {
    try {
        // await client.connect();
        const userCollection = client.db("foodExpress").collection("user");

        //show data from mongodb to serverside api
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        //post user api to receive data from the client side
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('new user come from client side', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        });
    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server side is running here')
})

app.listen(port, () => {
    console.log('CRUD server is running.')
})