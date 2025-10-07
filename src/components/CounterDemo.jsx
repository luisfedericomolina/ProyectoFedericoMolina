import { useCounter } from "../hooks/useCounter";
import { Link } from "react-router-dom";

export default function CounterDemo() {
    const { count, incrementar, restarUno, resetear } = useCounter(0);

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                        🔢 Contador Interactivo
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Maneja estados numéricos.
                    </p>
                </div>

                {/* Navegación */}
                <div className="flex justify-center mb-8">
                    <Link 
                        to="/panel-hooks" 
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        ← Volver al Panel
                    </Link>
                </div>

                {/* Demo Card */}
                <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-center mb-6 text-gray-600">
                        Haga click en el símbolo - o +
                    </h3>
                    
                    <div className="text-center mb-8">
                        <div className="text-6xl font-bold text-gray-800 mb-4">
                            {count}
                        </div>
                        <p className="text-gray-500 text-sm">
                            Valor actual del contador
                        </p>
                    </div>

                    {/* Controles */}
                    <div className="flex justify-center gap-4 mb-6">
                        <button 
                            className="bg-red-500 text-white w-12 h-12 rounded-full text-2xl hover:bg-red-600 transition shadow-lg"
                            onClick={restarUno}
                        >
                            -
                        </button>
                        <button 
                            className="bg-green-500 text-white w-12 h-12 rounded-full text-2xl hover:bg-green-600 transition shadow-lg"
                            onClick={incrementar}
                        >
                            +
                        </button>
                    </div>

                    <button 
                        className="w-full bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition font-semibold shadow-lg"
                        onClick={resetear}
                    >
                        🔄 Resetear a cero (0)
                    </button>
                </div>
               
            </div>
        </div>
    );
}