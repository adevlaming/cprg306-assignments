import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, doc, deleteDoc } from "firebase/firestore";


export async function getItems(userId){
    try {
        const collectionReference = collection(db, "users", userId, "items");
        const itemsQuery = query(collectionReference);
        const querySnapshot = await getDocs(itemsQuery);
        let itemsList = [];
        querySnapshot.forEach( (doc) => {
            let item = {
                id: doc.id,
                ...doc.data()
            }
            itemsList.push(item);
        } );
        return itemsList
       
    } catch (error) {
        console.log(error);

        throw new Error("Error retrieving items");
    }
}

export async function addItem(userId, item) {
    try {
        const itemsCollectionReference = collection(db, "users", userId, "items");
        const newItemReference = await addDoc(itemsCollectionReference, item);
        return newItemReference.id;
    } catch (error) {
        console.log(error);

        throw new Error("Error adding item");
    }
}

export async function deleteItem(userId, itemId) {
    try {
        const itemDocReference = doc(db, "users", userId, "items", itemId);
        await deleteDoc(itemDocReference);
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting item");
    }
}




/*
Add the getItems function
This async function retrieves all items for a specific user from Firestore. 
It takes a userId as a parameter, and uses it to query a subcollection named 
items under a document in the users collection with the same userId. 
It fetches the documents in the items subcollection, and for each document, 
it adds an object to the items array containing the document ID and data. 
It then returns this items array.

Add the addItem function
This function adds a new item to a specific user's list of items in Firestore. 
It takes a userId and an item as parameters. It uses the userId to reference the 
items subcollection of a document in the users collection, and then adds the item 
to this subcollection. It returns the id of the newly created document.
*/