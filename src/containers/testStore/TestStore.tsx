import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoadingStore } from '../../redux/store/sliceLoading'
import { requestAxios } from '../../redux/store/requestApi'
import { get } from '../../service/service'
import { getDataStore, testAccess } from './slice'
import * as qs from 'qs'
import { assign } from 'lodash'

const TestStore = () => {
  // const dispatch = useDispatch()

  // const b = useSelector(getLoadingStore)
  // const c = useSelector(getDataStore)
  // console.log('loading:', b)

  // const fetData = async () => {
  //   const a = await requestAxios(get('/todos'))
  //   dispatch(testAccess(a))
  // }

  // useEffect(() => {
  //   fetData()
  // }, [])
  const target = { a: 1, b: 2 }
  const source = { b: 4, c: 5, d: '6' }
  console.log(assign(target, source))

  return (
    <>
      <h1>test</h1>
      {/* <button onClick={}>Click</button> */}
    </>
  )
}

export default memo(TestStore)
