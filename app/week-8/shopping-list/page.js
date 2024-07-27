"use client"

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from './items.json';
import MealIdeas from "./meal-ideas";
import { useState } from "react";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

export default function Page(){

    const {user} = useUserAuth();

    const [itemList, setItemList] = useState(
        itemsData.map( (items) => ({...items}) )
    );

    const [selectedItemName, setSelectedItemName] = useState(null);

    const handleAddItem = (newItem) => {
        setItemList( [...itemList, newItem] );
    }

    const handleItemSelect = (item) => {
        const cleanedName = item.name.split(',')[0].trim().replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g, '');
        setSelectedItemName(cleanedName);
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
            { user ? (
            <div className="flex">
                <div className="flex-1 mr-10">
                    <h1 className="text-3xl font-bold text-red-200 mx-10 py-5">Shopping List</h1>
                    <div className="m-5">
                        <button onClick={openNewItem} className="h-14 py-2 px-4 rounded-sm bg-blue-600 hover:bg-blue-400 text-white">Add New Item</button>
                    </div>
                    <ItemList items={itemList} onItemSelect={handleItemSelect} />
                    <div className="mb-20">
                    <Link href="/week-8/" className="text-xl text-red-200 mx-10 hover:underline">Click here to return to the last page</Link>
                    </div>
                </div>
                <div className="flex-1 ml-10 pt-48">
                    {selectedItemName && <MealIdeas ingredient={selectedItemName} /> }
                </div>
            </div>
            ) : (
                <div className="flex items-center justify-center h-screen w-screen">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-red-200">You must be logged in to view this page</p>
                        <Link href="/week-8/" className="text-red-200 hover:underline">Click here to return to the sign in page</Link>
                    </div>
                </div>
            )}
        </main>
    )
}

