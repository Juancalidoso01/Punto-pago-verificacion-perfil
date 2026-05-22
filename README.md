# Punto Pago — verificación / cambio de perfil (widget)

Next.js 15 (App Router) + React 19 + Tailwind 4. Incluye el flujo embebible en **`/embed`**, guía paso a paso y documentación técnica de integración.

## Desarrollo local

```bash
npm install
npm run dev
```

- Sitio con chrome: [http://localhost:3000](http://localhost:3000)  
- Embed (iframe): [http://localhost:3000/embed](http://localhost:3000/embed)  
- Guía e **documentación para backend / handoff**: [http://localhost:3000/guia/integracion-backend](http://localhost:3000/guia/integracion-backend)

```bash
npm run build   # compilación de producción
npm run start   # sirve el build
```

## Variables de entorno (públicas)

Definir en `.env.local` o en el proveedor de despliegue. Los valores por defecto de Mati en código son solo de demo; en producción usá los de **vuestra** cuenta MetaMap.

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_METAMAP_CLIENT_ID` | `clientid` del web button (visible en el cliente). |
| `NEXT_PUBLIC_METAMAP_FLOW_ID` | `flowId` del flujo Mati (visible en el cliente). |
| `NEXT_PUBLIC_METAMAP_IDENTITY_ID` | Opcional, **solo pruebas**: identidad fija; en real el `identityId` debe venir del backend vía query `?identityId=…`. |

| `MATI_CLIENT_SECRET` | **Solo servidor.** Crea `identityId` al entrar al paso Mati para pruebas con selfie real (`POST /api/metamap/ensure-identity`). Sin esto, el flujo ofrece simulación o `?identityId=…` manual. |

Los **secretos** de API Mati no deben commitearse. En Vercel: **Settings → Environment Variables** → `MATI_CLIENT_SECRET` (y opcionalmente las `NEXT_PUBLIC_*`).

## Webhooks MetaMap (solo pruebas internas)

Desactivados por defecto; no cambian el flujo del widget (verificar u omitir sigue igual).

1. En Vercel: `METAMAP_WEBHOOK_ENABLED=true` y `METAMAP_WEBHOOK_SECRET` (el mismo que configurás en MetaMap → Integration → Webhooks).
2. URL del webhook: `https://<tu-deploy>/api/metamap/webhook`
3. Guía interna: [/guia/webhooks-prueba](http://localhost:3000/guia/webhooks-prueba) (listado en memoria en local; en Vercel usá logs con filtro `metamap-webhook` o `METAMAP_WEBHOOK_DEBUG_TOKEN`).

Especificación: [Webhook specifications](https://docs.metamap.com/docs/webhook-specifications).

## Pasar el proyecto a otro equipo

1. **Código**: acceso al repositorio o archivo acordado.  
2. **Despliegue**: URL pública de `/embed` (staging y producción).  
3. **Mati**: credenciales de cuenta, `clientId` / `flowId` públicos y claves de API en servidor.  
4. **Contrato**: eventos `postMessage` y códigos de error — ver la página **Integración backend** en la guía (también en `/embed/guia/integracion-backend`).

Quien ajuste **diseño dentro del iframe** debe trabajar en **este** repositorio (componentes y estilos). Quien integre en el portal del banco suele encargarse del **HTML del contenedor**, la **URL del iframe** y la escucha de mensajes.

## Más documentación

- Plantilla Next.js: [nextjs.org/docs](https://nextjs.org/docs)
