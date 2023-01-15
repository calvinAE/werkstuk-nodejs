const express = require('express');
const router = express.Router()
const review = require('../model/review')
const game = require('../model/game')

module.exports = router;

//    GET   //

//GET all reviews
router.route("/reviews").get(async function (req, res) {
    try {
        const limit = req.query.limit

        if(limit != null){
            const data = await review.find().limit(limit);
            res.json(data)
        } else {
        const data = await review.find();
        res.json(data)
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
});

//GET by ID review
router.get('/review/:id([0-9a-f]{24})', async (req, res) => {
    try {
        const data = await review.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})


//GET reviews by author
router.get('/reviews/:author', async (req, res) => {
    try {
        let author = req.params.author;
        review.findOne({author: author},function (error, foundReview) {
            if(foundReview == null){
                res.send('No reviews found from that author')
            } else {
                res.json(foundReview);}
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})
//GET reviews by game
router.get('/reviews/:game', async (req, res) => {
    try {
        let game1 = req.params.game;
        review.findOne({game: game1},function (error, foundReview) {
            if(foundReview == null){
                res.send('No reviews found for that game')
            }
            res.json(foundReview);});
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//    POST   //

//POST new review
router.post('/reviews', async (req, res) => {
    const newReview = new review({
        author: req.body.author,
        game: req.body.game,
        rating: req.body.rating,
        content: req.body.content
    });

    try {
        await newReview.save();
        res.send('Review has been added')
    }
    catch (error) {
        res.status(400).json({  error: error.message })
    }
})



//    PATCH   //

//UPDATE review by ID
router.patch('/review/:id([0-9a-f]{24})', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const options = { new: true };

        await review.findByIdAndUpdate(
            id, body, options
        )

        res.send(`Review has been updated`)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//    DELETE   //

//Delete REVIEW by ID
router.delete('/reviews/:id([0-9a-f]{24})', async (req, res) => {
    try {
        const id = req.params.id;
        await review.findByIdAndDelete(id)
        res.send('Review has been deleted')

    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})