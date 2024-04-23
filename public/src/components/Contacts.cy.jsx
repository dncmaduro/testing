import React from 'react';
import { mount } from '@cypress/react';
import Contacts from './Contacts';

import fakeContacts from '../utils/FakeUser.json'
import fakeLocal from '../utils/FakeLocal.json'
describe('<Contacts />', () => {

  beforeEach(() => {
    // Thiết lập giá trị giả mạo trong localStorage
    window.localStorage.setItem(
      process.env.REACT_APP_LOCALHOST_KEY,
      JSON.stringify(fakeLocal)
    );
  });

  it('renders', () => {

    // Sử dụng dữ liệu giả mạo
    console.log(fakeContacts)
    mount(<Contacts contacts={fakeContacts} changeChat={() => {}} />);
  });
});
