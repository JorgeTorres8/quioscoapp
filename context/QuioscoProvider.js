import { useState, useEffect, createContext } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    //const [paso, setPaso] = useState(1);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);

    const router = useRouter()

    useEffect(() => {
        const obtenerCategorias = async () => {
            const {data} = await axios('/api/categorias')
            setCategorias(data)
        }
        obtenerCategorias();
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])
    
    

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id);
        setCategoriaActual(categoria[0]);
        router.push('/')
    }
    
    const handleSetProducto = (producto) => {
        setProducto(producto);
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => { //destructuring de un objeto
        if(pedido.some(productoState => productoState.id === producto.id)) {
            //Si es true, entonces actualizar la cantidad
            const pedidoActualizado = pedido.map( productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('Guardando Correctamente')
        } else {
            setPedido([...pedido, producto]);
            toast.success('Agregado al Pedido')
        }
        setModal(false);        
    }

   /* const handleChangePaso = (paso) => {
        setPaso(paso)
    } */
 
    const handleEditarCantidades = (id) =>{ 
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal);
    }

    const handleEliminarProducto = (id) => { 
        Swal.fire({
            title: '¿Eliminar?',
            text: "Se eliminará el producto de tu pedido",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                const productoActualizado = pedido.filter(producto => producto.id !==  id)
                setPedido(productoActualizado);
              Swal.fire(
                '¡Eliminado!',
                'Este producto ha sido eliminado.',
                'success'
              )
            }
          })
    }

    const colocarOrden = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            //Resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido realizado correctamente')

            setTimeout(() => {
                router.push('/')
            },3000);

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                setNombre,
                nombre,
                colocarOrden,
                total 
            }}
        >

            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext;