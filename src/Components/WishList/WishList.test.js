import React from 'react';
import ReactDOM from 'react-dom';
import WishList from './WishList';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WishList />, div);
  ReactDOM.unmountComponentAtNode(div);
});