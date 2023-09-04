const isEmpty = (value: any, fieldName: string) => {
  if (!value) {
    return fieldName + " is required";
  }
  return "";
};

const isSymbolAndSpecialCharExist = (value: string) => {
  let regExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/~`?]+/;
  if (!regExp.test(value)) {
    return "";
  } else {
    return "Symbols and special characters are not allowed";
  }
};

const descriptionSymbol = (value: string) => {
  let regExp = /[!@#$%^&*()_+\=\[\]{};':"\\|<>\/~`?]+/;
  // acceptable symbol
  // .
  // ,
  // -
  if (!regExp.test(value)) {
    return "";
  } else {
    return "Only few symbols are allowed to use (. , -)";
  }
};

const colorSymbol = (value: string) => {
  let regExp = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\~`?]+/;
  // acceptable symbol
  // -
  // /
  if (!regExp.test(value)) {
    return "";
  } else {
    return "Only few symbols are allowed to use (/ -)";
  }
};

const isEmail = (email: string) => {
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email) {
    return "";
  } else if (!regex.test(email)) {
    return "Incorrect email format";
  } else {
    return "";
  }
};

const minCharacterChecker = (
  value: any,
  minValue: number,
  fieldName: string
) => {
  if (value.length < minValue) {
    return `${fieldName} must be equal to or greater than ${minValue} characters`;
  }
  return "";
};

const isLength = (
  value: any,
  length: number,
  fieldName: string
) => {
  if (value.length < length) {
    return `${fieldName} must be equal to  ${length} characters`;
  }
  return "";
};

const checkFirstDigit = (value: any) => {
  let regExp = /^[1-9]/;

  const check = regExp.test(value);

  if (check) {
    return "First character is not acceptable as a number";
  }
  return "";
};

const isPasswordCorrect = (password: string, id: string) => {
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/;
  if (!password) {
    return "Password is required";
  } else if (!passwordPattern.test(password)) {
    // return "Password must contains at least 1 numeric, uppercase, lowercase, special character and 8-12 character long!";
    // return "Password must be 6-8 characters and consist of 1 digit(0-9), upper & lower case(Aa-Zz), a symbol!";
    return "password must be 6-8 character with 1 digit, upper & lower case and 1 symbol";
  } else {
    return null;
  }
};

const vinChecker = (value: string) => {
  let regExp =
    /^(([A-Z]{2,3}[0-9]{2}[A-Z0-9]{1,4}[0-9]{1,4})|([A-Z]{2}[0-9]{3})|([A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{1,4}))$/;

  if (regExp.test(value)) {
    return "Invalid vin number";
  } else {
    return "";
  }
};

const HandleForm = (value: any, fieldName: string, setErrors: any) => {
  let message = "";
  if (fieldName === "username") {
    message = isEmpty(value, fieldName);
    if (message === "") {
      message = isSymbolAndSpecialCharExist(value);
      if (message === "") {
        message = minCharacterChecker(value, 6, fieldName);
      }
    }
    setErrors((old: any) => {
      return { ...old, username: message };
    });
  } else if (fieldName === "name") {
    message = isEmpty(value, fieldName);
    if (message === "") {
      message = isSymbolAndSpecialCharExist(value);
    }
    setErrors((old: any) => {
      return { ...old, [fieldName]: message };
    });
  } else if (fieldName === "vin") {
    message = isEmpty(value, fieldName);
    if (message === "") {
      message = isSymbolAndSpecialCharExist(value);
      if (message === "") {
        message = vinChecker(value);
      }
    }
    setErrors((old: any) => {
      return { ...old, [fieldName]: message };
    });
  } else if (fieldName === "make") {
    message = isEmpty(value, fieldName);
    if (message === "") {
      message = isSymbolAndSpecialCharExist(value);
    }
    setErrors((old: any) => {
      return { ...old, [fieldName]: message };
    });
  } else if (fieldName === "model") {
    message = isEmpty(value, fieldName);
    if (message === "") {
      message = isSymbolAndSpecialCharExist(value);
    }
    setErrors((old: any) => {
      return { ...old, [fieldName]: message };
    });
  } else if (fieldName === "color") {
    message = isEmpty(value, fieldName);
    if (message === "") {
      message = isSymbolAndSpecialCharExist(value);
    }
    setErrors((old: any) => {
      return { ...old, [fieldName]: message };
    });
  } else if (fieldName === "category") {
    message = isEmpty(value, fieldName);
    setErrors((old: any) => {
      return { ...old, [fieldName]: message };
    });
  } else if (fieldName === "email") {
    message = isEmpty(value, fieldName);
    if (message === "") {
      message = isEmail(value);
    }
    setErrors((old: any) => {
      return { ...old, [fieldName]: message };
    });
  } else if (fieldName === "password") {
    message = isEmpty(value, fieldName);
    if (message === "") {
      message = minCharacterChecker(value, 6, setErrors);
    }
    setErrors((old: any) => {
      return { ...old, password: message };
    });
  } else if (fieldName === "name_on_card") {
    message = isEmpty(value, fieldName);
    if (message === "") {
      message = minCharacterChecker(value, 2, "name");
      if (message === "") {
        message = checkFirstDigit(value);
        if (message === "") {
          message = isSymbolAndSpecialCharExist(value);
        }
      }
    }
    setErrors((old: any) => {
      return { ...old, name_on_card: message };
    });
  } else if (fieldName === "zip_or_postal_code") {
    message = isEmpty(value, fieldName);
    if (message === "") {
      message = minCharacterChecker(value, 2, "name");
    }
    setErrors((old: any) => {
      return { ...old, name_on_card: message };
    });
  } else if (fieldName === "verifyEmail") {
    message = isEmpty(value, fieldName);
    if (message === "") {
      message = isLength(value, 6, "Verification Code");
    }
    setErrors((old: any) => {
      return { ...old, [fieldName]: message };
    });
  } else if (fieldName === "type") {
    message = isEmpty(value, fieldName);
    setErrors((old: any) => {
      return { ...old, type: message };
    });
  } else if (fieldName === "question") {
    message = isEmpty(value, fieldName);
    setErrors((old: any) => {
      return { ...old, question: message };
    });
  } else if (fieldName === "answer") {
    message = isEmpty(value, fieldName);
    setErrors((old: any) => {
      return { ...old, answer: message };
    });
  } else if (fieldName === "title") {
    message = isEmpty(value, fieldName);
    if (!message) {
      message = isSymbolAndSpecialCharExist(value);
    }
    setErrors((old: any) => {
      return { ...old, title: message };
    });
  } else if (fieldName === "description") {
    message = isEmpty(value, fieldName);
    if (!message) {
      message = descriptionSymbol(value);
    }
    setErrors((old: any) => {
      return { ...old, description: message };
    });
  } else if (fieldName === "location") {
    message = isEmpty(value, fieldName);
    if (!message) {
      message = descriptionSymbol(value);
    }
    setErrors((old: any) => {
      return { ...old, location: message };
    });
  } else if (fieldName === "bodystyle") {
    message = isEmpty(value, fieldName);
    setErrors((old: any) => {
      return { ...old, bodystyle: message };
    });
  } else if (fieldName === "exteriorcolor") {
    message = isEmpty(value, fieldName);
    if (!message) {
      message = colorSymbol(value);
    }
    setErrors((old: any) => {
      return { ...old, exteriorcolor: message };
    });
  } else if (fieldName === "interiorcolor") {
    message = isEmpty(value, fieldName);
    if (!message) {
      message = colorSymbol(value);
    }
    setErrors((old: any) => {
      return { ...old, interiorcolor: message };
    });
  }
};

const Validator = {
  HandleForm,
};

export default Validator;
