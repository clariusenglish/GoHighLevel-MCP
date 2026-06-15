import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { ghlGet } from "@/lib/ghl";

const LOC = () => process.env.GHL_LOCATION_ID;
const ok = (data: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] });

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "get_location_info",
      {
        description: "Devuelve la informacion de la subcuenta (location) de GoHighLevel. Sirve para verificar la conexion.",
        inputSchema: {},
      },
      async () => ok(await ghlGet(`/locations/${LOC()}`))
    );

    server.registerTool(
      "search_contacts",
      {
        description: "Busca contactos en GoHighLevel por texto (nombre, email o telefono).",
        inputSchema: {
          query: z.string().optional(),
          limit: z.number().int().min(1).max(100).optional(),
        },
      },
      async ({ query, limit }) =>
        ok(await ghlGet(`/contacts/`, { locationId: LOC(), query, limit: limit ?? 20 }))
    );

    server.registerTool(
      "list_pipelines",
      {
        description: "Lista todos los pipelines de oportunidades y sus stages (incluye sus IDs).",
        inputSchema: {},
      },
      async () => ok(await ghlGet(`/opportunities/pipelines`, { locationId: LOC() }))
    );

    server.registerTool(
      "search_opportunities",
      {
        description: "Busca oportunidades (leads en el pipeline). Filtra por pipeline, stage o texto.",
        inputSchema: {
          pipelineId: z.string().optional(),
          stageId: z.string().optional(),
          query: z.string().optional(),
          limit: z.number().int().min(1).max(100).optional(),
        },
      },
      async ({ pipelineId, stageId, query, limit }) =>
        ok(
          await ghlGet(`/opportunities/search`, {
            location_id: LOC(),
            pipeline_id: pipelineId,
            pipeline_stage_id: stageId,
            q: query,
            limit: limit ?? 20,
          })
        )
    );

    server.registerTool(
      "search_conversations",
      {
        description: "Busca conversaciones (WhatsApp, SMS, email) en GoHighLevel.",
        inputSchema: {
          query: z.string().optional(),
          limit: z.number().int().min(1).max(100).optional(),
        },
      },
      async ({ query, limit }) =>
        ok(await ghlGet(`/conversations/search`, { locationId: LOC(), query, limit: limit ?? 20 }))
    );

    server.registerTool(
      "list_calendars",
      {
        description: "Lista los calendarios de la subcuenta.",
        inputSchema: {},
      },
      async () => ok(await ghlGet(`/calendars/`, { locationId: LOC() }))
    );
  },
  {},
  { basePath: "/api", maxDuration: 60, verboseLogs: true }
);

export { handler as GET, handler as POST, handler as DELETE };
export const maxDuration = 60;
