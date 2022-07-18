import { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoadingStore } from '../../redux/store/sliceLoading'
import { requestAxios } from '../../redux/store/requestApi'
import { get } from '../../service/service'
import { getDataStore, testAccess } from './slice'

const TestStore = () => {
  const dispatch = useDispatch()

  const b = useSelector(getLoadingStore)
  const c = useSelector(getDataStore)
  console.log('loading:', b)

  const fetData = async () => {
    const a = await requestAxios(get('/todos'))
    dispatch(testAccess(a))
  }

  useEffect(() => {
    console.log('sdfsdfgds')

    fetData()
  }, [])

  return (
    <>
      <h1>test</h1>
      <button onClick={fetData}>Click</button>
    </>
  )
}

export default memo(TestStore)
