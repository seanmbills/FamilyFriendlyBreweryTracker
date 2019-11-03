export function validatePassword(pass) {
    return pass.length >= 8 
        && (/[a-z]/.test(pass)) // check to ensure pass contains lowercase
        && pass.match(/[A-Z]/)  // check to ensure pass contains uppercase
        && pass.match(/\d/)     // check to ensure pass contains a digit
        && pass.match(/[$|*=(!)[\]_+@.-]/) // check to ensure pass contains special character
        && (!pass.match(/[^a-zA-Z0-9$|*=(!)[\]_+@.-]/)); // check to ensure pass doesn't contain character that is not a special one
}

export function validateEmail(mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
}

export function validatePhoneNumber(phoneNumber) {
    if (phoneNumber.length == 10) {
        return (/[0-9]/.test(phoneNumber));
    } else {
        return false;
    }
}

export function validateURL(url) {
    const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    return urlRegex.test(url);
}

export function validateBreweryName(name) {
    if (!name || name.length == '')
        return false;
    return true;
}

export function validateAddress(address) {
    if (!address || !address['street'] || !address['city'] ||
        !address['state'])
        return false;
    if (address['street'] == '' || address['city'] == '' ||
     address['state'] == '')
        return false;
    return true;
}

export function validatePrice(price) {
    if (!price || price < 0 || price > 4 ) {
        return false;
    }
    return true;
}
