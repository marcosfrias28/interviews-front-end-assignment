import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders content', () => {
    const component = render(<Home />)
    console.log(component);
})
