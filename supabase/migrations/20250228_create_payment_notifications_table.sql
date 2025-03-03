-- Crear tabla para almacenar las notificaciones de pago de Mercado Pago
CREATE TABLE IF NOT EXISTS "PaymentNotifications" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payment_id TEXT NOT NULL,
  product_id UUID REFERENCES "Product"(id),
  notification_type TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  payment_status_detail TEXT,
  notification_data JSONB NOT NULL,
  payment_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed BOOLEAN DEFAULT TRUE
);

-- Crear índices para mejorar el rendimiento de las consultas
CREATE INDEX IF NOT EXISTS idx_payment_notifications_payment_id ON "PaymentNotifications" (payment_id);
CREATE INDEX IF NOT EXISTS idx_payment_notifications_product_id ON "PaymentNotifications" (product_id);
CREATE INDEX IF NOT EXISTS idx_payment_notifications_payment_status ON "PaymentNotifications" (payment_status);

-- Añadir columnas necesarias a la tabla Product si no existen
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'payment_status') THEN
    ALTER TABLE "Product" ADD COLUMN payment_status TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'payment_status_detail') THEN
    ALTER TABLE "Product" ADD COLUMN payment_status_detail TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'payment_date') THEN
    ALTER TABLE "Product" ADD COLUMN payment_date TIMESTAMP WITH TIME ZONE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'last_updated') THEN
    ALTER TABLE "Product" ADD COLUMN last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END
$$; 