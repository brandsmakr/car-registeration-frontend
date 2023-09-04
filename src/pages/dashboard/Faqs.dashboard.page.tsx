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
  TablePagination,
  Pagination,
  PaginationItem,
} from "@mui/material";
import Utils from "../../utils";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Services from "../../services";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { PreLoaderComponent } from "../../components";

const Faqs = () => {
  const currentRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState("");
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [type, setType] = useState<string>("Buyer Questions");
  const [loadingdata, setLoadingdata] = useState<boolean>(false);
  const [lists, setLists] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [faqs, setFaqs] = useState<any[]>([]);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      let clickonActionButton = false;
      rows.map((row, index) => {
        const actionButton = document.getElementById(`actionMenu-${index}`);
        if (e.target.contains(actionButton)) {
          clickonActionButton = true;
        }
      });
    });
  }, []);

  const handleFaqs = () => {
    setLoadingdata(true);
    // Services.Faqs.getFaqsForAdmin(offset, limit, type)
    //   .then((res) => {
    //     setLoadingdata(false);
    //     if (res.status) {
    //       res.data && setFaqs(res.data);
    //       let faqsArray: any[] = [];
    //       res.data["Buyer Questions"] &&
    //         res.data["Buyer Questions"].length > 0 &&
    //         res.data["Buyer Questions"].map((fItem: any) => {
    //           faqsArray.push(fItem);
    //         });
    //       res.data["Seller Questions"] &&
    //         res.data["Seller Questions"].length > 0 &&
    //         res.data["Seller Questions"].map((fItem: any) => {
    //           faqsArray.push(fItem);
    //         });
    //       res.data["Shipping Questions"] &&
    //         res.data["Shipping Questions"].length > 0 &&
    //         res.data["Shipping Questions"].map((fItem: any) => {
    //           faqsArray.push(fItem);
    //         });
    //       res.data["Sign in Questions"] &&
    //         res.data["Sign in Questions"].length > 0 &&
    //         res.data["Sign in Questions"].map((fItem: any) => {
    //           faqsArray.push(fItem);
    //         });
    //       setFaqs(faqsArray);
    //       res.total && setTotal(Math.ceil(res.total / limit));
    //     }
    //   })
    //   .catch((error) => {
    //     setLoadingdata(false);
    //   });
  };

  useEffect(() => {
    handleFaqs();
  }, [offset, limit, type]);

  return (
    <>
      <div className="py-14 px-4 sm:px-6 md:px-10 lg:px-12 ">
        <div className=" m-auto">
          {/* list items */}
          <div className="flex justify-between items-center py-6">
            <div className="flex flex-col justify-center items-start gap-2">
              <h3 className="text-2xl leading-6 font-bold text-gray-900">
                FAQs
              </h3>
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                  <Link to={location.pathname} className="hover:underline">
                    Faqs
                  </Link>
                </Breadcrumbs>
              </div>
            </div>
            <ThemeProvider theme={Utils.Theme.ButtonTheme}>
              <Button
                variant="contained"
                onClick={() =>
                  navigate("/create-faq", { state: { formType: "Create" } })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="CurrentColor"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                Create FAQ
              </Button>
            </ThemeProvider>
          </div>
          {/* loading data */}
          {loadingdata && <PreLoaderComponent />}
          {/* desktop responsive table */}
          <div className="">
            {!loadingdata && (
              <div className="hidden md:block">
                <Box component={Paper} sx={{ width: "78vw" }}>
                  <TableContainer className="muiTableContainer">
                    <Table aria-label="simple table">
                      <TableHead
                        sx={{
                          backgroundColor: "#e3e3e3",
                        }}
                      >
                        <TableRow>
                          <TableCell>FAQ Type</TableCell>
                          <TableCell align="center">Question</TableCell>
                          <TableCell align="center">Answer</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ overflowX: "clip", width: "100%" }}>
                        {faqs.length > 0 &&
                          faqs.map((item, index) => (
                            <TableRow
                              key={item.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {item.type}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.question}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.answer}
                              </TableCell>
                              <TableCell align="right" className="relative">
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
                                    <Button
                                      color="inherit"
                                      fullWidth
                                      onClick={() =>
                                        navigate("/faq-detail", {
                                          state: { faq: item },
                                        })
                                      }
                                    >
                                      <div className="flex justify-start items-center mr-auto pl-1">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-3 h-3 "
                                          fill="currentColor"
                                          viewBox="0 0 576 512"
                                        >
                                          <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                        </svg>
                                        <span className="pl-4 capitalize ">
                                          View
                                        </span>
                                      </div>
                                    </Button>
                                    <Button
                                      color="inherit"
                                      fullWidth
                                      onClick={() =>
                                        navigate("/edit-faq", {
                                          state: {
                                            formType: "Update",
                                            data: item,
                                          },
                                        })
                                      }
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
                                    {/* <Button color="inherit" fullWidth>
                                      <div className="flex justify-start items-center mr-auto pl-1">
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
                                    </Button> */}
                                  </div>
                                </Popover>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </div>
            )}
          </div>
          {/* mobile responsive data table */}
          <div className="py-3">
            <div className="flex flex-wrap h-full md:hidden">
              {!loadingdata &&
                faqs.length > 0 &&
                faqs.map((item, index) => (
                  <div className=" p-1 sm:p-2 w-full" key={index} id={item.id}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreRoundedIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography
                          sx={{ width: "100%", flexShrink: 0 }}
                          className="capitalize"
                        >
                          {item.question}
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
                                  FAQ Type
                                </TableCell>
                              </TableHead>
                              <TableCell> {item.type}</TableCell>
                            </TableRow>
                            <TableRow
                              sx={{ borderBottom: "1px solid #e5e7eb" }}
                            >
                              <TableHead>
                                <TableCell
                                  sx={{
                                    border: "none",
                                  }}
                                >
                                  Question
                                </TableCell>
                              </TableHead>
                              <TableCell> {item.question}</TableCell>
                            </TableRow>
                            <TableRow
                              sx={{ borderBottom: "1px solid #e5e7eb" }}
                            >
                              <TableHead>
                                <TableCell
                                  sx={{
                                    border: "none",
                                  }}
                                >
                                  Answer
                                </TableCell>
                              </TableHead>
                              <TableCell> {item.answer}</TableCell>
                            </TableRow>
                          </Table>
                          <div className="py-4 w-full flex">
                            <ThemeProvider
                              theme={Utils.Theme.MenuActiveButtonTheme}
                            >
                              <ButtonGroup
                                variant="contained"
                                aria-label="action button"
                                // color="inherit"
                                sx={{ margin: "auto" }}
                              >
                                <Button
                                  fullWidth
                                  onClick={() =>
                                    navigate("/faq-detail", {
                                      state: { faq: item },
                                    })
                                  }
                                >
                                  <div className="flex justify-start items-center mr-auto px-6 ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-3 h-3 "
                                      fill="currentColor"
                                      viewBox="0 0 576 512"
                                    >
                                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                    </svg>
                                    <span className="pl-2 capitalize ">
                                      View
                                    </span>
                                  </div>
                                </Button>
                                <Button
                                  fullWidth
                                  onClick={() =>
                                    navigate("/edit-faq", {
                                      state: {
                                        formType: "Update",
                                        data: item,
                                      },
                                    })
                                  }
                                >
                                  <div className="flex justify-center items-center mr-auto  px-6 ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-3 h-3"
                                      fill="currentColor"
                                      viewBox="0 0 512 512"
                                    >
                                      <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                    </svg>
                                    <span className="pl-2 capitalize ">
                                      Edit
                                    </span>
                                  </div>
                                </Button>
                                {/* <Button fullWidth>
                                  <div className="flex justify-start items-center mr-auto px-6 ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 448 512"
                                      className="w-3 h-3 "
                                      fill="currentColor"
                                    >
                                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                    </svg>
                                    <span className="pl-2 capitalize ">
                                      Delete
                                    </span>
                                  </div>
                                </Button> */}
                              </ButtonGroup>
                            </ThemeProvider>
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
            {!loadingdata && total > 0 && (
              <Pagination
                count={total}
                hidePrevButton
                hideNextButton
                page={page}
                onChange={(e: any, pageNum) => {
                  setPage(pageNum);
                  setOffset((pageNum - 1) * limit);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
