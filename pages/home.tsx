import React, { useState } from "react";
import { Header } from "@/components/header";
import { FlightSearch } from "@/components/flight-search";
import { FlightResults } from "@/components/flight-results";
import { WhatsappButton } from "@/components/whatsapp-button";
import { useSearchFlights } from "@workspace/api-client-react";
import type { FlightOffer, FlightSearchBody } from "@workspace/api-client-react/src/generated/api.schemas";
import { LeadModal } from "@/components/lead-modal";
import { motion } from "framer-motion";
import { Shield, Headphones, Tag, Star, MapPin } from "lucide-react";

const FEATURES = [
  {
    icon: <Tag size={28} />,
    title: "Tarifas Reales",
    desc: "Precios en tiempo real directamente de las aerolíneas a través de nuestra plataforma certificada.",
  },
  {
    icon: <Headphones size={28} />,
    title: "Atención Personalizada",
    desc: "Un agente especializado te acompaña en cada paso, desde la búsqueda hasta el embarque.",
  },
  {
    icon: <Shield size={28} />,
    title: "Reserva Segura",
    desc: "Tu reserva está garantizada con validación humana para evitar errores y asegurar tu cupo.",
  },
  {
    icon: <Star size={28} />,
    title: "Años de Experiencia",
    desc: "Especialistas en viajes entre España y América Latina con cientos de clientes satisfechos.",
  },
];

const DESTINATIONS = [
  { city: "Bogotá", country: "Colombia", iata: "BOG", img: "https://images.unsplash.com/photo-1469796466635-455ede028aca?w=400&q=70" },
  { city: "Lima", country: "Perú", iata: "LIM", img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&q=70" },
  { city: "Ciudad de México", country: "México", iata: "MEX", img: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&q=70" },
  { city: "Buenos Aires", country: "Argentina", iata: "EZE", img: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400&q=70" },
  { city: "Cancún", country: "México", iata: "CUN", img: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=400&q=70" },
  { city: "Miami", country: "EE.UU.", iata: "MIA", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70" },
];

export default function Home() {
  const searchFlights = useSearchFlights();
  const [results, setResults] = useState<FlightOffer[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
  const [searchParams, setSearchParams] = useState<FlightSearchBody | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (data: FlightSearchBody) => {
    setSearchParams(data);
    setHasSearched(true);
    setResults([]);
    searchFlights.mutate(
      { data },
      {
        onSuccess: (response) => {
          setResults(response.offers);
          setTimeout(() => {
            document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        },
      }
    );
  };

  const handleSelectFlight = (flight: FlightOffer) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero */}
      <section
        id="buscar"
        className="relative py-10 md:py-16 px-4"
        style={{
          background: "linear-gradient(135deg, #002366 0%, #003399 60%, #001a4d 100%)",
        }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=30&w=2000&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-tight" style={{ color: "#D4AF37" }}>
              Encuentra tu próximo destino
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
              Precios reales de las aerolíneas · Atención personalizada · Iberomundo Viajes
            </p>
          </div>

          <FlightSearch onSearch={handleSearch} isPending={searchFlights.isPending} />
        </div>
      </section>

      {/* Results section */}
      <section id="resultados" className="max-w-5xl mx-auto w-full px-4 py-6">
        {searchFlights.isPending && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div
              className="w-14 h-14 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: "#002366", borderTopColor: "transparent" }}
            />
            <p className="text-gray-500 font-medium">Buscando los mejores vuelos para ti...</p>
          </div>
        )}

        {searchFlights.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm mt-2">
            <strong>No se pudieron cargar los vuelos.</strong>{" "}
            {(searchFlights.error as { response?: { data?: { error?: string } } })?.response?.data?.error
              ?? "Por favor verifica los aeropuertos y las fechas seleccionadas, y vuelve a intentarlo."}
          </div>
        )}

        {hasSearched && !searchFlights.isPending && !searchFlights.isError && results.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl text-sm">
            No se encontraron vuelos para esta ruta y fechas. Prueba con otras fechas o aeropuertos cercanos.
          </div>
        )}

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: "#002366" }}>
                Vuelos encontrados
              </h2>
              <span className="text-sm text-gray-500 font-medium bg-white border border-gray-200 rounded-full px-3 py-1">
                {results.length} opciones
              </span>
            </div>
            <FlightResults results={results} onSelect={handleSelectFlight} />
          </motion.div>
        )}
      </section>

      {/* Only show below sections when no search has happened */}
      {!hasSearched && (
        <>
          {/* Destinos populares */}
          <section className="max-w-5xl mx-auto w-full px-4 py-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ color: "#002366" }}>
                Destinos Populares
              </h2>
              <p className="text-gray-500 text-sm md:text-base">Los vuelos más solicitados desde España</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {DESTINATIONS.map((dest) => (
                <div
                  key={dest.iata}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={dest.img}
                    alt={dest.city}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <div className="flex items-center gap-1 text-white/80 text-xs mb-0.5">
                      <MapPin size={11} />
                      {dest.country}
                    </div>
                    <p className="text-white font-bold text-sm md:text-base leading-tight">{dest.city}</p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: "#D4AF37" }}>{dest.iata}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Por qué elegirnos */}
          <section className="w-full py-10 md:py-14" style={{ backgroundColor: "#002366" }}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ color: "#D4AF37" }}>
                  ¿Por qué elegir Iberomundo Viajes?
                </h2>
                <p className="text-white/70 text-sm md:text-base">Tu agencia de confianza entre España y América</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {FEATURES.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center p-5 rounded-2xl"
                    style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                  >
                    <div className="mb-3 p-3 rounded-full" style={{ backgroundColor: "rgba(212,175,55,0.15)", color: "#D4AF37" }}>
                      {f.icon}
                    </div>
                    <h3 className="font-bold text-white mb-2 text-base">{f.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA contacto */}
          <section id="contacto" className="max-w-3xl mx-auto w-full px-4 py-12 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "#002366" }}>
              ¿Prefieres hablar con un agente?
            </h2>
            <p className="text-gray-500 mb-6 text-sm md:text-base">
              Nuestro equipo está disponible para ayudarte a planificar tu viaje perfecto.
            </p>
            <a
              href="https://wa.me/34697797858?text=Hola%20Iberomundo%2C%20quiero%20información%20sobre%20vuelos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-base shadow-xl transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribir por WhatsApp
            </a>
            <p className="mt-4 text-gray-400 text-xs">+34 697 797 858 · Disponible de lunes a sábado</p>
          </section>
        </>
      )}

      {/* Footer */}
      <footer
        className="mt-auto py-6 text-center text-xs"
        style={{ backgroundColor: "#002366", color: "rgba(255,255,255,0.5)", borderTop: "2px solid #D4AF37" }}
      >
        <p>© {new Date().getFullYear()} Iberomundo Viajes · Todos los derechos reservados</p>
        <p className="mt-1">Precios en tiempo real vía Duffel · IVA incluido cuando corresponda</p>
      </footer>

      <WhatsappButton />

      <LeadModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        flight={selectedFlight}
        searchParams={searchParams}
      />
    </div>
  );
}
