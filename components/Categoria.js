import Image from "next/image"
import useQuiosco from "../hook/useQuiosco"

const Categoria = ({categoria}) => {

  const {handleClickCategoria, categoriaActual} = useQuiosco();

  const {nombre, icono, id } = categoria

  return (
    <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} hover:cursor-pointer flex items-center gap-4 w-full border p-5 hover:bg-amber-400 `}
    onClick={() => handleClickCategoria(id)}>

      <Image 
          height={70}
          width={70}
          alt={`Imagen ${icono}`}
          src={`/assets/img/icono_${icono}.svg`}
      />

      <button
        type="button"
        className="text-2xl font-bold"
      >
      {nombre}
      </button>
    </div>
  )
}

export default Categoria