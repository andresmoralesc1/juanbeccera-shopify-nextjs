# Configuración de Leads B2B con Shopify

Esta integración permite capturar leads B2B desde la landing empresarial y guardarlos directamente en Shopify como clientes con etiquetas especiales.

## 📋 Resumen de la Solución

- **Frontend:** Formulario en landing `/empresarial-juan-becerra`
- **Backend:** Server Action de Next.js 15 (`app/actions/create-b2b-lead.ts`)
- **CRM:** Shopify Customers API
- **Seguridad:** Token nunca se expone al cliente

---

## 🔧 Configuración Paso a Paso

### 1. Crear App Custom en Shopify

1. Ve a **Shopify Admin** → **Apps** → **Develop apps**
2. Clic en **"Create an app"**
3. Nombre: `B2B Leads Integration`
4. Email del desarrollador: tu email
5. Clic en **"Create app"**

### 2. Configurar Permisos (Admin API Access)

En la sección **Configure Admin API access scopes**:

```
✅ customers: read
✅ customers: write
```

### 3. Instalar la App

1. Clic en **"Install app"** en la esquina superior derecha
2. Clic en **"Reveal token once"** (¡solo aparece una vez!)
3. Copia el **Admin API access token** que comienza con `shpat_`

### 4. Configurar Variables de Entorno

En tu archivo `.env.local` (o en Vercel Environment Variables):

```bash
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SHOPIFY_STORE_DOMAIN=juanbecerra.co
```

**IMPORTANTE:** Nunca commit el archivo `.env.local` a git.

### 5. Configurar Metafields (Opcional pero Recomendado)

Para almacenar datos B2B adicionales, crea metafields en Shopify:

1. **Admin** → **Settings** → **Custom data** → **Customers**
2. Clic en **"Add definition"**
3. Crear los siguientes metafields:

```
Namespace: b2b_leads

Key: empresa
Type: Single line text
Description: Nombre de la empresa del lead B2B

Key: volumen_esperado
Type: Single line text
Description: Cantidad esperada de prendas

Key: prenda_interes
Type: Single line text
Description: Tipo de prenda de interés

Key: plazo_requerido
Type: Single line text
Description: Plazo de entrega requerido

Key: fecha_captura
Type: Single line text
Description: Fecha de captura del lead

Key: origen
Type: Single line text
Description: Origen del lead (ej: landing-empresarial)
```

---

## 📊 Cómo Ver los Leads en Shopify

### Método 1: Filtrar por Tags

1. **Admin** → **Customers**
2. En el buscador, escribe: `tag:Lead Mayorista`
3. Verás todos los leads B2B

### Método 2: Segmentos (Más Profesional)

1. **Admin** → **Customers** → **Segments** → **Create segment**
2. Nombre: `Leads B2B Pendientes`
3. Condición: `Customer tags` contains `Lead Mayorista`
4. Guardar

Ahora tendrás un segmento automático que siempre se actualiza.

---

## 🎯 Estructura de Datos en Shopify

### Campos del Cliente

```
Nombre:
├─ first_name: Primer nombre
├─ last_name: Apellido

Contacto:
├─ email: email@empresa.com
└─ phone: +57 300 123 4567

Tags: "Lead Mayorista, Sin Compra, Potencial, B2B, Landing Empresarial"

Note: Contiene toda la información del formulario formateada

Metafields (namespace: b2b_leads):
├─ empresa: "Mi Empresa SAS"
├─ volumen_esperado: "51-100"
├─ prenda_interes: "camisetas"
├─ plazo_requerido: "2-4 semanas"
├─ fecha_captura: "2026-02-25T10:30:00Z"
└─ origen: "landing-empresarial"
```

---

## ✅ Testing

### Prueba Local

1. Configura `.env.local` con el token
2. Reinicia el servidor: `npm run dev`
3. Ve a `/empresarial-juan-becerra`
4. Llena el formulario con datos de prueba
5. Revisa la consola del servidor para ver el logging
6. Verifica en Shopify Admin → Customers

### Logs de Éxito

```
📤 Enviando lead a Shopify... { email: 'test@empresa.co', empresa: 'Test SAS' }
✅ Lead B2B creado exitosamente en Shopify
   ID: 1234567890123
   Email: test@empresa.co
   Empresa: Test SAS
```

### Logs de Error

```
❌ SHOPIFY_ADMIN_ACCESS_TOKEN no está configurado
❌ Error de autenticación con Shopify
⚠️ El email ya existe en Shopify
```

---

## 🔐 Seguridad

### ✅ Buenas Prácticas Implementadas

- ✅ Server Actions (código nunca va al cliente)
- ✅ Token en variables de entorno
- ✅ Validación de datos antes de enviar
- ✅ Manejo de errores específicos (409, 401, 403)
- ✅ Sanitización de emails (toLowerCase, trim)

### ⚠️ Precauciones

- Nunca hacer el fetch desde un componente cliente
- Nunca commitear el `.env.local`
- Rotar el token si se compromete
- Usar tokens de app custom, no de terceros

---

## 🚀 Mejoras Futuras

### Opcionales de Implementar:

1. **Automatizar respuesta de email**
   - Usar Shopify Customer Account invitation
   - O integrar con SendGrid/Resend

2. **Enviar notificación a Slack**
   - Webhook cuando llega un lead B2B
   - Canal #leads-ventas

3. **Integrar con WhatsApp Business API**
   - Mensaje automático al cliente
   - "Gracias por tu interés, te contactaremos en menos de 24h"

4. **Dashboard de Leads**
   - Página `/admin/leads` en Next.js
   - Ver leads convertidos vs pendientes

5. **Scoring de Leads**
   - Puntuar según volumen, plazo, tipo de prenda
   - Priorizar follow-up

---

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs del servidor (consola donde corre `npm run dev`)
2. Verifica que el token sea correcto
3. Confirma que la app tenga los permisos necesarios
4. Verifica que el dominio de Shopify sea correcto

---

## 📄 Archivos Relacionados

- `app/actions/create-b2b-lead.ts` - Server action principal
- `components/custom/FormularioContactoB2B.tsx` - Formulario frontend
- `.env.local` - Variables de entorno (no commit)
- `.env.example` - Plantilla de variables
