

export default function Item({item, onSelect, onDelete}){
    let {id, name, quantity, category} = item;

    return(
        <div className="text-red-200 bg-slate-800 border border-yellow-500 m-10 p-5">
            <ul onClick={() => onSelect(item)}>
                <li className="text-2xl">{id}</li>
                <li className="text-2xl">{name}</li>
                <li className="text-lg">Buy {quantity} in {category}</li>
            </ul>
            <button onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
            }}
            className="bg-red-600 text-white p-2 mt-2 rounded">
                Delete
            </button>
        </div>
    );

}