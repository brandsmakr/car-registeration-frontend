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
} from "@mui/material";
import Utils from "../../utils";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const Backup = () => {
  const currentRef = useRef();
  const [active, setActive] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : "");
  };

  function createData(
    id: number,
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { id, name, calories, fat, carbs, protein };
  }

  const rows = [
    createData(1, "Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData(3, "Eclair", 262, 16.0, 24, 6.0),
    createData(4, "Cupcake", 305, 3.7, 67, 4.3),
    createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
  ];

  function handleClick(event: any) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }


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


  return (
    <>
      <div className="py-14 px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="container m-auto">
          {/* list items */}
          <div className="flex justify-between items-center py-6">
            <div className="flex flex-col justify-center items-start gap-2">
              <h3 className="text-2xl leading-6 font-bold text-gray-900">
                List
              </h3>
              <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                  <MuiLink underline="hover" color="inherit" href="/">
                    MUI
                  </MuiLink>
                  <MuiLink
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    Core
                  </MuiLink>
                  <MuiLink
                    underline="hover"
                    color="text.primary"
                    href="/material-ui/react-breadcrumbs/"
                    aria-current="page"
                  >
                    Breadcrumbs
                  </MuiLink>
                </Breadcrumbs>
              </div>
            </div>
            <ThemeProvider theme={Utils.Theme.ButtonTheme}>
              <Button variant="contained">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="CurrentColor"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                New User
              </Button>
            </ThemeProvider>
          </div>
          {/* desktop responsive table */}
          <div className="">
            <Box component={Paper}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead
                    sx={{
                      backgroundColor: "#e3e3e3",
                    }}
                  >
                    <TableRow>
                      <TableCell align="left" sx={{ display: "none" }}>
                        id
                      </TableCell>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left" sx={{ display: "none" }}>
                          {row.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
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
                              <Button color="inherit" fullWidth>
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
                              </Button>
                              <Button color="inherit" fullWidth>
                                <div className="flex justify-start items-center mr-auto pl-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                  >
                                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                  </svg>
                                  <span className="pl-4 capitalize ">Edit</span>
                                </div>
                              </Button>
                              <Button color="inherit" fullWidth>
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
                              </Button>
                            </div>
                          </Popover>
                          {/* <div
                            className={`rounded shadow-lg absolute top-[25px] right-[40px] bg-white p-1.5 z-50 ${
                              active === row.id ? "flex" : "hidden"
                            } flex-col gap-1 justify-center items-center `}
                            id={`actionMenu-${index}`}
                          >
                            <Button color="inherit" fullWidth>
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
                            </Button>
                            <Button color="inherit" fullWidth>
                              <div className="flex justify-start items-center mr-auto pl-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                </svg>
                                <span className="pl-4 capitalize ">Edit</span>
                              </div>
                            </Button>
                            <Button color="inherit" fullWidth>
                              <div className="flex justify-start items-center mr-auto pl-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                  className="w-3 h-3 "
                                  fill="currentColor"
                                >
                                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                </svg>
                                <span className="pl-4 capitalize ">Delete</span>
                              </div>
                            </Button>
                          </div> */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </div>
          {/* list items */}
          <div className="flex justify-between items-center py-6">
            <div className="flex flex-col justify-center items-start gap-2">
              <h3 className="text-2xl leading-6 font-bold text-gray-900">
                List
              </h3>
              <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                  <MuiLink underline="hover" color="inherit" href="/">
                    MUI
                  </MuiLink>
                  <MuiLink
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    Core
                  </MuiLink>
                  <MuiLink
                    underline="hover"
                    color="text.primary"
                    href="/material-ui/react-breadcrumbs/"
                    aria-current="page"
                  >
                    Breadcrumbs
                  </MuiLink>
                </Breadcrumbs>
              </div>
            </div>
            <ThemeProvider theme={Utils.Theme.ButtonTheme}>
              <Button variant="contained">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="CurrentColor"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                New User
              </Button>
            </ThemeProvider>
          </div>
          {/* mobile responsive data table */}
          <div className="py-3">
            <div className="flex flex-wrap h-full">
              <div className=" p-1 sm:p-2 w-full sm:w-1/2">
                <Accordion
                // expanded={expanded === "panel1"}
                // onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      General settings
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      I am an accordion
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <div>
                      <Table>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 1
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 1</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 2
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 2</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 3
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 3</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 4
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 4</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 5
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 5</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            borderBottom: "none",
                            // columnSpan: 2,
                          }}
                        >
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Action
                            </TableCell>
                          </TableHead>
                          <TableCell
                            // sx={{ width: "100%", columnSpan: 2 }}
                            sx={{
                              borderBottom: "none",
                            }}
                          >
                            <ButtonGroup
                              variant="contained"
                              aria-label="action button"
                              color="inherit"
                              sx={{ margin: "auto" }}
                            >
                              <Button color="inherit" fullWidth>
                                <div className="flex justify-start items-center mr-auto pl-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3 "
                                    fill="currentColor"
                                    viewBox="0 0 576 512"
                                  >
                                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                  </svg>
                                  {/* <span className="pl-4 capitalize ">View</span> */}
                                </div>
                              </Button>
                              <Button color="inherit" fullWidth>
                                <div className="flex justify-start items-center mr-auto pl-1">
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
                              <Button color="inherit" fullWidth>
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
                          </TableCell>
                        </TableRow>
                      </Table>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className=" p-1 sm:p-2 w-full sm:w-1/2">
                <Accordion
                // expanded={expanded === "panel2"}
                // onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Users
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      You are currently not an owner
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Table>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 1
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 1</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 2
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 2</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 3
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 3</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 4
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 4</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 5
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 5</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            borderBottom: "none",
                            // columnSpan: 2,
                          }}
                        >
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Action
                            </TableCell>
                          </TableHead>
                          <TableCell
                            // sx={{ width: "100%", columnSpan: 2 }}
                            sx={{
                              borderBottom: "none",
                            }}
                          >
                            <ButtonGroup
                              variant="contained"
                              aria-label="action button"
                              color="inherit"
                              sx={{ margin: "auto" }}
                            >
                              <Button color="inherit" fullWidth>
                                <div className="flex justify-start items-center mr-auto pl-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3 "
                                    fill="currentColor"
                                    viewBox="0 0 576 512"
                                  >
                                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                  </svg>
                                  {/* <span className="pl-4 capitalize ">View</span> */}
                                </div>
                              </Button>
                              <Button color="inherit" fullWidth>
                                <div className="flex justify-start items-center mr-auto pl-1">
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
                              <Button color="inherit" fullWidth>
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
                          </TableCell>
                        </TableRow>
                      </Table>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className=" p-1 sm:p-2 w-full sm:w-1/2">
                <Accordion
                // expanded={expanded === "panel3"}
                // onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Advanced settings
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      Filtering has been entirely disabled for whole web server
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Table>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 1
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 1</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 2
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 2</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 3
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 3</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 4
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 4</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 5
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 5</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            borderBottom: "none",
                            // columnSpan: 2,
                          }}
                        >
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Action
                            </TableCell>
                          </TableHead>
                          <TableCell
                            // sx={{ width: "100%", columnSpan: 2 }}
                            sx={{
                              borderBottom: "none",
                            }}
                          >
                            <ButtonGroup
                              variant="contained"
                              aria-label="action button"
                              color="inherit"
                              sx={{ margin: "auto" }}
                            >
                              <Button color="inherit" fullWidth>
                                <div className="flex justify-start items-center mr-auto pl-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3 "
                                    fill="currentColor"
                                    viewBox="0 0 576 512"
                                  >
                                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                  </svg>
                                  {/* <span className="pl-4 capitalize ">View</span> */}
                                </div>
                              </Button>
                              <Button color="inherit" fullWidth>
                                <div className="flex justify-start items-center mr-auto pl-1">
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
                              <Button color="inherit" fullWidth>
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
                          </TableCell>
                        </TableRow>
                      </Table>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className=" p-1 sm:p-2 w-full sm:w-1/2">
                <Accordion
                // expanded={expanded === "panel4"}
                // onChange={handleChange("panel4")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Personal data
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Table>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 1
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 1</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 2
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 2</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 3
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 3</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 4
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 4</TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: "1px solid #e5e7eb" }}>
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Header 5
                            </TableCell>
                          </TableHead>
                          <TableCell>Cell 5</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            borderBottom: "none",
                            // columnSpan: 2,
                          }}
                        >
                          <TableHead>
                            <TableCell
                              sx={{
                                border: "none",
                              }}
                            >
                              Action
                            </TableCell>
                          </TableHead>
                          <TableCell
                            // sx={{ width: "100%", columnSpan: 2 }}
                            sx={{
                              borderBottom: "none",
                            }}
                          >
                            <ButtonGroup
                              variant="contained"
                              aria-label="action button"
                              color="inherit"
                              sx={{ margin: "auto" }}
                            >
                              <Button color="inherit" fullWidth>
                                <div className="flex justify-start items-center mr-auto pl-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3 "
                                    fill="currentColor"
                                    viewBox="0 0 576 512"
                                  >
                                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                  </svg>
                                  {/* <span className="pl-4 capitalize ">View</span> */}
                                </div>
                              </Button>
                              <Button color="inherit" fullWidth>
                                <div className="flex justify-start items-center mr-auto pl-1">
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
                              <Button color="inherit" fullWidth>
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
                          </TableCell>
                        </TableRow>
                      </Table>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Backup;
