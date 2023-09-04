import React, { useState, useEffect } from "react";
import Services from "../../services";
import CountUp from "react-countup";
import { Icons } from "../../assets";

const Main = () => {
  const [carCategories, setCarCategories] = useState<number>(0);
  const [registerCars, setRegisterCars] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDashboardInfo = () => {
    setIsLoading(true);
    Services.Dashboard.GetStatistics()
      .then((res) => {
        setIsLoading(false);
        if (res.success) {
          setRegisterCars(res.data.no_of_registered_cars);
          setCarCategories(res.data.no_vehicle_categories);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => getDashboardInfo(), []);

  return (
    <>
      <div className="py-14 px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="container m-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-1/2">
              <div className="shadow border-t-[var(--main-color)] border-t-4 flex px-6 py-8 justify-start items-center gap-4">
                <div>
                  <img
                    src={Icons.CategoryIcon}
                    className="w-20 sm:w-24 md:w-32"
                  />
                </div>
                <div>
                  <CountUp
                    end={carCategories}
                    duration={2.75}
                    className="font-bold text-2xl sm:text-4xl md:text-6xl"
                  />
                  <h3 className="font-bold text-lg sm:text-xl">
                    No Of Categories
                  </h3>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="shadow border-t-[var(--main-color)] border-t-4 flex px-6 py-8 justify-start items-center gap-4">
                <div>
                  <img src={Icons.CarIcon} className="w-20 sm:w-24 md:w-32" />
                </div>
                <div>
                  <CountUp
                    end={registerCars}
                    duration={2.75}
                    className="font-bold  text-2xl sm:text-4xl md:text-6xl"
                  />
                  <h3 className="font-bold text-lg sm:text-xl">No Of Cars</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
