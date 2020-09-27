import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Cart } from '.';
import { CartItems } from './constants';
import { act } from 'react-dom/test-utils';

describe('<Cart />', () => {
    it('should render as expected', async () => {
        const { container, findByText, findByAltText } = render(<Cart />);
        const quantities = await screen.queryAllByTestId('quantity');
        
        expect(await findByText('My Cart (2)')).toBeInTheDocument();
        expect(await findByAltText(CartItems[0].name)).toBeInTheDocument();
        expect(await findByText(CartItems[0].price.toString())).toBeInTheDocument();
        expect(quantities[0]).toHaveValue(CartItems[0].quantity.toString());
        expect(container).toMatchSnapshot();
    });

    it('item should be removed on clicking on REMOVE button', async () => {
        render(<Cart />);

        const removeButtons = await screen.queryAllByTestId('removeBtn');
        const quantities = await screen.queryAllByTestId('quantity');
        const itemFirst = await screen.findByAltText(CartItems[0].name)

        act(
            () => {
                fireEvent.click(removeButtons[0]);
            }
        );
       
        expect(itemFirst).not.toBeInTheDocument();
        expect(quantities[0]).not.toBeInTheDocument(); 
    });

    it('item Quantity should Increase on clicking on + button', async () => {
        render(<Cart />);

        const incrementButtons = await screen.findAllByTestId('incrementBtn');
        const quantities = await screen.queryAllByTestId('quantity');
        
        act(
            () => {
                fireEvent.click(incrementButtons[0]);
            }
        );

        expect(quantities[0]).toHaveValue('3');
    });

    it('item Quantity should Decrease on clicking on - button', async () => {
        render(<Cart />);

        const incrementButtons = await screen.findAllByTestId('decrementBtn');
        const quantities = await screen.queryAllByTestId('quantity');
        
        act(
            () => {
                fireEvent.click(incrementButtons[0]);
            }
        );

        expect(quantities[0]).toHaveValue('2');
    });
})