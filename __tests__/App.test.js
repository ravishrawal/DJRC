import React from 'react';
import App from '../app/AppRoot.js';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<AppRoot />).toJSON();
  expect(rendered).toBeTruthy();
});
