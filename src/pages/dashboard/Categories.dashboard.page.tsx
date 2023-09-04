import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
  Button,
  Link as MuiLink,
  Breadcrumbs,
  Box,
  IconButton,
  Popover,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ButtonGroup,
  Pagination,
  Modal,
  TextField,
  Alert,
} from "@mui/material";
import Utils from "../../utils";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Services from "../../services";
import {
  PreLoaderComponent,
  PreLoaderComponent2,
  WarningAlert,
} from "../../components";
import Swal from "sweetalert2";

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [limit, setlimit] = useState<number>(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [formType, setFormType] = useState<string>("create");
  const [categoryId, setCategoryId] = useState<string>("");
  const [openModal, setOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const getCategories = () => {
    setLoading(true);
    Services.Category.getCategories(page, limit)
      .then((res) => {
        setLoading(false);
        if (res.success) {
          setCategories(res.data);
          setTotal(Math.ceil(res.pagenation.total / limit));
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => getCategories(), [page]);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleDelete = (item: any) => {
    setLoader(true);
    Services.Category.deleteCategory(item._id)
      .then((res) => {
        setLoader(false);
        if (res.success) {
          Swal.fire("Success", "Category deleted", "success");
          getCategories();
        } else {
          setErrorMessage(res.message);
          Swal.fire("Error", "Error occur", "error");
        }
      })
      .catch((error) => {
        setLoader(false);
        Swal.fire("Error", "Error occur", "error");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        }
      });
  };

  const handleSaveCategory = () => {
    setLoader(true);
    const data = { name: name };
    Services.Category.saveCategory(data)
      .then((res) => {
        setLoader(false);
        resetForm();
        if (res.success) {
          Swal.fire("Success", "Category save", "success");
          getCategories();
        } else {
          setErrorMessage(res.message);
          Swal.fire("Error", "Error occur", "error");
        }
      })
      .catch((error) => {
        resetForm();
        setLoader(false);
        Swal.fire("Error", "Error occur", "error");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        }
      });
  };

  const resetForm = () => {
    setName("");
    setCategoryId("");
    setFormType("")
  };

  const handleUpdateCategory = () => {
    setLoader(true);
    const data = { name: name };
    Services.Category.updateCategory(categoryId, data)
      .then((res) => {
        setLoader(false);
        resetForm();
        if (res.success) {
          Swal.fire("Success", "Category updated", "success");
          getCategories();
        } else {
          Swal.fire("Error", "Error occur", "error");
          setErrorMessage(res.message);
        }
      })
      .catch((error) => {
        setLoader(false);
        resetForm();
        Swal.fire("Error", "Error occur", "error");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        }
      });
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let noOfErrors = 0;
    let firstKey = "";

    Object.values(errors).map((objValue) => {
      if (objValue !== "" && objValue !== null) {
        ++noOfErrors;
      }
    });

    for (let i = 0; i <= Object.keys(errors).length - 1; i++) {
      if (
        Object.values(errors)[i] !== "" &&
        Object.values(errors)[i] !== null
      ) {
        firstKey = Object.keys(errors)[i];
        break;
      }
    }

    if (noOfErrors > 0) {
      let getFirstErrorElement: HTMLElement | null =
        document.getElementById(firstKey);
      if (getFirstErrorElement) {
        return getFirstErrorElement.focus();
      }
    } else {
      formType === "create" ? handleSaveCategory() : handleUpdateCategory();
      handleModalClose();
    }
  };

  const handleEdit = (item: any) => {
    setFormType("Edit");
    setCategoryId(item._id);
    setName(item.name);
    handleModalOpen();
  };

  return (
    <>
      {loader && <PreLoaderComponent2 />}
      <div className="py-14 px-4 sm:px-6 md:px-10 lg:px-12">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <div className="container m-auto">
          {/* Category items */}
          <div className="flex justify-between items-center py-6">
            <div className="flex flex-col justify-center items-start gap-2">
              <h3 className="text-2xl leading-6 font-bold text-gray-900">
                Categories
              </h3>
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <MuiLink underline="hover" color="inherit" href="/">
                    Dashboard
                  </MuiLink>
                  {/* <MuiLink
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    Core
                  </MuiLink> */}
                  <MuiLink
                    underline="hover"
                    color="text.primary"
                    href="/categories"
                    aria-current="page"
                  >
                    Categories
                  </MuiLink>
                </Breadcrumbs>
              </div>
            </div>
            <ThemeProvider theme={Utils.Theme.ButtonTheme}>
              <Button
                variant="contained"
                onClick={() => {
                  handleModalOpen();
                  setFormType("create");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="CurrentColor"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                Category
              </Button>
            </ThemeProvider>
          </div>
          {/* preloader */}
          <div>{loading && <PreLoaderComponent />}</div>
          {/* desktop table */}
          <div className=" flex-col hidden md:flex">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light shadow-xl drop-shadow-xl rounded-xl border">
                    <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Categories Name
                        </th>
                        <th scope="col" className=" py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading &&
                        categories.length > 0 &&
                        categories.map((item: any, index: number) => (
                          <tr
                            className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                            key={index}
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1 + limit * (page - 1)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <IconButton
                                onClick={handleOpen}
                                aria-describedby={`actionMenu-${index}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 128 512"
                                  className="o w-4 h-4"
                                >
                                  <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                                </svg>
                              </IconButton>
                              <Popover
                                id={`actionMenu-${index}`}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                                sx={{
                                  border: "none",
                                  boxShadow: "none",
                                }}
                              >
                                <div
                                  className={`rounded shadow-lg  top-[25px] right-[40px] bg-white p-1.5 z-50 flex flex-col gap-1 justify-center items-center `}
                                  id={`actionMenu-${index}`}
                                >
                                  {/* <Button color="inherit" fullWidth>
                                <div className="flex justify-start items-center mr-auto pl-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3 "
                                    fill="currentColor"
                                    viewBox="0 0 576 512"
                                  >
                                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                  </svg>
                                  <span className="pl-4 capitalize ">View</span>
                                </div>
                              </Button> */}
                                  <Button
                                    color="inherit"
                                    fullWidth
                                    onClick={() => handleEdit(item)}
                                  >
                                    <div className="flex justify-start items-center mr-auto pl-1">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3 h-3"
                                        fill="currentColor"
                                        viewBox="0 0 512 512"
                                      >
                                        <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                      </svg>
                                      <span className="pl-4 capitalize ">
                                        Edit
                                      </span>
                                    </div>
                                  </Button>
                                  <Button color="inherit" fullWidth>
                                    <div
                                      className="flex justify-start items-center mr-auto pl-1"
                                      onClick={() => handleDelete(item)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        className="w-3 h-3 "
                                        fill="currentColor"
                                      >
                                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                      </svg>
                                      <span className="pl-4 capitalize ">
                                        Delete
                                      </span>
                                    </div>
                                  </Button>
                                </div>
                              </Popover>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* mobile responsive table */}
          <div className="py-3 md:hidden">
            <div className="flex flex-wrap h-full">
              {!loading &&
                categories.length > 0 &&
                categories.map((item: any, index: number) => (
                  <div className=" p-1 sm:p-2 w-full sm:w-1/2" key={index}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreRoundedIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography
                          sx={{
                            width: "33%",
                            flexShrink: 0,
                            textTransform: "capitalize",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                          <Table>
                            <TableRow
                              sx={{ borderBottom: "1px solid #e5e7eb" }}
                            >
                              <TableHead>
                                <TableCell
                                  sx={{
                                    border: "none",
                                  }}
                                >
                                  Category Name
                                </TableCell>
                              </TableHead>
                              <TableCell sx={{ textTransform: "capitalize" }}>
                                {item.name}
                              </TableCell>
                            </TableRow>
                          </Table>
                          <div className="py-4 flex justify-center items-center">
                            <ButtonGroup
                              variant="contained"
                              aria-label="action button"
                              color="inherit"
                              sx={{ margin: "auto" }}
                            >
                              {/* <Button color="inherit" fullWidth>
                                <div className="flex justify-start items-center mr-auto pl-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3 "
                                    fill="currentColor"
                                    viewBox="0 0 576 512"
                                  >
                                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                  </svg> */}
                              {/* <span className="pl-4 capitalize ">View</span> */}
                              {/* </div>
                              </Button> */}
                              <Button color="inherit" fullWidth>
                                <div
                                  className="flex justify-start items-center mr-auto pl-1"
                                  onClick={() => {
                                    handleEdit(item);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                  >
                                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                  </svg>
                                  {/* <span className="pl-4 capitalize ">Edit</span> */}
                                </div>
                              </Button>
                              <Button
                                color="inherit"
                                fullWidth
                                onClick={() => handleDelete(item)}
                              >
                                <div className="flex justify-start items-center mr-auto pl-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="w-3 h-3 "
                                    fill="currentColor"
                                  >
                                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                  </svg>
                                  {/* <span className="pl-4 capitalize ">
                                            Delete
                                          </span> */}
                                </div>
                              </Button>
                            </ButtonGroup>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
            </div>
          </div>
          {/* pagenation */}
          <div className="flex justify-end items-center">
            {!loading && total > 0 && (
              <Pagination
                count={total}
                hidePrevButton
                hideNextButton
                page={page}
                onChange={(e: any, pageNum: number) => {
                  setPage(pageNum);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textTransform: "capitalize",
              marginX: "auto",
              color: "var(--main-color)",
              textAlign: "center",
              fontWeight: "bolder",
            }}
          >
            {formType} Category
          </Typography>
          <form noValidate onSubmit={(e) => handleSubmit(e)}>
            <div className="py-3 w-full">
              <TextField
                hiddenLabel
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Category Name"
                name="name"
                autoComplete="off"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                value={name}
                onBlur={() =>
                  Utils.Validator.HandleForm(name, "name", setErrors)
                }
                error={errors.name ? true : false}
                inputProps={{
                  maxLength: 255,
                }}
              />
              <WarningAlert message={errors.name} />
            </div>
            <ThemeProvider theme={Utils.Theme.ButtonTheme}>
              <Button variant="contained" type="submit" fullWidth>
                Submit
              </Button>
            </ThemeProvider>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Categories;
