"use client"

import { useState } from "react";

export default function NewItem () {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("Produce");

    const handleSubmit = (event) => {
        console.dir(event);
        event.preventDefault();

        let item = {
            Name: name,
            Quantity: quantity,
            Category: category,
        }

        alert(`Name: ${item.Name} 
        \nQuantity: ${item.Quantity} 
        \nCategory: ${item.Category}`);

        setName("");
        setQuantity(1);
        setCategory("Produce");
    
}

const handleName = (event) => setName(event.target.value);
const handleQuantity = (event) => setQuantity(event.target.value);
const handleCategory = (event) => setCategory(event.target.value);


return(
    <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col min-h-screen bg-slate-800">
        <div className="mb-4 w-96">
            <input required type="text" placeholder="Product Name" onChange={handleName} value={name} className = "w-96 rounded-md h-10"/>
        </div>
        <div className="flex mb-4 space-x-7">
        <div className="block mb-1">
            <label className="text-white">Quantity: </label>
            <input required type="number" min="1" max="99" onChange={handleQuantity} value={quantity} className="h-8 rounded-md" />
        </div>
        <div className="block mb-1">
            <label className="text-white">Category: </label>
            <select onChange={handleCategory} className="h-8 rounded-md">
                <option value="produce">Produce</option>
                <option value="dairy">Dairy</option>
                <option value="bakery">Bakery</option>
                <option value="meat">Meat</option>
                <option value="frozenfoods">Frozen Foods</option>
                <option value="cannedgoods">Canned Goods</option>
                <option value="drygoods">Dry Goods</option>
                <option value="beverages">Beverages</option>
                <option value="snacks">Snacks</option>
                <option value="household">Household</option>
                <option value="other">Other</option>
            </select>
        </div>
        </div>
        <div className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <button>Submit</button>
        </div>
    </form>
)

}

