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

export const addBracket = (str) => {
  return { value: str, label: str };
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
    // Recherche si un champ avec le même nom existe dans le tableau des options
    const optionField = optionsArray.find((opt) => opt.name === field.name);

    // Si des options sont trouvées, on les ajoute
    if (optionField && optionField.options) {
      return {
        ...field,
        options: optionField.options,
      };
    }

    // Sinon, on renvoie le champ original sans modification
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

export const corpsToLV = (array = []) => {
  return array?.map((val) => {
    return {
      label: `${val.code_corps} - ${val.libelle_corps}`,
      value: val.code_corps,
    };
  });
};

export const dateBaremeToLV = (array = []) => {
  return array?.map((val) => {
    return { label: val.date_bareme, value: val.date_bareme };
  });
};

export const districtToLV = (array = []) => {
  return array?.map((val) => {
    return {
      label: val.libelle_district,
      value: val.code_district,
    };
  });
};

export const ministereToLV = (array = []) => {
  return array?.map((val) => {
    return {
      label: val.libelle_ministere,
      value: val.id,
    };
  });
};

export const gradeToLV = (array = []) => {
  return array?.map((val) => {
    return {
      label: val.code_grade,
      value: val.code_grade,
    };
  });
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
      // Vérifie si la propriété est ni une chaîne vide ni undefined
      if (obj[key] === "" || obj[key] === undefined || obj[key] === null) {
        return false;
      }
    }
  }
  return true;
};
