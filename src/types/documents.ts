export interface UserVehiclesDocuments {
  modelName: string;
  brandName: string;
  vehicleId: string;
  files: VehicleFiles[];
}

export interface VehicleFiles {
  _id: string;
  _fileName: string;
  _fileUrl: string;
  _type: string;
  _createdBy: string;
  _updatedBy: string;
  _createdAt: string;
  _updatedAt: string;
}

export enum FileTypeEnum {
  TITLE = "title",
  BILL_OF_SALE = "bill of sale",
  REPO_DOCUMENTS = "repo documents",
  LIEN_RELEASE = "lien release",
  COMPS = "comps",
}

export interface FileData {
  id?: string;
  fileName: string;
  fileUrl: string;
  type: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}
