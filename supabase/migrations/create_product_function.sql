-- Función para crear productos sin restricciones de RLS
CREATE OR REPLACE FUNCTION create_product(
  p_window_type TEXT,
  p_window_size TEXT,
  p_payment_type TEXT,
  p_price NUMERIC,
  p_status TEXT,
  p_link_payment TEXT,
  p_id_user UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Esto hace que la función se ejecute con los privilegios del creador
AS $$
DECLARE
  new_product JSONB;
BEGIN
  -- Verificar que el usuario existe
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_id_user) THEN
    RAISE EXCEPTION 'Usuario no encontrado';
  END IF;

  -- Insertar el producto con SECURITY DEFINER para evitar RLS
  INSERT INTO "Product" (
    "windowType",
    "windowSize",
    "paymentType",
    "price",
    "status",
    "link_payment",
    "Id_user",
    "created_at"
  )
  VALUES (
    p_window_type,
    p_window_size,
    p_payment_type,
    p_price,
    p_status,
    p_link_payment,
    p_id_user,
    NOW()
  )
  RETURNING to_jsonb("Product".*) INTO new_product;

  RETURN new_product;
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'error', SQLERRM,
      'error_code', SQLSTATE
    );
END;
$$;

-- Otorgar permisos para ejecutar la función
GRANT EXECUTE ON FUNCTION create_product TO authenticated;
GRANT EXECUTE ON FUNCTION create_product TO anon;
GRANT EXECUTE ON FUNCTION create_product TO service_role; 