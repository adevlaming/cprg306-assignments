"use client"

import { useState } from "react";

export default function NewItem ({closeFormFunc, onAddItem}) {

    let controlStyles = "block mb-3";
    let inputStyles = "block mt-1 p-1 w-full rounded-sm text-black bg-white focus:bg-white";

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("Produce");

    const generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
    //return Date.now().toString(36) + Math.random().toString(36).substring(2);

    const handleSubmit = (event) => {
        //console.dir(event);
        event.preventDefault();

        let item = {
            id: generateId(),
            name: name,
            quantity: quantity,
            category: category,
        }

       onAddItem(item);

        setName("");
        setQuantity(1);
        setCategory("Produce");
    
        closeFormFunc();
}

const handleName = (event) => setName(event.target.value);
const handleQuantity = (event) => setQuantity(event.target.value);
const handleCategory = (event) => setCategory(event.target.value);


return(
    <div onClick={closeFormFunc} className="absolute w-full h-full flex items-center justify-center bg-gray-950/70">
        <section onClick={ (event) => event.stopPropagation() } className="max-w-md p-8 rounded-lg shadow-md bg-gray-400 text-black">
            <form onSubmit={handleSubmit}>
                <div className={controlStyles}>
                    <input required type="text" placeholder="Product Name" onChange={handleName} value={name} className ={inputStyles} />
                </div>
                <div className={controlStyles}>
                    <div>
                        <label className="text-blue">Quantity: </label>
                        <input required type="number" min="1" max="99" onChange={handleQuantity} value={quantity} className="h-8 mx-2 rounded-md" />
                    </div>
                    <div className="my-5">
                        <label>Category: </label>
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
                <div className={controlStyles}>
                    <button className="w-full py-2 px-4 rounded-sm bg-blue-600 hover:bg-blue-400 text-white">Submit</button>
                </div>
            </form>
        </section>
    </div>
);
}

