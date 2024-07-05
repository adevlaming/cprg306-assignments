"use client"

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from './items.json';
import { useState } from "react";


export default function Page(){

    const [itemList, setItemList] = useState(
        itemsData.map( (items) => ({...items}) )
    );

    const handleAddItem = (newItem) => {
        setItemList( [...itemList, newItem] );
    }

    const [isNewItemOpen, setNewItemOpen] = useState(false);
    const openNewItem = () => setNewItemOpen(true);
    const closeNewItem = () => setNewItemOpen(false);

    return(
        <main className="bg-slate-700">
            {
                isNewItemOpen && (
                    <NewItem closeFormFunc={closeNewItem} onAddItem={handleAddItem} />
                )
            }
            <h1 className="text-3xl font-bold text-red-200 mx-10 py-5">Shopping List</h1>
            <div className="m-5">
                <button onClick={openNewItem} className="h-14 py-2 px-4 rounded-sm bg-blue-600 hover:bg-blue-400 text-white">Add New Item</button>
            </div>
            <ItemList items={itemList} />
           
        </main>
    )
}

