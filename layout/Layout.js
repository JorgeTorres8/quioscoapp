import Head from "next/head"
import Modal from "react-modal"
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar"
import Pasos from "../components/Pasos";
import ModalProducto from "../components/ModalProducto";
import useQuiosco from "../hook/useQuiosco";

import 'react-toastify/dist/ReactToastify.css' // estilos

const customStyles = { //lo copiamos desde la pagina del npm
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#__next'); //si fuera en vite seria root

export default function Layout({children, pagina}) {

    const {modal} = useQuiosco();

    return (
        <>
            <Head>
                <title>Café - {pagina}</title>
                <meta name="description" content="Quiosco Cafetería"/>
            </Head>
        
            <div className="md:flex">
                <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
                    <Sidebar/>
                </aside>

                <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                    <div className="p-10">
                        <Pasos/>
                        {children}
                    </div>
                </main>
            </div>

            {modal && (
                <Modal isOpen={modal} style={customStyles}>
                    <ModalProducto/>
                </Modal>
            )}

            <ToastContainer/>
        </>

    )
}