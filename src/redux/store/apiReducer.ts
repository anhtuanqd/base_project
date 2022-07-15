fetchData (xhrObject) => {
    try{
      dispatch(setIncreseLoading({}))
      await data = xhrObject();
    
      dispatch(setDecreseLoading({}))
    
    } catch (e) {
        
      dispatch(setErrorState({e}))
    }
   
    return data;
  }


  const testStore = createSlice({
    name: 'testStore',
    initialState: {
      isLoading: false,
      currentData: [],
      cates:[]
    } as StateStore,
    reducers: {
        setDecreseLoading: (state, action) => {
        state.currentData = action.payload
      },
      setErrorState: (state, action) => { 
        
        return [...state, action]
      }
    },
  
  })