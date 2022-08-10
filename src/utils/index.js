/* eslint-disable import/prefer-default-export */
import store from '../store/index';
/**
 * Función que permite añadir una propiedad reactiva a un objeto
 * @param {Object} objectToAddProperty - Objeto a añadir la propiedad
 * @param {*} propertyName - Nombre de la propiedad
 * @param {*} valueToShow - Valor a retornar cada vez que se use la propiedad - (Debe ser un getter)
 */
export function defineReactiveProperty(objectToAddProperty, propertyName, valueToShow) {
  console.log(valueToShow);
  Object.defineProperty(objectToAddProperty, propertyName, {
    enumerable: true,
    get: () => store.getters[valueToShow],
  });
}
