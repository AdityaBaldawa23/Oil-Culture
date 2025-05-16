import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
     switch(action.type){
        case "ADD":
            return[...state,{id:action.id, name:action.name, price:action.price, quantity:action.quantity, img: action.img}]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "UPDATE":
            return state.map((item) =>{
                if(action.id === item.id)
                {
                    return{...item, quantity: parseInt(item.quantity) + parseInt(action.quantity)};
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

export const CartProvider = ({children}) =>{

    const[state, dispatch] = useReducer(reducer, []);
    return(
        <CartDispatchContext.Provider value = {dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
} 


export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);