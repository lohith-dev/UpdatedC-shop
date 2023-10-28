const { request } = require('chai');
const itemModel = require('../model/item.js');
const Sequelize = require('../util/database.js')

const getappntdata = async (req,res)=>{
     try{
            const itemData = await itemModel.findAll();
        
            let noOfRecords = itemData.length;
            res.status(200).json(
                {
                    noOfRecords: noOfRecords,
                    data: itemData,
                }
            );
            
     }catch(err){
        console.log(err);
     }
}


const getSingleAppntData = async (req,res)=>{
     try{
            
            let id=req.params.id;
            
       
            const userData = await expenseModel.findOne({
                where: { id: id },
            });
           
            if(!userData) return res.status(404).send("The appointement data with provided ID does not exist!");
            res.status(200).json(userData);
            
     }catch(err){
        console.log(err);
     }
}

const addNewCandy = async (req,res)=>{
    try{
   
        let {candyName,description,price,quantity}=req.body;
      
        console.log("bodyyyyyyyyyyyy",req.body);
        let appntResponse = await itemModel.create({
            candyName,description,price,quantity
        })
           
           res.status(201).json({
            error: false,
            message: 'Appiontments created Successfully',
            data: appntResponse
        })
           
    }catch(err){
        console.log("lllllllllllllllllllll");
       console.log(err);
    }
}

const updAppntdata = async (req,res)=>{
    const { id, qty } = req.body;
    try {
        const item = await itemModel.findByPk(id);
    
        if (item) {
          // Update the quantity field of the item
          item.quantity -= qty;
          await item.save();
    
          res.status(200).json({ message: 'Quantity updated successfully' });
        } else {
          res.status(404).json({ error: 'Item not found' });
        }
      } catch (error) {
        console.error('Error updating quantity: ' + error);
        res.status(500).json({ error: 'Failed to update quantity' });
      }
}

const deleteAppntdata = async (req,res)=>{
    try{
        let id=req.params.id;
        console.log(id);
       let deleted= expenseModel.destroy({
            where: {
              id: id
            }
          })
       if(deleted){
            res.status(200).json({
                  error: false,
                  message: 'Appointment Deleted Successfully',
            })
       }
           
    }catch(err){
       console.log(err);
    }
}

module.exports={
    getappntdata,
    addNewCandy,
    updAppntdata,
    deleteAppntdata,
    getSingleAppntData,
}