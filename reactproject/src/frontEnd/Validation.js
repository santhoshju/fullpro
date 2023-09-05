export const emailValidation = (email) =>{
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
}


export const mblNumberValidation = (number) => {
  const cleanedNumber = number.replace(/\D/g, "");
  return cleanedNumber.length === 10 && !isNaN(cleanedNumber);
}

export const nameValidation = (fName) => {
    if(fName === '') return false;
}

export const lnameValidation = (lName) => {
  if (lName === "") return false;
};

export const addressValidation = (address) => {
    if(address === '') return false;
    const addressLength = address.split(/\s+/);
    return addressLength.length <=10;

}