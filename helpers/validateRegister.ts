import validator from "validator";
import capitalizeFirstLetter from "../helpers/stringMethods";

interface Register {
  name: string;
  surname: string;
  email: string;
  password: string;
}

function validateRegister(data: Register) {
  return new Promise((resolve, reject) => {
    let nameValidated: Boolean = false;
    let surnameValidated: Boolean = false;
    let passwordValidated: Boolean = false;
    let emailValidated: Boolean = false;

    //escaping from dangerous characters
    let name: string = validator.escape(data.name);
    let surname: string = validator.escape(data.surname);
    const email: string = validator.escape(data.email);
    const password: string = validator.escape(data.password);

    //this section checking name
    if (!validator.isEmpty(name) && validator.isLength(name, { min: 1 })) {
      name = name.trim();
      name = capitalizeFirstLetter(name);
      nameValidated = true;
    } else {
      reject("imię nie może być puste");
    }

    //this section checking surname
    if (!validator.isEmpty(surname) && validator.isLength(surname, { min: 1 })) {
      surname = surname.trim();
      surname = capitalizeFirstLetter(surname);
      surnameValidated = true;
    } else {
      reject("nazwisko nie może być puste");
    }

    //this section checking email
    if (!validator.isEmpty(email) && validator.isLength(email, { min: 1 })) {
      if (validator.isEmail(email)) {
        emailValidated = true;
      } else {
        reject("email nie zgadza się");
      }
    } else {
      reject("email nie może być puste");
    }

    //this section checking password
    if (!validator.isEmpty(password) && validator.isLength(password, { min: 1 })) {
      if (
        validator.isStrongPassword(password, {
          minLength: 8,
          minUppercase: 1,
          minLowercase: 1,
          minSymbols: 0,
          minNumbers: 0,
        })
      ) {
        passwordValidated = true;
      } else {
        reject(
          "hasło musi zawierać conajmniej jedną wielką literę i jedną małą literę oraz musi mieć conajmniej 8 liter"
        );
      }
    } else {
      reject("hasło nie może być puste");
    }

    if (nameValidated && surnameValidated && emailValidated && passwordValidated) {
      const data = {
        name: name,
        surname: surname,
        email: email,
        password: password,
      };

      resolve(data);
    }
  });
}

export default validateRegister;
