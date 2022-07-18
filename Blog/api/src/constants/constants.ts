export const numToEncode = 10;

export const expiresInForToken = '168h';

export const MAX_IMAGE_SIZE = 5242880;

export const enum MessageError {
  EMAIL_IS_TAKEN = 'This email is already taken',
  INCORRECT_DATA = 'You entered incorrect data',
  USER_ID_NOT_FOUND = 'User with this id not found',
  NOT_AUTHORIZED = 'Not authorized',
  ACCESS_DENIED = 'Access denied',
  ADVERTISEMENT_NOT_FOUND = 'This advertisement was not found',
  ERROR_WHILE_SAVING_ON_CLOUDINARY = 'Error while saving on cloudinary',
}

export const enum FILES_ERRORS {
  FILE_TYPE_IS_NOT_MATCHING = 'File type is not matching',
  FILE_EXPECTED = 'File expected',
}
