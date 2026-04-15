import React from "react";
import { useListLeads } from "@workspace/api-client-react";

export default function Admin() {
  const { data: leads, isLoading, error } = useListLeads();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">Admin Dashboard - Leads</h1>
        
        {isLoading && <p>Cargando leads...</p>}
        {error && <p className="text-destructive">Error al cargar leads.</p>}
        
        {leads && leads.length > 0 ? (
          <div className="bg-card rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-left">WhatsApp</th>
                  <th className="px-6 py-3 text-left">Detalles de Vuelo</th>
                  <th className="px-6 py-3 text-left">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4">{lead.fullName}</td>
                    <td className="px-6 py-4">{lead.whatsapp}</td>
                    <td className="px-6 py-4 max-w-xs truncate" title={lead.flightDetails}>{lead.flightDetails}</td>
                    <td className="px-6 py-4">{new Date(lead.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !isLoading && <p>No hay leads registrados todavía.</p>
        )}
      </div>
    </div>
  );
}
