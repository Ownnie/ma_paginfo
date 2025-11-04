export default function Footer() {
    return (
        <footer className="border-t border-neutral-200 bg-white">
            <div className="container py-10 text-sm text-neutral-600 grid gap-6 sm:grid-cols-2 items-center">
                <p>
                    © {new Date().getFullYear()} Asesor Anticonceptivo — Uso educativo.
                    <span className="ml-1 font-medium">No reemplaza una consulta médica.</span>
                </p>
                <p className="sm:text-right">
                    En caso de urgencia, acude a un servicio de urgencias o llama a la línea 123.
                </p>
            </div>
        </footer>
    );
}
