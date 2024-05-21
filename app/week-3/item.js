

export default function Item({item}){
    let {name, quantity, category} = item;

    return(
        <div className="text-red-200 bg-slate-800 border border-yellow-500 m-10 p-5">
            <ul>
                <li className="text-2xl">{name}</li>
                <li className="text-lg">Buy {quantity} in {category}</li>
            </ul>
        </div>
    )

}