import { ValidationError } from "@app/custom/Errors/validation-error";

/**
 * Enum representing the possible status of a token.
 */
const TokenStatusEnum = {
  banned: 'banned',
  expired: 'expired',
  enabled: 'enabled',
  validated: 'validated'
};

/**
 * Class representing a TokenModel.
 */
class TokenModel {
  /**
   * Private fields to store token data.
   * @type {Date}
   * @private
   */
  #createdDate;

  /**
   * Private fields to store token data.   
   * @type {string}
   * @private
   */
  #userId;

  /**
   * Private fields to store token data.   
   * @type {string}
   * @private
   */
  #machineSerial;

  /**
   * Private fields to store token data.   
   * @type {string}
   * @private
   */
  #token;

  /**
   * @type {number}
   * @private
   */
  #attempt;
  
  /**
   * @type {boolean}
   * @private
   */
  #isValidated;

  /**
   * Create a TokenModel instance.
   * @param {string} userId - The user ID.
   * @param {string} machineSerial - The machine serial number.
   */
  constructor(userId, machineSerial) {
    this.#createdDate = new Date();
    this.#userId = userId;
    this.#machineSerial = machineSerial;
    this.#token = this.#generateRandomCode();
    this.#attempt = 0;
    this.#isValidated = false;
  }

  /**
   * Get the machine serial number.
   * @returns {string} - The machine serial number.
   */
  get machineSerial() {
    return this.#machineSerial;
  }

  /**
   * Get the user ID.
   * @returns {string} - The user ID.
   */
  get userId() {
    return this.#userId;
  }

  /**
   * Get the token.
   * @returns {string} - The token.
   */
  get token() {
    return this.#token;
  }

  /**
   * Get the status of the token.
   * @returns {string} - The status of the token (banned, expired, or enabled).
   */
  get status() {
    const differenceSeconds = this.#getSecondsDifference();

    if (this.#isValidated) {
      return TokenStatusEnum.validated
    }

    if (this.#attempt > 2) {
      return TokenStatusEnum.banned;
    }

    if (differenceSeconds > 120) {
      return TokenStatusEnum.expired;
    }

    return TokenStatusEnum.enabled;
  }

  /**
   * Get the token data as an object.
   * @returns {Object} - The token data as an object.
   */
  get = () => {
    return {
      token: this.#token,
      userId: this.#userId,
      machineSerial: this.#machineSerial,
    };
  }

  /**
   * Get the validation errors.
   * @returns {string|undefined} - The validation errors or undefined if the token is enabled.
   */
  getErrors = () => {
    if (this.status !== TokenStatusEnum.enabled) {
      return this.status;
    }
  }

  /**
   * Mark an attempt as failed and check if the token is banned.
   * @throws {ValidationError} - If the token is banned and an attempt is made.
   */
  markAttemptFailed = () => {
    if (this.status === TokenStatusEnum.banned) {
      throw new ValidationError('Allowed attempts reached');
    }
    this.#attempt++;
  }

  markStatusAsValidated = () => {
    this.#isValidated = true;
  }

  /**
   * Generate a random token code.
   * @returns {string} - The generated random token code.
   * @private
   */
  #generateRandomCode = () => {
    const code = [];
    while (code.length < 4) {
      const randomNumber = Math.floor(Math.random() * 4) + 1;
      const lastNumber = code[code.length - 1];
      const secondLastNumber = code[code.length - 2];
      if (
        !code.includes(randomNumber) &&
        randomNumber !== lastNumber &&
        randomNumber !== secondLastNumber
      ) {
        code.push(randomNumber);
      }
    }
    return code.join('');
  }

  /**
   * Get the difference in seconds between the current date and the created date.
   * @returns {number} - The difference in seconds.
   * @private
   */
  #getSecondsDifference = () => {
    const currentDateTime = new Date();
    const differenceMs = currentDateTime.getTime() - this.#createdDate.getTime();
    const differenceSeconds = Math.floor(differenceMs / 1000);
    return differenceSeconds;
  }

}

export { TokenStatusEnum , TokenModel }