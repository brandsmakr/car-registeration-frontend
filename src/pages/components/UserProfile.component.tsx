import React, { useEffect, useState } from "react";
import { Icons } from "../../assets";
import Services from "../../services";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { PreLoaderComponent } from "../../components";

const UserProfile = () => {
  const location = useLocation();
  const [userProfile, setUserProfile] = useState<any>({});
  const [loadingdata, setLoadingdata] = useState<boolean>(true);

  const getProfileInfo = () => {
    setLoadingdata(true);
    // location.state.data.id &&
      // Services.User.getOneUserForAdmin(location.state.data.id)
      //   .then((res) => {
      //     setLoadingdata(false);
      //     // console.log("res", res);
      //     if (res.status) {
      //       res.data && setUserProfile(res.data);
      //     }
      //   })
      //   .catch((error) => {
      //     setLoadingdata(false);
      //     // console.log("erorr", error);
      //   });
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <>
      {loadingdata && <PreLoaderComponent />}
      <div className="flex justify-center items-center">
        {userProfile && Object.keys(userProfile).length > 0 && (
          <div className="py-4 h-96 mx-auto">
            <div className="flex justify-between items-start gap-2 ">
              <div className="flex juftify-start items-start ">
                <div className="w-36 h-36">
                  <img
                    src={
                      userProfile.avatar
                        ? `${process.env.REACT_APP_HOST_API_KEY}/${userProfile.avatar}`
                        : Icons.Profile
                    }
                    alt="profile-icon"
                    className="w-full h-full rounded-full shadow-lg border"
                  />
                </div>
                <div className="py-8 ps-4">
                  <h3 className="font-semibold text-2xl">
                    {userProfile.username}
                  </h3>
                  <h3 className="font-medium text-lg">{userProfile.email}</h3>
                  <p className="text-uppercase">
                    joined{" "}
                    {moment(userProfile.created_at).format("MMMM DD YYYY")}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3">
              <p className="">{userProfile.bio}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
