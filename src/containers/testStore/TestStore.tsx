import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoadingStore } from 'redux/reducer/sliceLoading'
import { AppDispatch } from 'redux/store/store'
import { getDataTodo, getDataStoree } from '../../redux/reducer/sliceTestApi'

const TestStore = (props) => {
  const dispatch = useDispatch<AppDispatch>()

  const data = useSelector(getDataStoree)
  const loading = useSelector(getLoadingStore)

  console.log('data :', data)
  console.log('Loading :', loading)

  useEffect(() => {
    dispatch(getDataTodo())
  }, [])

  return (
    <>
      <h1>Test</h1>
    </>
  )
}

export default TestStore
