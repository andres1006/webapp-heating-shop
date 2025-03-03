-- Crear tabla de técnicos
CREATE TABLE IF NOT EXISTS "Technicians" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  specialization TEXT[] DEFAULT '{}',
  experience_level TEXT CHECK (experience_level IN ('junior', 'mid', 'senior')),
  rating NUMERIC DEFAULT 5.0,
  location TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  current_assignment UUID REFERENCES "Product"(id),
  last_assignment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de despachos
CREATE TABLE IF NOT EXISTS "Dispatches" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES "Product"(id),
  technician_id UUID NOT NULL REFERENCES "Technicians"(id),
  status TEXT NOT NULL CHECK (status IN ('assigned', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  estimated_date TIMESTAMP WITH TIME ZONE,
  actual_date TIMESTAMP WITH TIME ZONE,
  completion_date TIMESTAMP WITH TIME ZONE,
  dispatch_notes TEXT,
  special_requirements TEXT,
  tools_required TEXT[],
  technician_notes TEXT,
  client_signature TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de notificaciones para técnicos
CREATE TABLE IF NOT EXISTS "TechnicianNotifications" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  technician_id UUID NOT NULL REFERENCES "Technicians"(id),
  product_id UUID REFERENCES "Product"(id),
  notification_type TEXT NOT NULL,
  notification_data JSONB NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de dispositivos de técnicos para notificaciones push
CREATE TABLE IF NOT EXISTS "TechnicianDevices" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  technician_id UUID NOT NULL REFERENCES "Technicians"(id),
  device_token TEXT,
  player_id TEXT,
  device_type TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Añadir columnas necesarias a la tabla Product si no existen
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'dispatch_status') THEN
    ALTER TABLE "Product" ADD COLUMN dispatch_status TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'dispatch_date') THEN
    ALTER TABLE "Product" ADD COLUMN dispatch_date TIMESTAMP WITH TIME ZONE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'estimated_installation_date') THEN
    ALTER TABLE "Product" ADD COLUMN estimated_installation_date TIMESTAMP WITH TIME ZONE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Product' AND column_name = 'actual_installation_date') THEN
    ALTER TABLE "Product" ADD COLUMN actual_installation_date TIMESTAMP WITH TIME ZONE;
  END IF;
END
$$;

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_dispatches_product_id ON "Dispatches" (product_id);
CREATE INDEX IF NOT EXISTS idx_dispatches_technician_id ON "Dispatches" (technician_id);
CREATE INDEX IF NOT EXISTS idx_dispatches_status ON "Dispatches" (status);
CREATE INDEX IF NOT EXISTS idx_technician_notifications_technician_id ON "TechnicianNotifications" (technician_id);
CREATE INDEX IF NOT EXISTS idx_technician_devices_technician_id ON "TechnicianDevices" (technician_id);

-- Insertar algunos técnicos de ejemplo
INSERT INTO "Technicians" (name, email, phone, specialization, experience_level, location)
VALUES
  ('Carlos Rodríguez', 'carlos.rodriguez@example.com', '5551234567', ARRAY['aire_acondicionado', 'ventanas'], 'senior', 'Ciudad de México'),
  ('Ana Martínez', 'ana.martinez@example.com', '5559876543', ARRAY['aire_acondicionado'], 'mid', 'Ciudad de México'),
  ('Miguel López', 'miguel.lopez@example.com', '5552345678', ARRAY['aire_acondicionado', 'electricidad'], 'junior', 'Ciudad de México')
ON CONFLICT (email) DO NOTHING; 