const express = require('express');
const cors = require('cors');
const users = require("./MOCK_DATA.json")
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());

//Middleware || Plugin
app.use(express.urlencoded({ extended: false }))

//Get All Users
app.get('/', (req, res) => {
    return res.json(users);
})

app
    .route("api/users/:id")
    //Find & Get only one user by ID ↓
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)
        return res.json(user)
    })

    .patch((req, res) => {
        //Find and Edit user with id
        return res.json({ status: "Pending" })

    })

    .delete((req, res) => {
        // Find and Delete an user by id
        return res.json({ status: "Pending" })

    });

app.post("/api/users", (req, res) => {
    //TODO: Create New user
    const body = req.body;
    console.log("Body", body)
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "Pending" });
    });
    return res.json({ status: "Pending", data: users })
})



app.listen(port, () => {
    console.log(`Serverssss is running with port ${port}`)
}
)
