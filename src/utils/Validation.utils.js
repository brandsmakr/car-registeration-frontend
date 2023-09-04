const isEmpty = (value, id) => {
  if (!value) {
    document.getElementById(id).style.borderColor = "red";
    return "Field is required";
  }
  document.getElementById(id).style.borderColor = "#ced4da";
  return "";
};

const maxLengthCheck = (e) => {
  if (e.target.value.length > e.target.max) {
    return `length not be greater than ${e.target.max} digits`;
  }
  return "";
};

const maxCharChecker = (inputValue, maxValue) => {
  if (inputValue >= maxValue) {
    return "";
  }
  return `Please enter at least ${maxValue} characters`;
};

const minCharChecker = (inputValue, minValue) => {
  if (inputValue >= minValue) {
    return "";
  }
  return `Please enter at least ${minValue} characters`;
};

const email = (email, id) => {
  // let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  // let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // let regex = /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/;

  if (!email) {
    document.getElementById(id).style.borderColor = "red";
    return "";
  }
  // else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
  //   document.getElementById(id).style.borderColor = "red";
  //   return "Incorrect email format";
  // }
  else if (!regex.test(email)) {
    document.getElementById(id).style.borderColor = "red";
    return "Incorrect email format";
  } else {
    document.getElementById(id).style.borderColor = "#ced4da";
    return "";
  }
};

const password = (password, id) => {
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/;
  if (!password) {
    document.getElementById(id).style.borderColor = "red";
    return "Password is required";
  } else if (!passwordPattern.test(password)) {
    document.getElementById(id).style.borderColor = "red";
    // return "Password must contains at least 1 numeric, uppercase, lowercase, special character and 8-12 character long!";
    return "Password must be 8-12 characters and consist of 1 digit(0-9), upper & lower case(Aa-Zz), a symbol!";
  }
  //  else if (password.length < 8) {
  //   document.getElementById(id).style.borderColor = "red";
  //   return "Password must have a minimum 8 characters";
  // } else if (password.length > 12) {
  //   document.getElementById(id).style.borderColor = "red";
  //   return "Password must have a minimum 8 characters";
  // }
  else {
    document.getElementById(id).style.borderColor = "#ced4da";
    return "";
  }
};

const checkFirstDigit = (value, id) => {
  let regExp = /^[1-9]/;

  const check = regExp.test(value);

  if (check) {
    document.getElementById(id).style.borderColor = "red";
    return "First character is not acceptable as a number";
  } else {
    document.getElementById(id).style.borderColor = "#ced4da";
    return "";
  }
};

const textContainsSymbols = (value, id) => {
  // let regExp = /^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/g;
  // let regExp = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  // let regExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let regExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/~`?]+/;

  const check = regExp.test(value);

  if (!check) {
    document.getElementById(id).style.borderColor = "#ced4da";
    return "";
  } else {
    document.getElementById(id).style.borderColor = "red";
    return "symbols and special characters are not allowed";
  }
};

const checkBothPasswords = (confirm_password, id, password_value) => {
  if (confirm_password != password_value) {
    document.getElementById(id).style.borderColor = "red";
    return "Both Passwords must be same";
  } else {
    document.getElementById(id).style.borderColor = "#ced4da";
    return "";
  }
};

const checkOldAndNewPasswords = (new_password, id, password_value) => {
  if (new_password == password_value) {
    document.getElementById(id).style.borderColor = "red";
    return "Both Passwords not be same!";
  } else {
    document.getElementById(id).style.borderColor = "#ced4da";
    return "";
  }
};

const url = (url, id) => {
  // const regExp =
  //   /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
  // const regExp =
  // /^https?:\/\/([\w\d\-]+\.)+\w{2,}(\/.+)?$/;

  // const regExp = /^(https?):\/\/+(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/
  // const regExp =
  // /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  const regExp =
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

  if (!url) {
    document.getElementById(id).style.borderColor = "red";
    return "";
  } else if (!new RegExp(regExp).test(url)) {
    document.getElementById(id).style.borderColor = "red";
    return "Please enter right url format like https://example.com";
  }
  document.getElementById(id).style.borderColor = "#ced4da";
  return "";
};

const handleOnBlur = (e, setErrors, password_value) => {
  let message = "";

  if (e.target.id === "name") {
    message = isEmpty(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, name: message };
    });
    if (message === "") {
      // message = checkFirstDigit(e.target.value, e.target.id);
      // setErrors((old) => {
      //   return { ...old, name: message };
      // });
      // if (message === "") {
      message = textContainsSymbols(e.target.value, e.target.id);
      setErrors((old) => {
        return { ...old, name: message };
      });
      // }
    }
  } else if (e.target.id === "wallet_alias") {
    message = isEmpty(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, wallet_alias: message };
    });
    if (message === "") {
      // message = checkFirstDigit(e.target.value, e.target.id);
      // setErrors((old) => {
      //   return { ...old, name: message };
      // });
      // if (message === "") {
      message = textContainsSymbols(e.target.value, e.target.id);
      setErrors((old) => {
        return { ...old, wallet_alias: message };
      });
      // }
    }
  } else if (e.target.id === "email") {
    message = email(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, email: message };
    });
  } else if (e.target.id === "admin_email") {
    message = isEmpty(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, admin_email: message };
    });
    if (message === "") {
      message = email(e.target.value, e.target.id);
      setErrors((old) => {
        return { ...old, admin_email: message };
      });
    }
  } else if (e.target.id === "password") {
    message = isEmpty(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, password: message };
    });
    if (message === "") {
      message = password(e.target.value, e.target.id);
      setErrors((old) => {
        return { ...old, password: message };
      });
    }
  } else if (e.target.id === "new_password") {
    message = password(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, new_password: message };
    });
    if (message === "") {
      message = checkOldAndNewPasswords(
        e.target.value,
        e.target.id,
        password_value
      );
      setErrors((old) => {
        return { ...old, new_password: message };
      });
    }
  } else if (e.target.id === "url") {
    message = url(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, url: message };
    });
  } else if (e.target.id === "url2") {
    message = isEmpty(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, url2: message };
    });
    if (message === "") {
      message = url(e.target.value, e.target.id);
      setErrors((old) => {
        return { ...old, url2: message };
      });
    }
  } else if (e.target.id === "title") {
    message = isEmpty(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, title: message };
    });
    if (message === "") {
      message = textContainsSymbols(e.target.value[0], e.target.id);
      setErrors((old) => {
        return { ...old, title: "First character must be Alphabet!" };
      });
      if (message === "") {
        message = minCharChecker(e.target.value, e.target.min);
        setErrors((old) => {
          return { ...old, title: message };
        });
        if (message === "") {
          message = maxCharChecker(e.target.value, e.target.max);
          setErrors((old) => {
            return { ...old, title: message };
          });
        }
      }
    }
  } else if (e.target.id === "name_on_card") {
    message = isEmpty(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, name_on_card: message };
    });
    if (message === "") {
      message = checkFirstDigit(e.target.value, e.target.id);
      setErrors((old) => {
        return { ...old, name_on_card: message };
      });
    }
  } else if (e.target.id === "c_password") {
    message = password(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, c_password: message };
    });
    if (message === "") {
      message = checkBothPasswords(e.target.value, e.target.id, password_value);
      setErrors((old) => {
        return { ...old, c_password: message };
      });
    }
  } else if (e.target.id === "card_number") {
    message = isEmpty(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, card_number: message };
    });
    if (message === "") {
      if (e.target.value > 16 || e.target.value < 16) {
        message = "card number must be 16 digits long";
      } else {
        message = "";
      }

      setErrors((old) => {
        return { ...old, card_number: message };
      });
    }
  } else if (e.target.id === "expiry") {
    message = isEmpty(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, expiry: message };
    });
  } else if (e.target.id === "cvv") {
    message = isEmpty(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, expiry: message };
    });
    if (message === "") {
      message = maxCharChecker(e.target.value, 3);
      setErrors((old) => {
        return { ...old, cvv: message };
      });
    }
  } else if (e.target.id === "verificationCode") {
    message = isEmpty(e.target.value, e.target.id);
    setErrors((old) => {
      return { ...old, verificationCode: message };
    });
    if (message === "") {
      message = minCharChecker(e.target.value, 6);
      setErrors((old) => {
        return {
          ...old,
          verificationCode: "Verification must contains 6 digits long!",
        };
      });
      if (message === "") {
        message = maxCharChecker(e.target.value, 6);
        setErrors((old) => {
          return {
            ...old,
            verificationCode: "Verification must contains 6 digits long!",
          };
        });
      }
    }
  } 
};

const FormValidator = {
  isEmpty,
  maxLengthCheck,
  email,
  password,
  handleOnBlur,
  maxCharChecker,
};

export default FormValidator;
