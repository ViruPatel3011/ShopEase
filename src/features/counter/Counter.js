import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  incrementAsync,
} from './counterSlice';

export function Counter() {


  return (
    <div>
      <h1 className=''>Hello</h1>
    </div>
  );
}
