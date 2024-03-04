import { useNavigate, Form, redirect } from "react-router-dom"
import { eliminarCliente } from "../data/clientes"
import Swal from 'sweetalert2'


export async function action({ params }) {

    const r = await Swal.fire({
        title: "Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
        cancelButtonText: "Cancelar",
        customClass: {
            title: 'my-swal-title',
            confirmButton: 'swal-confirm-button',
            cancelButton: 'swal-cancel-button'
        }
    })

    if (r.isConfirmed) {
        await eliminarCliente(params.clienteId)

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Registro eliminado!"
        });
    }

    return redirect('/')
    return { ok: true }
}


function Cliente({ cliente }) {

    const navigate = useNavigate()

    const { nombre, telefono, email, empresa, id } = cliente

    return (
        <tr className="border-b bg-blue-50">
            <td className="sm:p-5 py-5 pl-3 space-y-1">
                <p className="text-2xl text-gray-800 font-bold max-sm:text-sm py-1">{nombre}</p>
                <p className="text-xs">{empresa}</p>
            </td>

            <td className="sm:p-5 py-5 pl-3 space-y-1">
                <p className="text-gray-600 max-sm:text-sm py-1"> <span className="text-gray-800 font-bold max-sm:text-xs">Email: </span> {email}</p>
                <p className="text-gray-600 max-sm:text-sm"> <span className="text-gray-800 font-bold max-sm:text-xs">Tel: </span>{telefono}</p>
            </td>

            <td className="md:flex md:justify-center py-5 md:gap-3 max-sm:flex max-sm:flex-col max-sm:items-center">
                <button
                    className="text-blue-600 hover:text-blue:300 uperrcase font-bold max-sm:text-sm py-2 mx-3"
                    onClick={() => navigate(`/clientes/${id}/editar`)}
                >
                    Editar
                </button>

                <Form
                    method="POST"
                    action={`/clientes/${id}/eliminar`}
                // onSubmit={(e) => {
                //     if(!confirm('¿Deseas eliminar este registro?')){
                //         e.preventDefault() // previene la ejecucion del action()
                //     }
                // }}
                >
                    <button
                        type="submit"
                        className="text-red-600 hover:text-red:300 uperrcase font-bold max-sm:text-sm py-2 mx-3"
                    >
                        Eliminar
                    </button>
                </Form>
            </td>
        </tr>

    )
}

export default Cliente
