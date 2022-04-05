const express = require('express');
const router =  express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require("express-validator");

// ROUTE 1 Get all the Notes: GET "/api/auth/getuser"  Login required
router.get('/fetchallnotes',fetchuser, async (req, res)=>{
    try {
          const notes = await Note.find({user:req.user.id});
          res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured1");
      }
  
})

// ROUTE 2 Add a new Note using: POST "/api/auth/addnote"  Login required
router.post('/addnote',fetchuser,[
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast of 5 Character").isLength({min:5})
], async (req, res)=>{
    try {
            const {title, description, tag} = req.body;

            // If there are errors, return bad request and the error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote= await note.save()
            res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured2");
      }
})
// ROUTE 3 Update an existising note : PUT "/api/auth/updatenote/:id"  Login required
router.post('/updatenote/:id',fetchuser,[
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast of 5 Character").isLength({min:5})
    ], async (req, res)=>{
        const {title, description, tag} = req.body;

        try {
            // Create newNote object
            const newNote = {};
            if(title){newNote.title = title};
            if(description){newNote.description = description};
            if(tag){newNote.tag = tag};

            // Find the note to be updated and update it
            let note = await Note.findById(req.params.id);
            if(!note){return res.status(404).send("Not Found!")};
            if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")};

            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
            res.json({note});
        }catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error occured2");
          }

})
// ROUTE 4 Delete an existising note : DELETE "/api/auth/deletenote/:id"  Login required
router.delete('/deletenote/:id',fetchuser, async (req, res)=>{

        try {
       
            // Find the note to be deleted and delete it
            let note = await Note.findById(req.params.id);
            if(!note){return res.status(404).send("Not Found!")};

            // Allow deletion only if user owns this Note
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed")
            };

            note = await Note.findByIdAndDelete(req.params.id)
            res.json({"Success":"Note has been Deleted", note:note});
        } catch (error) {
            
        }

})




module.exports = router