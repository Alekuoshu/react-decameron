function Footer() {
  return (
    <footer className="w-full bg-blue-950 p-12">
        <p className="text-center text-md text-white">
            &copy; {new Date().getFullYear()} Alejandro Villegas. Todos los derechos reservados.
        </p>
    </footer>
  )
}

export default Footer