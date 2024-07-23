const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/menu');
router.post('/', async(req,res)=>{

    try {

        const data = req.body;

        const menuItem = new MenuItem(data);

        const response = await menuItem.save();

        console.log('Menu Item created');

        res.status(200).json(response);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }

})

router.get('/', async(req, res)=>{
    try {
        const menuItem = await MenuItem.find();
        console.log("Menu Items Fetched");
        res.status(200).json(menuItem);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = router;