
export async function obtenerClientes() {

    const respuesta = await fetch(import.meta.env.VITE_API_URL)
    const resultado = await respuesta.json()
    return resultado    
}

// get a client based an ID
export async function obtenerCliente(id) {

    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)

    // return an error if the client is not found
    // if(!respuesta.ok) throw new Error('El cliente no fue encontrado')
    if(!respuesta.ok){
        throw new Response('', {
            status: 404,
            statusText: 'El cliente no fue encontrado'
        })
    }

    const resultado = await respuesta.json()
    return resultado    
}

// add client
export async function agregarCliente(datos) {
    
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                // content-type = que tipo de contenido estamos enviando
                'Content-Type': 'application/json'
            }
        })
        // await respuesta.json()

        
    } catch (error) {
        console.log(error)
    }
}

// update client
export async function actualizarCliente(id, datos){

    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                // content-type = que tipo de contenido estamos enviando
                'Content-Type': 'application/json'
            }
        })
        // await respuesta.json()

        
    } catch (error) {
        console.log(error)
    }
}

// delete client
export async function eliminarCliente(id){
    
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE'
        })
        
    } catch (error) {
        console.log(error)
    }
}