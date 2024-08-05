"use client"

import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service";


export default function Page(){

    const {user} = useUserAuth();
/*
    const [itemList, setItemList] = useState(
        itemsData.map( (items) => ({...items}) )
    );
*/
    const [itemList, setItemList] = useState([]);

    const [selectedItemName, setSelectedItemName] = useState(null);
    const [isNewItemOpen, setNewItemOpen] = useState(false);

    const handleAddItem = async (newItem) => {
        try {
            const itemId = await addItem(user.uid, newItem);
            const itemWithId = { id: itemId, ...newItem };
            setItemList( [...itemList, itemWithId] );
        } catch (error) {
            console.log("error adding item: ", error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await deleteItem(user.uid, itemId);
            setItemList(itemList.filter(item => item.id !== itemId));
        } catch (error) {
            console.log("Error deleting item: ", error);
        }
    };

    const handleItemSelect = (item) => {
        const cleanedName = item.name.split(',')[0].trim().replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g, '');
        setSelectedItemName(cleanedName);
    }

    
    const openNewItem = () => setNewItemOpen(true);
    const closeNewItem = () => setNewItemOpen(false);

    const loadItems = async () => {
        try {
            const items = await getItems(user.uid);
            setItemList(items);
        } catch (error) {
            console.log("Error loading items: ", error);
        }
    };

    useEffect(() => {
        if (user) {
            loadItems();
        }
    }, [user]);

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
                    <ItemList items={itemList} onItemSelect={handleItemSelect} onItemDelete={handleDeleteItem} />
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

