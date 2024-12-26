import React from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets'
import { useState } from 'react'

const Add = () => {

  const [image, setImage] = useState(false);


  return (
    <div className='add'>
      <form className='flex-col'>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image? URL.createObjectURL(image) :assets.upload_area} alt="" />
          </label>
          <input type="file" id='image' hidden required onChange={(e)=> setImage(e.target.files[0])} />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input type="text" placeholder='Type Here' name='name' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="number" name="price" placeholder='$20'/>
          </div>
        </div>
        <button type='submit' className='add-button'>Add Item</button>
      </form>
    </div>
  )
}

export default Add
