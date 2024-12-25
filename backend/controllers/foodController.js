import foodModel from "../models/foodModel.js";
import fs from 'fs'



//add food item
const addFood = async (req, res) =>{
  let image_filename = `${req.file.filename}`
  const data = req.body;

  const food = new foodModel({
    name: data.name,
    description: data.description,
    price: data.price,
    category: data.category,
    image: image_filename
  })

  try {
    await food.save()
    res.json({success: true, message:"Food Added!!"})
  } catch (error) {
    console.error();
    res.json({success: false, message:"Error!!"})
  }
}


// Getting all food list
const listFood = async (req, res)=>{
  try {
    const foods = await foodModel.find({});
    res.json({success:true, data:foods})
  } catch (error) {
    console.error();
    res.json({success:false, message:"Error!!"})
  }
}


//remove food items
const removeFood = async (req, res)=>{
  try {
    const food = await foodModel.findById(req.body.id)
    fs.unlink(`uploads/${food.image}`, ()=>{})

    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success: true, message:"Food Deleted successfully!!"})
  } catch (error) {
    console.error();
    res.json({success:false, message:"Error!!"})
  }
}

export {addFood, listFood, removeFood}