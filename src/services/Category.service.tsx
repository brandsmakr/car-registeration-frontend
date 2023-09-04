import { ApiConfig } from "../config";

const getCategories = (current_page: number | string, limit: number) => {
  return ApiConfig.get(`/category/get/${current_page}/${limit}`).then(
    (res: any) => {
      return res.data;
    }
  );
};

const updateCategory = (id: string, data: any) => {
  return ApiConfig.put(`/category/update/${id}`, data).then((res: any) => {
    return res.data;
  });
};

const saveCategory = (data: any) => {
  return ApiConfig.post(`/category/save`, data).then((res: any) => {
    return res.data;
  });
};

const getAllCategories = () => {
  return ApiConfig.get(`/category/get-all`).then((res: any) => {
    return res.data;
  });
};

const deleteCategory = (id: string) => {
  return ApiConfig.delete(`/category/delete/${id}`).then((res: any) => {
    return res.data;
  });
};

const Category = {
  getCategories,
  updateCategory,
  deleteCategory,
  getAllCategories,
  saveCategory,
};

export default Category;
