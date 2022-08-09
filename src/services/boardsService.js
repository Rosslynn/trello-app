import { makeGetRequest, makeDeleteRequest, makePostRequest } from '../clients/clientWrapper';

const baseURL = 'http://localhost:3000';

/**
 * Función para obtener los tableros
 * @returns Promesa con la respuesta
 */
export function getBoards() {
  const url = `${baseURL}/boards`;
  return makeGetRequest(url);
}

/**
 * Función para crear un tablero
 * @param {Object} body - Información del tablero
 * @returns Promesa con la respuesta
 */
export function addBoard(body) {
  const url = `${baseURL}/boards`;
  return makePostRequest(url, body);
}

export function deleteBoard(id) {
  const url = `${baseURL}/boards/${id}`;
  return makeDeleteRequest(url);
}

export function getBoardById(id) {
  const url = `${baseURL}/boards/${id}`;
  return makeGetRequest(url);
}
