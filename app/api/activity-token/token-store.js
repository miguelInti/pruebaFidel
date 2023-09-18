import {ValidationError} from "@app/custom/Errors/validation-error";
import { TokenModel, TokenStatusEnum } from "./token-model";

/**
 * Class representing a TokenStore.
 */
class TokenStore {

    /**
     * Private field to store the tokens.
     * @type {TokenModel[]}
     * @private
     */
    #db;
  
    /**
     * Create a TokenStore.
     * Initializes the private field `#db` as an empty array.
     */
    constructor() {
      this.#db = [];
    }
  
    /**
     * Get the valid token for the specified user and machineSerial.
     * If no valid token is found, a new token is added and returned.
     * @param {string} userId - The user ID.
     * @param {string} machineSerial - The machine serial number.
     * @returns {Object} - The valid token data.
     */
    get = (userId, machineSerial) => {
      const tokenData = this.#findValidTokenByUserId(userId);
      if (tokenData !== undefined) {
        return tokenData.get();
      }
      const response = this.#add(userId, machineSerial);
      return response.get();
    }

    getIsValidatedStatusByTokenId = (token) => {
      const tokenData = this.#db.find(data => data.token == token);
      if (tokenData == undefined) {
        throw new ValidationError('No se encontró el token');
      }
      if (tokenData.status !== TokenStatusEnum.enabled || tokenData.status !== TokenStatusEnum.validated) {
        throw new ValidationError(`The token is ${tokenData.status}`);
      }
      if (tokenData.status == TokenStatusEnum.validated){
        this.#deleteByUserId(tokenData.userId);
        return true;
      }
      return false;
    }

    
    /**
     * Add a new token for the specified user and machineSerial.
     * Deletes any existing token for the user before adding the new one.
     * @param {string} userId - The user ID.
     * @param {string} machineSerial - The machine serial number.
     * @returns {Object} - A copy of the newly added token data.
     * @private
     */
    #add = (userId, machineSerial) => {
      this.#deleteByUserId(userId);
      const newToken = new TokenModel(userId, machineSerial);
      this.#db.push(newToken);
      return { ...newToken };
    }
  
    /**
     * Delete the token associated with the specified user.
     * @param {string} userId - The user ID.
     * @private
     */
    #deleteByUserId = (userId) => {
      const index = this.#db.findIndex(data => data.userId === userId);
      if (index !== -1) {
        this.#db.splice(index, 1);
      }
    }
  
    /**
     * Find the valid token data for the specified user.
     * @param {string} userId - The user ID.
     * @returns {Object|undefined} - A copy of the valid token data or undefined if not found.
     * @private
     */
    #findValidTokenByUserId = (userId) => {
      const tokenData = this.#findByUserId(userId);
      if (tokenData !== undefined && tokenData.status === TokenStatusEnum.enabled) {
        return { ...tokenData };
      }
    }
    
  
    /**
     * Find the token data for the specified user.
     * @param {string} userId - The user ID.
     * @returns {Object|undefined} - A copy of the token data or undefined if not found.
     * @private
     */
    #findByUserId = (userId) => {
      return this.#db.find(data => data.userId === userId);
    }
  
    /**
     * Check the token and user, and remove the associated token.
     * Throws a ValidationError if the token or user is invalid.
     * @param {string} userId - The user ID.
     * @param {string} machineSerial - The machine serial number.
     * @param {string} token - The token to validate.
     */
    checkAndMarkAsValidated = (userId, machineSerial, token) => {
      const tokenData = this.#findByUserId(userId);
      this.#validateTokenAndUser(tokenData, machineSerial, token);
      tokenData.markStatusAsValidated();
    }
  
    /**
     * Validate the token and user, and throw a ValidationError if invalid.
     * @param {string} userId - The user ID.
     * @param {string} machineSerial - The machine serial number.
     * @param {string} token - The token to validate.
     * @throws {ValidationError} - If the token or user is invalid.
     * @private
     */
    #validateTokenAndUser = (tokenData, machineSerial, token) => {
      if (tokenData === undefined) {
        throw new ValidationError('User not found');
      }
      if (tokenData.status !== TokenStatusEnum.enabled) {
        throw new ValidationError(`The token is ${tokenData.status}`);
      }
      if (tokenData.machineSerial !== machineSerial || tokenData.token !== token) {
        tokenData.markAttemptFailed();
        throw new ValidationError('Invalid token');
      }
    }
  }
  
const tokenStore = new TokenStore();
export default tokenStore;
