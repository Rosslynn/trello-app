/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import store from '../store/index';
/**
 * Función que permite añadir una propiedad reactiva a un objeto
 * @param {Object} objectToAddProperty - Objeto a añadir la propiedad
 * @param {String} propertyName - Nombre de la propiedad
 * @param {String} valueToShow - Valor a retornar cada vez que se use la propiedad - (Debe ser un getter)
 * @param {Boolean} isFunction - Booleano que indica si debe ejecutar una función
 */
export function defineReactiveProperty({
  objectToAddProperty, propertyName, valueToShow, isFunction = false,
}) {
  Object.defineProperty(objectToAddProperty, propertyName, {
    enumerable: true,
    get: () => ((isFunction) ? store.getters[valueToShow]() : store.getters[valueToShow]),
  });
}
