import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  LinearProgress,
  Box,
  ButtonGroup,
  Backdrop,
  ThemeProvider,
} from "@mui/material";
import {
  Modal,
  ModalClose,
  Typography,
  Sheet,
  Select,
  selectClasses,
  Option,
  Textarea,
} from "@mui/joy";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Utils from "../../utils";
import { Icons } from "../../assets";
import Swal from "sweetalert2";
import Services from "../../services";

type fileInput = null | any;

interface EditProfileProps {
  openProfile: any;
  setOpenProfile: any;
  bio: string | null;
  avatar: string | null;
}

const EditProfile = ({
  openProfile,
  setOpenProfile,
  bio,
  avatar,
}: EditProfileProps) => {
  const fileInput = useRef<fileInput>(null);
  const [newAvatar, setAvatar] = useState(null);
  const [newBio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [errors, setErrors] = useState({});

  const handleUpdateProfile = (e: any) => {
    e.preventDefault();

    setOpenProfile(false);

    const data = {
      bio: newBio,
      avatar: null,
    };

    if (newAvatar) {
      data.avatar = newAvatar;
    }

    // Services.User.EditProfile(data)
    //   .then((res) => {
    //     // console.log(res)
    //     setIsLoading(false);
    //     if (res.status) {
    //       Swal.fire({
    //         icon: "success",
    //         title: res.message,
    //       });
    //       resetForm();
    //     }
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     // console.log(error);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Profile not updated",
    //     });
    //   });
  };

  const setAvatarField = () => {
    if (avatar) {
      setAvatarPreview(`${process.env.REACT_APP_HOST_API_KEY}/${avatar}`);
    } else {
      setAvatarPreview(Icons.Profile);
    }
  };

  const setBioFields = () => {
    if (bio) {
      setBio(bio);
    } else {
      setBio("");
    }
  };

  useEffect(() => {
    setBioFields();
  }, [bio]);

  useEffect(() => {
    setAvatarField();
  }, [avatar]);

  const handleFileInput = async (e: any) => {
    // get size in MBs
    const fileSize = e.target.files[0].size / (1024 * 1024);
    if (fileSize < 3) {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/jpeg"
      ) {
        setErrors((old) => {
          return {
            ...old,
            avatar: "",
          };
        });
        const base64 = window.URL.createObjectURL(e.target.files[0]);
        setAvatar(e.target.files[0]);
        setAvatarPreview(base64);
      } else {
        setAvatarField();
        return setErrors((old) => {
          return {
            ...old,
            avatar: "Upload profile image must be png, jpg, jpeg!",
          };
        });
      }
    } else {
      setAvatarField();
      setErrors((old) => {
        return {
          ...old,
          avatar: "Please upload pic less than 3MB!",
        };
      });
    }
  };

  const resetForm = () => {
    setAvatar(null);
    setBio("");
    setAvatarPreview("");
  };

  return (
    <>
      <div>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={openProfile}
          hideBackdrop={true}
          onClose={() => {
            setOpenProfile(false);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // background: "rgba(0,0,0,0.3)",
            backgroundColor: "var(--joy-palette-background-backdrop)",
            opacity: 1,
            backdropFilter: "blur(8px)",
            transition: "opacity 400ms ease 0s, backdrop-filter 400ms ease 0s",
          }}
        >
          <Sheet
            variant="outlined"
            // back
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              // boxShadow: "lg",
              background: "white",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2) !important",
              borderColor: "#f1f1f1 !important",
              minWidth: "500px",
              minHeight: "200px",
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: "calc(-1/4 * var(--IconButton-size))",
                right: "calc(-1/4 * var(--IconButton-size))",
                boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2) !important",
                borderRadius: "50%",
                bgcolor: "background.body",
                background: "white",
                borderColor: "#f1f1f1 !important",
                opacity: 1,
              }}
            />
            <div className="flex justify-start align-items-center w-100">
              <h4 className="text-2xl capitalize ">
                <b>Update Profile</b>
              </h4>
            </div>
            <hr />
            <form onSubmit={(e) => handleUpdateProfile(e)}>
              <div className="my-4 w-100">
                <div className="py-1 pb-3 flex justify-start items-center">
                  <div className="w-32 h-32 ">
                    <img
                      src={avatarPreview}
                      alt="profile-icon"
                      className="rounded-full w-full h-full border shadow"
                    />
                  </div>
                  <div className="ps-5">
                    <input
                      type="file"
                      ref={fileInput}
                      onChange={(e) => handleFileInput(e)}
                      hidden
                      name="profilePic"
                      id="profilePic"
                      accept="image/png, image/jpg, image/jpeg"
                    />
                    <button
                      type="button"
                      onClick={() => fileInput?.current?.click()}
                      className="py-2 px-3 rounded-xl border shadow-lg"
                    >
                      Choose a profile picture
                    </button>
                  </div>
                </div>
                <div className="py-1">
                  <label>Bio</label>
                  <Textarea
                    name="bio"
                    placeholder="Bio*"
                    variant="outlined"
                    color="neutral"
                    required={true}
                    minRows={3}
                    value={newBio}
                    onChange={(e: any) => {
                      setBio(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="text-center mt-2 w-full flex justify-end items-center">
                <ThemeProvider theme={Utils.Theme.ButtonTheme}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                  >
                    Update Profle
                  </Button>
                </ThemeProvider>
              </div>
            </form>
          </Sheet>
        </Modal>
      </div>
    </>
  );
};

export default EditProfile;
