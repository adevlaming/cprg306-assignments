import ItemList from "./item-list";


export default function Page(){
    return(
        <main className="bg-slate-700">
            <h1 className="text-3xl font-bold text-red-200 mx-10 py-5">Shopping List</h1>
            <ItemList/>
        </main>
    )
}