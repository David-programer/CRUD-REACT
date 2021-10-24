const { Router } = require('express');
const cors = require('cors');
const router = Router();
const task = require('../models/task');

//middlewars
router.use(cors({origin: 'http://192.168.43.252:3000'}));

//rutas
router.route('/')
    .get(async (req, res)=>{
        const tasks = await task.find();
        res.json(tasks).end();
    })
    .post(async (req, res) =>{
        try{
            const { text } = req.body;
            const newTask = new task({text});
            const respuesta = await newTask.save();
            res.json(respuesta).end();
        }catch(err){
            console.log(err)
        }
    })
    .put(async (req, res) =>{
        await task.findByIdAndUpdate(req.body.id, {text: req.body.text})
        res.json({status: 'ok'}).end();
    })
    .delete(async (req, res) =>{
        try{
            await task.findByIdAndRemove(req.body.id);
            res.json({status: 'ok'}).end();
        }catch(error){
            console.error(error);
        }
    })

module.exports = router;