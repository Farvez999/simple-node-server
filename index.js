const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Simple node server running!')
})


const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'Sabnoor', email: 'sabnoor@gmail.com' },
    { id: 3, name: 'Sabila', email: 'sabila@gmail.com' }
]

// username: dbUser1
// password: P1GCRC6Y3K2W5Mwo


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbUser1:P1GCRC6Y3K2W5Mwo@cluster0.mordayw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db("simpleNode").collection("users");
        const user = { name: 'Nahiya mahi', email: 'nahi@gmailcom' }

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({})
            const users = await cursor.toArray()
            res.send(users)
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0)
//         res.send(filtered)
//     } else {
//         res.send(users)
//     }
// })

// app.post('/users', (req, res) => {
//     console.log('Post Api Call')
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})