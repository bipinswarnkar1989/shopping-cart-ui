import React, { useState, Fragment, useCallback, useMemo } from 'react';
import './style.css';

import { CartItems } from './constants';
import { CartItemType } from './types';

export const Cart: React.FC = () => {
    const [items, setItems] = useState<CartItemType[]>(CartItems);
    const handleRemove = useCallback(
        (id: string) => {
          setItems(items => items.filter(x => x.id !== id));
        },
        []
    )
    const total = useMemo(
        () => {
            let initialValue = 0, t = 0;
            t = items.reduce( 
            (accumulator, currentValue) => accumulator + currentValue.price * (currentValue.quantity || 1)
            , initialValue
            );
            return t;
        },
        [items]
    )
    const handleQuantiyChange = useCallback(
       (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { value } = event.target;
        let updated = items.map(x => {
            if(x.id === id){
                x.quantity = Number(value);
            }
            
            return x;
        })
        setItems(updated);
       }, 
    [items]
    );
    const handleIncrement = useCallback(
        (id: string) => {
            let updated = items.map(x => {
                if(x.id === id){
                    x.quantity++;
                }
                return x;
            })
            setItems(updated);
        },
        [items]
    );
    const handleDecrement = useCallback(
        (id: string) => {
            let updated = items.map(x => {
                if(x.id === id){
                    x.quantity--;
                }
                return x;
            })
            setItems(updated);
        },
        [items]
    )
    const handleQuantiyBlur = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, id) => {
            const { value } = event.target;
            if(value === '' || !value){
                let updated = items.map(x => {
                    if(x.id === id){
                        x.quantity = 1;
                    }
                    
                    return x;
                })
                setItems(updated);
            }
        },
        [items]
    );
    return (
        <div className="cart">
         <div className="cart__header">
         <div className="cart___header__title">
           My Cart ({items.length})
         </div>
         </div>

         {items && items.map(item => 
             <Fragment key={item.id}>
             <div className="cart__item">
                <div className="cart__item__left">
                <div className="cart__item__left__img">
                 <img src={item.image} alt={item.name} />
                </div>

                <div className="carcart__item__left__quantity">
                <div className="carcart__item__left__quantity_decrement">
                <button
                 disabled={item.quantity === 1}
                 onClick={() => handleDecrement(item.id)}
                 className="circle_button">
                  – 
                </button>
                </div>
                <div className="carcart__item__left__quantity_input">
                <input
                 type="text"
                 value={item.quantity || ''}
                 onChange={e => handleQuantiyChange(e, item.id)}
                 onBlur={e => handleQuantiyBlur(e, item.id)}
                  />
                </div>
                <div className="carcart__item__left__quantity_increment">
                <button
                 onClick={() => handleIncrement(item.id)}
                 className="circle_button">
                  + 
                </button>
                </div>
                </div>

                </div>

                <div className="cart__item__right">
                <div className="cart__item__right_name">
                  {item.name}
                </div>
                <div className="cart__item__right_price">
                  <span>₹</span>{item.price}
                </div>
                <div className="cart__item__right__remove">
                  <button onClick={() => handleRemove(item.id)} className="cart__item__right__remove_btn">Remove</button>
                </div>
                </div>
              </div>
             </Fragment>
            )}
            <div className="cart__total">
            <div>Total Amount:</div>
            <div className="cart__total_amount"><span>₹</span>{total}</div>
            </div>
        </div>
    )
}
