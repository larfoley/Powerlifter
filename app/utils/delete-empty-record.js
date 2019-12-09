export default (store, modelName) => {
  this.store.peekAll(modelName).forEach((model) => {
    if (model.get('isNew')) {
      model.rollbackAttributes()
    }
  });
}
