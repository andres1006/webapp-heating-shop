# Configuración de Supabase para la aplicación

## Solución al error de RLS (Row-Level Security)

Si estás experimentando el error:

```
new row violates row-level security policy for table "Product"
```

Esto significa que las políticas de seguridad a nivel de fila (RLS) están impidiendo la inserción de nuevos registros en la tabla "Product".

### Opción 1: Ejecutar la función SQL en la consola de Supabase

1. Inicia sesión en tu panel de control de Supabase
2. Ve a la sección "SQL Editor"
3. Crea un nuevo script
4. Copia y pega el contenido del archivo `supabase/migrations/create_product_function.sql`
5. Ejecuta el script

Esta función permite insertar productos sin restricciones de RLS utilizando el enfoque SECURITY DEFINER.

### Opción 2: Configurar políticas RLS adecuadas

Si prefieres mantener RLS activo (recomendado para producción), puedes configurar políticas que permitan a los usuarios insertar sus propios productos:

1. Ve a la sección "Authentication" > "Policies" en el panel de Supabase
2. Selecciona la tabla "Product"
3. Crea una nueva política para INSERT con la siguiente condición:

```sql
(auth.uid() = "Id_user")
```

Esta política permitirá a los usuarios insertar productos solo si el Id_user coincide con su propio ID de autenticación.

### Opción 3: Desactivar RLS temporalmente (solo para desarrollo)

⚠️ **ADVERTENCIA**: Esta opción NO es recomendada para entornos de producción.

1. Ve a la sección "Table Editor" en el panel de Supabase
2. Selecciona la tabla "Product"
3. Ve a la pestaña "Policies"
4. Desactiva RLS para la tabla

## Estructura de la tabla Product

La tabla Product debe tener la siguiente estructura:

```sql
CREATE TABLE "Product" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "windowType" TEXT NOT NULL,
  "windowSize" TEXT NOT NULL,
  "paymentType" TEXT NOT NULL,
  "price" NUMERIC NOT NULL,
  "status" TEXT NOT NULL,
  "link_payment" TEXT,
  "Id_user" UUID REFERENCES auth.users(id),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Uso de la función RPC

La función `create_product` puede ser llamada desde el código de la siguiente manera:

```typescript
const { data, error } = await supabase.rpc('create_product', {
  p_window_type: 'tipo_ventana',
  p_window_size: 'tamaño_ventana',
  p_payment_type: 'tipo_pago',
  p_price: 9999,
  p_status: 'pendiente',
  p_link_payment: 'url_pago',
  p_id_user: 'id_usuario'
})
```
