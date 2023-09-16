export interface IFactory<ApplicationModel, DataModel> {
  toEntity(model: DataModel): ApplicationModel
  toDataModel(model: ApplicationModel): DataModel
}
