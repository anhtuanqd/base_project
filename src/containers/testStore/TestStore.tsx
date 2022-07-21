import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getErrorStore, getLoadingStore } from 'redux/reducer/sliceLoading'
import { getDataStoree, getDataTodo } from 'redux/reducer/sliceTestApi'
import { AppDispatch } from 'redux/store/store'

const TestStore = () => {
  // const dispatch = useDispatch<AppDispatch>()
  // const b = useSelector(getDataStoree)
  // console.log(b)
  // const a = useSelector(getLoadingStore)
  // console.log(a)
  // const b = useSelector(getErrorStore)
  // console.log(b)
  // useEffect(() => {
  //   dispatch(getDataTodo())
  // }, [])
  const array = [{ good: 'asdasd' }, null, { great: 'sdas' }, undefined, {}, 0]
  const a = array.filter(Boolean).map((item) => item)

  console.log(a)

  return (
    <>
      <h1>test</h1>
    </>
  )
}

export default TestStore
