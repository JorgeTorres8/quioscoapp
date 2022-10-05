import Image from "next/image"
import {formatearDinero} from '../helpers'
import useQuiosco from "../hook/useQuiosco"


const Producto = ({producto}) => {
    const {handleSetProducto, handleChangeModal} = useQuiosco();
    const {nombre, imagen, precio} = producto

  return (
    <div className="border p-3 ">
        
        <div className="flex justify-center">
            <Image
                src={`/assets/img/${imagen}.jpg`}
                alt={`Imagen Platillo ${nombre}`}
                width={400}
                height={500}
                className="flex justify-center"
            />
        </div>
        
        <div className="p-5">
            <h3 className="text-2xl font-bold flex justify-center">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500 flex justify-center">{formatearDinero(precio)}</p>

            <button
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                onClick={() => {
                    handleChangeModal()
                    handleSetProducto(producto) 
                }}
            >
            Agregar
            </button>
        </div>
    </div>
  )
}

export default Producto