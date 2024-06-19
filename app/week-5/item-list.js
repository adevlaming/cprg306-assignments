"use client"

import { useState } from "react";
import itemData from './items.json';
import Item from './item';


export default function ItemList(){

    //defensive copy of data
    let itemArray = itemData.map( (item) => ({...item}) );

    //states sorting criteria, using "name" as default value
    let [sortBy, setSortBy] = useState("name");

    //function for handling the change to sort
    //let handleChangeSort = (event) => setSortBy(event.target.value);
    let handleChangeSort = (criteria) => setSortBy(criteria);

    //sorts item array
    itemArray = itemArray.sort( (a,b) => {
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
    })




    return(
        <div>
            <div className="flex-1  ">
                <button onClick={ () => handleChangeSort("name")} className={`${sortBy === "name" ? "bg-blue-600" : "bg-blue-400"} text-white m-5 p-4`}>Sort By Name</button>
                <button onClick={ () => handleChangeSort("category")} className={`${sortBy === "category" ? "bg-blue-600" : "bg-blue-400"} text-white m-5 p-4`}>Sort By Category</button>
            </div>
            <section className="grid grid-cols-3 gap-5">
                {itemArray.map((item) => (<Item key={item.id} item={item} />))}
            </section>
        </div>
    );
}