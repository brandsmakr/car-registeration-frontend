import { ApiConfig } from "../config";

const GetStatistics = () => {
  return ApiConfig.get("/dashboard/get-statistics").then((res: any) => {
    return res.data;
  });
};

const Dashboard = {
  GetStatistics,
};

export default Dashboard;
