import { getData } from 'api/testApi'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataTest, getDataStoree } from 'redux/reducer/testReducerApi'
import { requestAxios } from 'redux/store/requestApi'
import { getLoadingStore } from 'redux/store/sliceLoading'

const TestStore = () => {
  // const a = useSelector(getDataStoree)
  // console.log(a)
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchDataTest({}))
  // }, [])
  const a = useSelector(getLoadingStore)
  console.log(a)
  const fetch = async () => {
    const a = await getData()
    console.log(a.data)
  }
  useEffect(() => {
    requestAxios(fetch())
  }, [])
  return (
    <>
      <h1>test</h1>
      <button onClick={fetch}>aaaaaa</button>
    </>
  )
}

export default memo(TestStore)
