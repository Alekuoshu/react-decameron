import { useState, useEffect } from 'react';

/**
 * Componente para mostrar un select, el cual se puede controlar con dos props:
 * valueRef: ref para controlar el valor del select
 * valueAct: valor actual del select
 * 
 * @param {string} name - nombre del select
 * @param {string} id - id del select
 * @param {array} data - informacion para poblar el select
 * @param {React.MutableRefObject<null | HTMLSelectElement>} valueRef - ref para controlar el valor del select
 * @param {string} valueAct - valor actual del select
 * 
 * @returns {React.ReactElement} - component select
 */
export default function Select({name, id, data, valueRef, valueAct }) {
  const [itemSeleccionado, setItemSeleccionado] = useState('');

  useEffect(() => {
    setItemSeleccionado(valueAct);
  }, [valueAct]);

  return (
    <select 
      ref={valueRef} 
      className="mt-2 w-full p-3 bg-gray-50"
      value={itemSeleccionado} onChange={(e) => setItemSeleccionado(e.target.value)}
      name={name}
      id={id}
      >
      <option value="">-- Seleccione --</option>
      {data.map(item => (
        <option key={item.id} value={item.nombre}>{item.nombre}</option>
      ))}
    </select>
  )
}
