export const SHIPPING_ADDRESS_VALIDATION_MESSAGES = {
  first_name: {
    required: 'First name is required',
    maxlength: 'First name should not be more than 200 characters',
  },
  last_name: {
    required: 'Last name is required',
    maxlength: 'Last name should not be more than 200 characters',
  },
  line1: {
    required: 'Address is required',
    maxlength: 'Address should not be more than 200 characters',
  },
  line4: {
    required: 'City is required',
    maxlength: 'City should not be more than 200 characters',
  },
  postcode: {
    required: 'PostCode is required',
    'Mask error': 'PostCode is not valid',
  },
  country: {
    required: 'Country is required',
  },
  phone_number: {
    'Mask error': 'Phone number is not correct',
  }
};

export const CONFIRMATION_VALIDATION_MESSAGES = {
  email: {
    required: 'Email is required',
    email: 'Email is not valid',
    maxlength: 'Email should not be more than 200 characters',
  },
}

