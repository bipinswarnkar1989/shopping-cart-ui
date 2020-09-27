import React from 'react';
import { render } from '@testing-library/react';

import { Cart } from '.';

describe('<Cart />', () => {
    it('should render as expected', async () => {
        const { container } = render(<Cart />);
        expect(container).toMatchSnapshot();
    })
})