import { ApiConfig } from "../config";

const saveCar = (data: any) => {
  return ApiConfig.post(`/car/save`, data).then((res: any) => {
    return res.data;
  });
};

const getCars = (data:any, current_page: number | string, limit: number) => {
  return ApiConfig.post(`/car/get-info/${current_page}/${limit}`, data).then(
    (res: any) => {
      return res.data;
    }
  );
};

const updateCar = (id: string, data:any) => {
  return ApiConfig.put(`/car/update-info/${id}`, data).then((res: any) => {
    return res.data;
  });
};

const deleteCar = (id: string) => {
  return ApiConfig.delete(`/car/delete/${id}`).then((res: any) => {
    return res.data;
  });
};

const Car = {
  deleteCar,
  saveCar,
  getCars,
  updateCar,
};

export default Car;
