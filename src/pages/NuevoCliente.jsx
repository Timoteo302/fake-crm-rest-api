import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../data/clientes"
import Swal from "sweetalert2"


export async function action({ request }) {

    const formData = await request.formData()

    const datos = Object.fromEntries(formData)   // datos del formulario
    const email = formData.get('email')

    // Validación
    const errores = []

    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
    }

    // Validar email
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        errores.push('El Email no es válido')
    }


    // Retornar si hay errores
    if (errores.length > 0) {
        return errores
    }

    // send data to the function and receive a responses
    await agregarCliente(datos)
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
        title: "Cliente agregado!"
    })
    return redirect('/')


    return { ok: true }
}



function NuevoCliente() {


    const errores = useActionData() // obtenemos los errores desde el "action"
    const navigate = useNavigate()


    return (
        <>
            <h2 className="font-black text-4xl text-blue-900">Nuevo Cliente</h2>
            <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

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
                    <Formulario />

                    <input type="submit"
                        className="w-full mt-5 bg-blue-800 cursor-pointer text-lg text-white p-2 rounded-md font-bold uppercase"
                        value="Registrar Cliente"
                    />

                </Form>

            </div>

        </>
    )
}

export default NuevoCliente
