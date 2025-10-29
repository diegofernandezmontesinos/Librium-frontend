import { useState } from "react";
import axios from "axios";
import { useAuthStorage } from "@/hooks/useAuthCookies";

interface Props {
  user: any;
  onUserUpdate: (data: any) => void;
}

const EditProfileForm: React.FC<Props> = ({ user, onUserUpdate }) => {
  const { getAuth } = useAuthStorage();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar || "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const auth = getAuth();
      const res = await axios.patch("http://backend:4000/users/me", form, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      onUserUpdate(res.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error("Error updating profile", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <label className="block text-sm font-semibold mb-1">Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Avatar URL</label>
        <input
          name="avatar"
          value={form.avatar}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700 text-white"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg w-full font-semibold"
      >
        {saving ? "Guardando..." : "Guardar cambios"}
      </button>

      {success && <p className="text-emerald-400 text-center">¡Perfil actualizado!</p>}
    </form>
  );
};

export default EditProfileForm;
