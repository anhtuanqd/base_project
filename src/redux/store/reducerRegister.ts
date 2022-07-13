class ReducerRegistry {
  reducers: any;
  emitChange: any;
  constructor() {
    this.reducers = {};
    this.emitChange = null;
  }

  register(name: any, reducer: any) {
    this.reducers = {
      ...this.reducers,
      [name]: reducer,
    };
    if (this.emitChange) {
      this.emitChange(this.reducers);
    }
  }
  setChangeListener(listener: any) {
    this.emitChange = listener;
  }
}

export default new ReducerRegistry();
