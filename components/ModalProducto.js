import { useState, useEffect} from "react";
import Image from "next/image"
import useQuiosco from "../hook/useQuiosco"
import { formatearDinero } from "../helpers";


const ModalProducto = () => {

    const { producto, handleChangeModal, handleAgregarPedido, pedido } = useQuiosco();
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false)

    useEffect(() => {
        //Comprobar si el Modal Actual está en el pedido
        if(pedido.some((pedidoState) => pedidoState.id === producto.id)){
            const productoEdicion = pedido.find((pedidoState => pedidoState.id === producto.id))
            setEdicion(true);
            setCantidad(productoEdicion.cantidad);
        }
    }, [producto, pedido])
    

    

  return (
    <div className="grid md:flex">
        <div className="md:w-1/3 flex justify-center">
            <Image
                width={300}
                height={400}
                alt={`Imagen producto ${producto.nombre}`}
                src={`/assets/img/${producto.imagen}.jpg`}
            />
        </div>

        <div className="md:w-2/3">
            <div className="flex justify-end">
                <button onClick={handleChangeModal}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                    <path 
                        strokeLinecap="round"
                        strokeLinejoin="round" 
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
            </div>
            <h1 className="text-3xl font-bold mt-3 md:mt-5 text-center ">{producto.nombre}</h1>
            <p className="mt-3 md:mt-5 font-black text-5xl text-amber-500 flex justify-center">{formatearDinero(producto.precio)}</p>
            
            <div className="flex gap-4 mt-3 md:mt-5 justify-center">
                <button
                    type="button"
                    onClick={() =>{
                        if(cantidad <= 1) return
                        setCantidad(cantidad-1)
                    }}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}>

                    <path 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                <p className="text-3xl">{cantidad}</p>

                <button
                    type="button"
                    onClick={() =>{
                        if(cantidad >= 10) return
                        setCantidad(cantidad+1)
                    }}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}>

                    <path 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    className={"bg-indigo-600 hover:bg-indigo-800 text-white px-5 py-2 mt-3 md:mt-5 font-bold uppercase rounded"}
                    onClick={()=> handleAgregarPedido({...producto,cantidad})}
                >
                    {edicion ? "Guardar Cambios" : "Añadir al Pedido"}
                </button>
            </div>

        </div>
    </div>
  )
}

export default ModalProducto