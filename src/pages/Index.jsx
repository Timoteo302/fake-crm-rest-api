import { useLoaderData } from "react-router-dom"
import Cliente from "../components/Cliente"
import { obtenerClientes } from "../data/clientes"
import Spinner from "../components/Spinner"

export async function loader() {

    const clientes = await obtenerClientes()
    return clientes
    // console.log(import.meta.env) --> ver variables de entorno
}

function Index() {

    const clientes = useLoaderData()
    // console.log(clientes)

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus Clientes</p>

            {clientes && clientes.length ? (
                <table className="w-full bg-white shadow mt-5 table-auto">
                    
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="p-2">Cliente</th>
                            <th className="p-2">Contacto</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map((cliente) => (
                            <Cliente 
                                cliente={cliente}
                                key={cliente.id}
                            />
                        ))}
                    </tbody>

                </table>
            ) : (
                <div>
                    { clientes === null ? <Spinner /> : <p className="text-center mt-10">No hay Clientes aún</p>}
                </div>
            )}
        </>
    )
}

export default Index
