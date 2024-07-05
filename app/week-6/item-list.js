"use client"

import { useState } from "react";
import Item from './item';


export default function ItemList({items = []}){

    //states sorting criteria, using "name" as default value
    const [sortBy, setSortBy] = useState("name");

    //function for handling the change to sort
    const handleChangeSort = (criteria) => setSortBy(criteria);

    //sorts item array
    const sortedItems = [...items].sort((a, b) => {
        if( isNaN(parseInt(a[sortBy])) ){
            let itemA = a[sortBy].toUpperCase();
            let itemB = b[sortBy].toUpperCase();
            if ( itemA < itemB ) {
                return -1;
            }
            if ( itemA > itemB ) {
                return 1;
            }
            return 0;
        } else {
            return a[sortBy] - b[sortBy];
        }
    });


    return(
        <div>
            <div className="flex-1  ">
                <button onClick={ () => handleChangeSort("name")} className={`${sortBy === "name" ? "bg-blue-600" : "bg-blue-400"} text-white m-5 p-4`}>Sort By Name</button>
                <button onClick={ () => handleChangeSort("category")} className={`${sortBy === "category" ? "bg-blue-600" : "bg-blue-400"} text-white m-5 p-4`}>Sort By Category</button>
            </div>
            <section className="grid grid-cols-3 gap-5">
                
                {sortedItems.map((item) => (<Item key={item.id} item={item} />))}
            </section>
        </div>
    );
}
