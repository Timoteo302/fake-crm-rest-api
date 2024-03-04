import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import { obtenerCliente, actualizarCliente } from "../data/clientes"
import Error from "../components/Error"
import Swal from "sweetalert2"

export async function loader({ params }) {
    // console.log(params)
    const cliente = obtenerCliente(params.clienteId)
    return cliente

    return { ok: true }
}


export async function action({request, params}) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData) // datos del formulario
    const email = formData.get('email')

    // Validación
    const errores = []

    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
    }

    // Validar email
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
        errores.push('El Email no es válido')
    }
    
    // Retornar si hay errores
    if (errores.length > 0) {
        return errores
    }

    // send data to the function and receive a response
    await actualizarCliente(params.clienteId, datos)
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
        title: "Cliente actualizado!"
    })
    return redirect('/')

    
    return { ok: true }
}


function EditarCliente() {

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

    return (
        <>
            <h2 className="font-black text-4xl text-blue-900">Editar Cliente</h2>
            <p className="mt-3">A continuación podrás modificar los datos de un cliente</p>

            <div className="flex justify-end">

                <button
                    className="bg-blue-800 text-white px-3 py-1 my-7 rounded-md font-bold uppercase"
                    onClick={() => navigate('/')}
                >
                    Volver
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-8 mt-2">
                
                {errores?.length > 0 && errores.map((error, i) => <Error key={i}>{error}</Error>)}

                <Form
                    method="POST"
                    noValidate
                >
                    <Formulario cliente={cliente} />
                    <input type="submit"
                        className="w-full mt-5 bg-blue-800 cursor-pointer text-lg text-white p-2 rounded-md font-bold uppercase"
                        value="Guardar cambios"
                    />
                </Form>

            </div>

        </>
    )
}

export default EditarCliente