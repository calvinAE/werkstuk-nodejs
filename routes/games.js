const express = require('express');
const router = express.Router()
const game = require('../model/game')

module.exports = router;

//    GET   //

//GET all games
router.route("/games").get(async function (req, res) {
    try {
        const limit = req.query.limit

        if(limit != null){
            const data = await game.find().limit(limit);
            res.json(data)
        } else {
        const data = await game.find();
        res.json(data)
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
});


//GET game by ID
router.get('/games/:id([0-9a-f]{24})', async (req, res) => {
    try {
        const data = await game.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})


//GET game by name
router.get('/games/:name', async (req, res) => {
    try {
        let name = req.params.name;
        game.findOne({name: name},function (error, foundGame) {
            if(foundGame == null){
                res.send('No games found with that name')
            } else {
                res.json(foundGame);}
        });

    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})


//    POST   //

//POST game
router.post('/games', async (req, res) => {

    try {
        const newGame = new game({
            name: req.body.name,
            description: req.body.description,
            age: req.body.age,
        });

        
        await newGame.save();
        res.send('Game has been added')
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})


//    PATCH   //

//UPDATE game by ID
router.patch('/games/:id([0-9a-f]{24})', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const options = { new: true };

        await game.findByIdAndUpdate(
            id, body, options
        )

        res.send(`Game has been updated`)
    }
    catch (error) {

        res.status(400).json({ error: error.message })
    }
})

//    DELETE   //

//Delete game by ID
router.delete('/games/:id([0-9a-f]{24})', async (req, res) => {
    try {
        const id = req.params.id;
        await game.findByIdAndDelete(id)
        res.send('Game has been deleted')
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})