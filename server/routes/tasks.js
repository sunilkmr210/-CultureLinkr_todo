const router = require('express').Router();
const task = require('../models/tasks');
const {verifyAndAuth} = require('./token');
const {body, validationResult} = require('express-validator');


router.get('/fetchTasks', verifyAndAuth, async (req, res)=>{
    try{
        const tasks = await task.find({user: req.user._id});
        // console.log(tasks);
        res.status(200).json(tasks);
    }
    catch(err){
        res.status(400).json(err);
    }
})


router.post('/addTask/:id', verifyAndAuth, [
    body('title', 'Enter a valid title').isLength({min: 3}),
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json(errors);
    }
    const newtask = new task({
        title: req.body.title,
        description: req.body.task,
        status: "incomplete",
        user: req.user._id
    })

    try{
        const savedTask = await newtask.save();
        res.status(201).json(savedTask);
    }
    catch(err){
        res.status(400).json(err);
    }

});


router.put('/updateTask/:id', verifyAndAuth, async (req, res)=>{
    const {title, description, status} = req.body;
    const newTask = {};
    if(title){newTask.title = title};
    if(description){newTask.description = description};
    if(status){newTask.status = status};

    try{
        const updatedTask = await task.findByIdAndUpdate(req.params.id, {
            $set: newTask
        }, {new: true});
        if(!updatedTask){
            res.status(400).json("Not found");
        }
        res.status(201).json(updatedTask);
    }
    catch(err){
        res.status(400).json(err);
    }
    
})

//Deleting a note

router.delete('/deleteTask/:id', verifyAndAuth, async (req, res)=>{
    try{
        const afterDel = await task.findByIdAndDelete(req.params.id) 
        res.status(200).json(afterDel);
    }
    catch(err){
        res.status(403).json(err);
    }
})

module.exports = router;