import { FC } from 'react';

interface UserFormProps {
  onSubmit: (data: { name: string; email: string; phone: string }) => void;
}

const UserForm: FC<UserFormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-lg bg-gray-50 mb-8">
      <h2 className="text-xl font-semibold mb-4">Datos del Usuario</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input type="text" name="name" className="border border-gray-300 rounded px-4 py-2 w-full" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Correo Electrónico</label>
        <input type="email" name="email" className="border border-gray-300 rounded px-4 py-2 w-full" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Teléfono</label>
        <input type="tel" name="phone" className="border border-gray-300 rounded px-4 py-2 w-full" required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Guardar
      </button>
    </form>
  );
};

export default UserForm;
