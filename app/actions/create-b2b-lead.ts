'use server'

interface B2BLeadData {
  nombre: string
  empresa: string
  email: string
  telefono: string
  prenda: string
  cantidad: string
  plazo: string
  mensaje: string
}

interface ShopifyCustomerResponse {
  customer?: {
    id: number
    email: string
    tags: string
  }
  errors?: Record<string, string | string[]> | string[]
}

/**
 * Crea un lead B2B en Shopify como cliente con etiquetas específicas
 * @param data Datos del formulario B2B
 * @returns ID del cliente creado o null si hay error
 */
export async function createB2BLead(data: B2BLeadData): Promise<{ success: boolean; customerId?: number; error?: string }> {
  try {
    // Validar datos requeridos
    if (!data.email || !data.nombre || !data.empresa) {
      return {
        success: false,
        error: 'Faltan datos requeridos: email, nombre y empresa son obligatorios'
      }
    }

    // Obtener configuración desde variables de entorno
    const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN || 'juanbecerra.co'
    const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

    if (!accessToken) {
      console.error('❌ SHOPIFY_ADMIN_ACCESS_TOKEN no está configurado')
      return {
        success: false,
        error: 'Error de configuración del servidor'
      }
    }

    // Separar nombre en first_name y last_name
    const nameParts = data.nombre.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || '-'

    // Formatear teléfono al formato internacional
    // Si ya tiene código de país (+XX), lo dejamos tal cual
    // Si no, asumimos que es Colombia (+57)
    let formattedPhone: string | undefined = undefined
    if (data.telefono && data.telefono.trim()) {
      let phone = data.telefono.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '')

      // Si ya empieza con +, dejarlo tal cual
      if (!phone.startsWith('+')) {
        // Si empieza con 57 y es suficientemente largo, quitar el 57
        if (phone.startsWith('57') && phone.length > 10) {
          phone = phone.substring(2)
        }
        // Agregar +57 si es un número colombiano
        phone = `+57${phone}`
      }

      formattedPhone = phone
    }

    // Fecha actual para el note
    const currentDate = new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Construir el payload para Shopify
    const payload = {
      customer: {
        first_name: firstName,
        last_name: lastName,
        email: data.email.toLowerCase().trim(),
        ...(formattedPhone && { phone: formattedPhone }),
        tags: 'Lead Mayorista, Sin Compra, Potencial, B2B, Landing Empresarial',
        note: `🏢 LEAD B2B DESDE LANDING EMPRESARIAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Empresa: ${data.empresa}
👤 Nombre: ${data.nombre}
📧 Email: ${data.email}
📱 Teléfono: ${data.telefono}

👕 Prenda de interés: ${data.prenda}
📊 Cantidad: ${data.cantidad}
⏰ Plazo: ${data.plazo}

💬 Mensaje adicional:
${data.mensaje || 'Sin mensaje adicional'}

📅 Fecha de captura: ${currentDate}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        accepts_marketing: true
      }
    }

    console.log('📤 Enviando lead a Shopify...', {
      email: data.email,
      empresa: data.empresa
    })

    // Hacer petición a Shopify Admin API
    const response = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/customers.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        body: JSON.stringify(payload)
      }
    )

    const responseData: ShopifyCustomerResponse = await response.json()

    // Manejar respuestas específicas
    if (response.status === 409) {
      console.log('⚠️ El email ya existe en Shopify')
      return {
        success: false,
        error: 'Este email ya está registrado. Te contactaremos pronto.'
      }
    }

    if (response.status === 401 || response.status === 403) {
      console.error('❌ Error de autenticación con Shopify')
      return {
        success: false,
        error: 'Error de configuración. Contacta al administrador.'
      }
    }

    if (response.status === 422) {
      console.error('❌ Error de validación Shopify 422:', responseData)
      // Extraer mensajes de error específicos
      const errors = responseData.errors
      const errorMsg = errors
        ? (Array.isArray(errors) ? errors.join('. ') : JSON.stringify(errors))
        : 'Datos inválidos. Por favor verifica tu información.'

      return {
        success: false,
        error: `Error en los datos: ${errorMsg}`
      }
    }

    if (!response.ok) {
      console.error('❌ Error de Shopify:', response.status, responseData)
      return {
        success: false,
        error: `Error al crear el lead: ${response.status}`
      }
    }

    // Éxito
    const customerId = responseData.customer?.id
    console.log('✅ Lead B2B creado exitosamente en Shopify')
    console.log(`   ID: ${customerId}`)
    console.log(`   Email: ${data.email}`)
    console.log(`   Empresa: ${data.empresa}`)

    // Opcional: Revalidar caché si tienes una página de leads
    // revalidatePath('/admin/leads')

    return {
      success: true,
      customerId
    }

  } catch (error) {
    console.error('❌ Error al crear lead B2B:', error)
    return {
      success: false,
      error: 'Error al procesar tu solicitud. Por favor intenta nuevamente.'
    }
  }
}

/**
 * Versión alternativa que actualiza el cliente si ya existe
 */
export async function createOrUpdateB2BLead(data: B2BLeadData): Promise<{ success: boolean; customerId?: number; error?: string }> {
  try {
    const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN || 'juanbecerra.co'
    const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

    // Primero buscar si el cliente ya existe
    const searchResponse = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/customers/search.json?query=email:${encodeURIComponent(data.email)}`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken
        }
      }
    )

    const searchData = await searchResponse.json()

    if (searchData.customers && searchData.customers.length > 0) {
      // Cliente existe, actualizar tags
      const existingCustomer = searchData.customers[0]
      const existingTags = existingCustomer.tags || ''

      // Agregar nuevos tags si no existen
      const newTags = ['Lead Mayorista', 'Potencial', 'B2B', 'Re-contacto']
      const updatedTags = existingTags.split(', ')
        .filter((tag: string) => tag)
        .concat(newTags.filter(tag => !existingTags.includes(tag)))
        .join(', ')

      // Actualizar cliente
      const updatePayload = {
        customer: {
          id: existingCustomer.id,
          tags: updatedTags,
          note: `${existingCustomer.note || ''}\n\n🔄 NUEVA CONSULTA (${new Date().toLocaleDateString('es-CO')})\n${data.mensaje}`
        }
      }

      await fetch(
        `https://${shopifyDomain}/admin/api/2024-01/customers/${existingCustomer.id}.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
          },
          body: JSON.stringify(updatePayload)
        }
      )

      console.log('✅ Cliente B2B actualizado')

      return {
        success: true,
        customerId: existingCustomer.id
      }
    }

    // Cliente no existe, crear nuevo
    return await createB2BLead(data)

  } catch (error) {
    console.error('❌ Error en createOrUpdateB2BLead:', error)
    return {
      success: false,
      error: 'Error al procesar tu solicitud'
    }
  }
}
