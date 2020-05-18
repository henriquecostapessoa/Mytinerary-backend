const express = require('express');
const activityModel = require('../model/activityModel');
const router = express.Router();
const CommentModel = require('../model/commentModel');
const Itinerary = require('../model/itineraryModel');
const ObjectId = require('objectid');
const User = require('../model/usersModel');
const passport = require("passport");


router.get('/:itineraryId',
	(req, res) => {
  		let activityRequested = req.params.itineraryId;
  		activityModel.find({ itineraryId: activityRequested })
			.then(activity => {
				res.send(activity)
			})
			.catch(err => console.log(err));
});

router.post('/:id/add', (req, res) => {
    
    const newActivity = new activityModel({
        itineraryId: req.params.id,
        title: req.body.title,
        picture: req.body.picture
    })
    
    newActivity.save()
      .then(activity => {
      res.send(activity)
      })
      .catch(err => {
      res.status(500).send("Server error")}) 
});

const getUserById = async (id) => {
    return await User.findOne({_id: id})
}

const modifyComment = async (comment) => {
    const {author, text, itineraryId, date} = comment;
    let user = await getUserById(ObjectId(author))
    .then(user => { 
            return { 
            id: user._id,
            userName: user.username,
            img:user.picture
            
        }
    })

    return {
        user,
        text,
        itineraryId,
        date
    }
}; 

router.get("/:itinerary/comments", passport.authenticate("jwt", { session: false }), (req, res) => {
    const {itinerary} = req.params
    console.log(req.params)
    if (!req.user.id) return res.status(401).send({"msg": "Please, log in to show the comments"})
    if (!itinerary) return res.status(403).send({"msg": "No Itinerary found"})
    
    Comment
    .find({itineraryId: itinerary})
    .then(async comments => {

       let modifiedComments =  [];

       for (el of comments) {
           let comment = await modifyComment(el)
            modifiedComments.push(comment)
    }
    console.log(modifiedComments)
    res.send(modifiedComments)
    })
    
})

router.get('/itinerary/comments/:id',
	(req, res) => {
        let commentsRequested = req.params.id
  		CommentModel.find({ itineraryId: commentsRequested })
			.then(comment => {
				res.send(comment)
			})
            .catch(err => console.log(err));
            
});

router.post("/itinerary/comments/add/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
console.log(req.user)
    const newComment = new Comment({
        author: req.user.id,
        itineraryId: req.params.id,
        text: req.body.text,
        date: req.date,
        username: req.user.username,
        img: req.user.picture

    });
    
    

    newComment.save()
    res.json("This comment has been successfully posted")
});

router.delete('/itinerary/comments/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    
    try { 
        const comment = await CommentModel.findById(req.params.id)
        if(!comment){return res.status(404).json({message: "comment not found"})}
        if(comment.author.toString() !== req.user.id){return res.status(401).send("user not authorized")}
        await comment.remove()
        res.json("This comment has been successfully deleted")
    } catch (err) {
        console.log(err.message)
        res.status(500).send("server.error")
    } 
});

router.patch('/itinerary/comments/update/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    console.log(req.params.id)
    try { 
        const updateComment = await CommentModel.findById(req.params.id)
        updateComment.text = req.body.text
        if(!updateComment){return res.status(404).json({message: "comment not found"})}
        if(updateComment.author.toString() !== req.user.id){return res.status(401).send("user not authorized")}
        
        updateComment.save()
        res.json("This comment has been successfully updated")
    } catch (err) {
        console.log(err.message)
        res.status(500).send("server.error")
    } 
});

module.exports = router
