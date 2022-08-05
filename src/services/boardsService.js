import { makeGetRequest } from '../clients/clientWrapper';

const baseURL = 'http://localhost:3000';

export function getBoards() {
  const url = `${baseURL}/boards`;
  return makeGetRequest(url);
}

export function addBoard(body) {
  const url = `${baseURL}/boards`;
  return makeGetRequest(url, body);
}
