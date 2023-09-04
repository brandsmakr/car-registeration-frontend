const validationErrors = (errors) => {
  let errorString = '<div class="px-3">';
  if (typeof errors === "object") {
    Object.values(errors).map((value, index) => {
      errorString += index + 1 + ". <span>" + value.msg + "</span><br>";
    });
  } else {
    errorString += `1. <span>${errors.msg}</span>`;
  }
  errorString += "</div>";
  return errorString;
};

const ErrorFormat = {
  validationErrors,
};

export default ErrorFormat;
