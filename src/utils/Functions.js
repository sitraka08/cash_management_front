import noImage from "../assets/images/noImage.jpeg";
import { IP } from "../services/url";

export const objectNotVoid = (objet) => {
  if (typeof objet === "object") {
    let i = 0;
    for (let indexObj in objet) {
      i++;
      if (objet[indexObj] === "") {
        return false;
      }
    }
    return true;
  }
};
export const reduceObject = (objet, index) => {
  let newObj = {};
  if (typeof objet === "object") {
    for (let indexObj in objet) {
      if (indexObj !== index) {
        newObj = { ...newObj, indexObj: objet[indexObj] };
      }
    }
    return newObj;
  }
};

export function filterNonNullProperties(obj) {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== null) {
      result[key] = obj[key];
    }
  }
  return result;
}

export const allPropertyIsVoid = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Vérifie si la propriété est ni une chaîne vide ni undefined
      if (obj[key] !== "" && obj[key] !== undefined && obj[key] !== null) {
        return false;
      }
    }
  }
  return true;
};

export const isObject = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
export const isError = (value) => {
  return value instanceof Error;
};
export const isArray = (value) => {
  return Array.isArray(value);
};

export const convertJsonToFormData = (data) => {
  // remove null or "null" values
  const formData = new FormData();
  for (const key in data) {
    if (data[key] != "null" || data[key] != null) {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

export const addOptions = ({ originalArray, optionsArray }) => {
  return originalArray.map((field) => {
    const optionField = optionsArray.find((opt) => opt.name === field.name);

    if (optionField && optionField.options) {
      return {
        ...field,
        options: optionField.options,
      };
    }

    return field;
  });
};
export const isStringNotVoid = (value) => {
  return typeof value === "string" && value !== "";
};

export const filterImage = (image) => {
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  if (
    isStringNotVoid(image) &&
    image !== "null" &&
    !image?.includes("googleusercontent.com")
  ) {
    return `${IP}/${image}`;
  }
  if (!(image instanceof File) && image?.includes("googleusercontent.com")) {
    return image;
  }
  if (!(image instanceof File) && image?.startsWith("blob:")) {
    return image;
  }

  if (image === null) {
    return noImage;
  }
  if (image === "null") {
    return noImage;
  }
  if (image === "") {
    return noImage;
  }
};

export const isVoidObject = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Vérifie si la propriété est ni une chaîne vide ni undefined
      if (obj[key] !== "" && obj[key] !== undefined) {
        return false;
      }
    }
  }
  return true;
};

export const allPropertyIsValid = (obj) => {
  console.log(obj, "agent");
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === "" || obj[key] === undefined || obj[key] === null) {
        return false;
      }
    }
  }
  return true;
};

export const dateTimeFormat = (value) => {
  const [date, _] = value.split("T");
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

export const dateTimeToInput = (value) => {
  const [date, _] = value.split("T");
  const [year, month, day] = date.split("-");
  return `${year}-${month}-${day}`;
};
