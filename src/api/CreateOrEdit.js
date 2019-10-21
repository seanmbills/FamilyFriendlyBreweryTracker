import React, {useContext} from 'react';
import {Context as BreweryContext} from '../context/BreweryContext';
import {createBrewery} from '../context/BreweryContext';
/*
 * Function will take in input from BreweryForm component
 * then decided if createBrewery or editBrewery needs to be called
 * then the function will call the correct context method using the given parameters
 */
export function callBreweryCreateOrEdit (isNew, name, address, price, phoneNumber,
    email, website, businesshours, kidsHoursSameAsNormal, alternativeKidFriendlyHours, accommodationsSearch) {
    if (isNew) {
        createBrewery({name, address, price, phoneNumber, email, website,
        businesshours, kidsHoursSameAsNormal, alternativeKidFriendlyHours, accommodationsSearch});
    }
}
