import Image from "next/image";
import useQuiosco from "../hook/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {

  const {categorias} = useQuiosco();
  
  return (
    <>
        <div className="mt-5 flex justify-center">
            <Image
                width={300}
                height={100}
                src="/assets/img/logo.svg"
                alt="imagen logotipo"
            />
        </div>
        

        <nav className="mt-5">
            {categorias?.map(categoria => (
                <Categoria
                    key={categoria.id}
                    categoria={categoria}
                />
            ))}
        </nav>
        
        

    </>
  )
}

export default Sidebar