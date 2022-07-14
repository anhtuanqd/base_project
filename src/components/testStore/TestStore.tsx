import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStore, testAccess } from './slice';
import { Field, reduxForm } from 'redux-form';

const TestStore = () => {
  const dispatch = useDispatch();
  const data = useSelector(getDataStore);

  const handleClick = () => {
    dispatch(testAccess('kuudoodoo'));
    console.log(data);
  };

  return (
    <>
      <h1>Cuối con đường không phải hạnh phúc, thay vào đó là đáy vực sâu</h1>
      <button onClick={handleClick}>Click zo</button>
    </>
  );
};

export default TestStore;
