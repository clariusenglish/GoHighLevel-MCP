# Clarius GHL MCP

Servidor MCP (Model Context Protocol) para GoHighLevel, hecho para Vercel.
Transporte: **Streamable HTTP** (lo que Claude usa). Sin Redis. Solo lectura.

## Endpoint del connector
Una vez desplegado en Vercel:
```
https://TU-PROYECTO.vercel.app/api/mcp
```

## Tools (read-only)
- get_location_info  – verifica conexion
- search_contacts    – buscar contactos
- list_pipelines     – pipelines y stages (con sus IDs)
- search_opportunities – leads en el pipeline (filtra por pipeline/stage/texto)
- search_conversations – WhatsApp / SMS / email
- list_calendars     – calendarios

## Variables de entorno (Vercel → Settings → Environment Variables)
| Variable | Valor |
|---|---|
| `GHL_API_KEY` | Tu Private Integration Token (PIT) de GHL |
| `GHL_LOCATION_ID` | NWPwzr9Pg35ursAb07DQ |
| `GHL_BASE_URL` | https://services.leadconnectorhq.com (opcional, ya es default) |

## Deploy
1. Sube esta carpeta a un repo de GitHub nuevo (ej. `clariusenglish/clarius-ghl-mcp`).
2. Vercel → Add New → Project → importa el repo (detecta Next.js solo).
3. Agrega las 2 variables de arriba.
4. Deploy.
5. En Claude → Settings → Connectors → Add custom connector → URL = `https://TU-PROYECTO.vercel.app/api/mcp`

## Seguridad
La URL es publica (authless). Manten la URL privada. Para endurecer mas adelante:
activar Vercel Deployment Protection o agregar validacion de token.
