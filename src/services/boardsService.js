import { makeGetRequest } from '../clients/clientWrapper';

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
  return makeGetRequest(url, body);
}
