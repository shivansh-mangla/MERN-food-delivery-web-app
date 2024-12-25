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

export {addFood}