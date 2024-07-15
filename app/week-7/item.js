

export default function Item({item, onSelect}){
    let {id, name, quantity, category} = item;

    return(
        <div onClick={() => onSelect(item)} className="text-red-200 bg-slate-800 border border-yellow-500 m-10 p-5">
            <ul>
                <li className="text-2xl">{id}</li>
                <li className="text-2xl">{name}</li>
                <li className="text-lg">Buy {quantity} in {category}</li>
            </ul>
        </div>
    )

}