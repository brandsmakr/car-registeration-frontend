import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Box, Paper, Breadcrumbs, ThemeProvider, Button } from "@mui/material";
import { Input, Textarea, Autocomplete } from "@mui/joy";
import Utils from "../../utils";
import HelpIcon from "@mui/icons-material/Help";
import { WarningAlert } from "../../components";
import Services from "../../services";
import Swal from "sweetalert2";

type faqFormType = {
  type: string;
  question: string;
  answer: string;
};

const FaqForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const forms: string[] = ["Create", "Update"];
  const faqsTypes: string[] = [];
  const [formType, setFormType] = useState<string>(forms[0]);
  const [type, setType] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [errors, setErrors] = useState<any>({
    type: "",
    question: "",
    answer: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (location.state && location.state.formType === "Update") {
      if (!location.state.data && !location.state.data.id) {
        navigate(-1);
      }
    }
  }, [location]);

  function handleClick(event: any) {
    event.preventDefault();
  }

  const handleFaqForm = () => {
    const data: faqFormType = {
      type: type,
      question: question,
      answer: answer,
    };

    let urlService: any;

    // if (formType === forms[0]) {
    //   urlService = Services.Faqs.createFaq(data);
    // } else {
    //   urlService = Services.Faqs.updateFaq(location.state.data.id, data);
    // }

    // setLoading(true);
    // urlService
    //   .then((res: any) => {
    //     // console.log("res", res)
    //     setLoading(false);
    //     if (res.status) {
    //       navigate(-1);
    //     }
    //   })
    //   .catch((error: any) => {
    //     setLoading(false);
    //     // console.log("error", error);
    //     if (
    //       error.response &&
    //       error.response.data &&
    //       error.response.data.message
    //     ) {
    //       Swal.fire({
    //         icon: "error",
    //         title: error.response.data.message,
    //       });
    //     }
    //   });
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
      handleFaqForm();
    }
  };

  useEffect(() => {
    if (location.state) {
      setFormType(location.state.formType);
      if (location.state.data) {
        setType(location.state.data.type);
        setQuestion(location.state.data.question);
        setAnswer(location.state.data.answer);
      }
    }
  }, []);


  return (
    <>
      <div className="py-14 px-4 sm:px-6 md:px-10 lg:px-12 ">
        <div className="flex justify-between items-center py-6">
          <div className="flex flex-col justify-center items-start gap-2">
            <h3 className="text-2xl leading-6 font-bold text-gray-900">
              {formType + " "}FAQs
            </h3>
            <div role="presentation" onClick={handleClick}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <Link
                  to={location.pathname}
                  className="hover:underline"
                  state={location.state}
                >
                  {formType + " "} Faqs
                </Link>
              </Breadcrumbs>
            </div>
          </div>
          <ThemeProvider theme={Utils.Theme.ButtonTheme}>
            <Button variant="contained" onClick={() => navigate(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                viewBox="0 0 448 512"
                fill="CurrentColor"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              Back
            </Button>
          </ThemeProvider>
        </div>
        <div className="m-auto w-2/3">
          <Box component={Paper}>
            <Box
              noValidate
              autoComplete=""
              component="form"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col  gap-4 px-6 py-8 ">
                <div className="flex-col w-full lg:w-full space-y-1">
                  <label className="text-sm  px-1" htmlFor="name">
                    Type<sup className="requireField">*</sup>
                  </label>
                  <Autocomplete
                    startDecorator={<HelpIcon />}
                    id="type"
                    value={type}
                    onChange={(e: any, value: any) => setType(value)}
                    options={[
                      "Buyer Questions",
                      "Seller Question",
                      "Shipping Questions",
                      "Sign in Questions",
                    ]}
                    onBlur={() =>
                      Utils.Validator.HandleForm(type, "type", setErrors)
                    }
                    sx={(theme) => ({
                      color: `#ff9900f3`,
                      borderColor: errors.type ? "#d3232f" : "#CDD7E1",
                    })}
                    autoFocus={true}
                  />
                  <WarningAlert message={errors.type} />
                </div>
                <div className="flex-col w-full lg:w-full space-y-1">
                  <label className="text-sm  px-1" htmlFor="question">
                    Question<sup className="requireField">*</sup>
                  </label>
                  <Input
                    name="question"
                    variant="outlined"
                    color="neutral"
                    required={true}
                    value={question}
                    id="question"
                    onChange={(e: any) => setQuestion(e.target.value)}
                    slotProps={{
                      input: {
                        maxLength: 150,
                      },
                    }}
                    onBlur={() =>
                      Utils.Validator.HandleForm(
                        question,
                        "question",
                        setErrors
                      )
                    }
                    sx={(theme) => ({
                      borderColor: errors.question ? "#d3232f" : "#CDD7E1",
                    })}
                  />
                  <WarningAlert message={errors.question} />
                </div>
                <div className="flex-col w-full lg:w-full space-y-1">
                  <label className="text-sm  px-1" htmlFor="answer">
                    Answer<sup className="requireField">*</sup>
                  </label>
                  <Textarea
                    id="answer"
                    name="answer"
                    variant="outlined"
                    color="neutral"
                    required={true}
                    value={answer}
                    minRows={5}
                    maxRows={9}
                    onChange={(e: any) => setAnswer(e.target.value)}
                    slotProps={{
                      textarea: {
                        maxLength: 300,
                      },
                    }}
                    onBlur={() =>
                      Utils.Validator.HandleForm(answer, "answer", setErrors)
                    }
                    sx={(theme) => ({
                      borderColor: errors.answer ? "#d3232f" : "#CDD7E1",
                    })}
                  />
                  <WarningAlert message={errors.answer} />
                </div>
                <div className="flex justify-end items-center">
                  <ThemeProvider theme={Utils.Theme.ButtonTheme}>
                    <Button variant="contained" type="submit">
                      Submit
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="CurrentColor"
                        viewBox="0 0 448 512"
                        className="w-4 h-4 ml-2"
                      >
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                      </svg>
                    </Button>
                  </ThemeProvider>
                </div>
              </div>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default FaqForm;
