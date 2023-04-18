export interface UserVehicles {
  _id: string;
  _vin: string;
  _year: number;
  _brandName: string;
  _modelName: string;
  _variant: string;
  _engine: string;
  _mmrValue: string;
  _odometer: number;
  _color: string;
  _createdBy: string;
  _updatedBy: string;
}

export interface Vehicle {
  _id: string;
  _vin: string;
  _year: number;
  _brandName: string;
  _status: string;
  _modelName: string;
  _variant: string;
  _engine: string;
  _mmrValue: string;
  _odometer: number;
  _color: string;
  _createdBy: string;
  _updatedBy: string;
  _createdAt: string;
  _updatedAt: string;
  _purchaseDate: string;
  _purchaseAmount: number;
  _location: string;
}

export interface VehicleData {
  id?: string;
  vin?: string;
  year?: number | null;
  brandName?: string;
  modelName?: string;
  variant?: string;
  engine?: string;
  mmrValue?: string;
  odometer?: number | null;
  color?: string;
  purchaseDate?: string | null;
  purchaseAmount?: number | null;
  location?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
}
