import React, { createContext, useContext, useEffect, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = () => {
    try {
        const localData = localStorage.getItem("cartData");
        const parsed = JSON.parse(localData);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        // If parsing fails or data is invalid, return an empty array
        return [];
    }
};


const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, quantity: action.quantity, img: action.img, mrp: action.mrp, size: action.size }]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "UPDATE":
            return state.map((item) => {
                const isSameSize = Math.abs(parseFloat(item.size) - parseFloat(action.size)) < 0.001;
                if (action.id === item.id && isSameSize) {
                    return {
                        ...item,
                        quantity: parseFloat(item.quantity) + parseFloat(action.quantity),
                    };
                }
                return item;
            });

        case "DROP":
            let empArray = []
            return empArray;
        default:
            console.log("Error in Reducer");
    }

}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [], initialState);

    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(state));
    }, [state]);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}


export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);