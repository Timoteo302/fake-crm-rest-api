import { Outlet, Link, useLocation } from "react-router-dom"

function Layout() {

    const location = useLocation()
    // console.log(location)

    return (
        <div className="md:flex md:min-h-screen">

            <aside className="md:w-1/4 bg-blue-700 px-5 py-10">
                <h2 className="text-4xl font-black text-white">CRM Clientes</h2>

                <nav className="mt-10">
                    <Link className={`${location.pathname === '/' ? 'text-white border-l-8 rounded-md border-blue-200' : 'text-white'} text-2xl block mt-2 hover:text-blue-200 px-1 hover:scale-95 transform transition-transform duration-400 ease-in-out`} to="/">Clientes</Link>
                    <Link className={`${location.pathname === '/clientes/nuevo' ? 'text-white border-l-8 rounded-md border-blue-200' : 'text-white'} text-2xl block mt-2 hover:text-blue-200 px-1 hover:scale-95 transform transition-transform duration-400 ease-in-out`} to="/clientes/nuevo">Nuevo Cliente</Link>
                </nav>
            </aside>

            <main className="md:w-3/4 sm:p-8 p-3 md:h-screen md:overflow-y-scroll">
                <Outlet />
            </main>

        </div>
    )
}

export default Layout
