// components/QuestionForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
    kondisi_tanah: string;
    beban_struktural: string;
}

export default function QuestionForm() {
    const [formData, setFormData] = useState<FormData>({
        kondisi_tanah: '',
        beban_struktural: ''
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/result?kondisi_tanah=${formData.kondisi_tanah}&beban_struktural=${formData.beban_struktural}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Kondisi Tanah:</label>
            <select name="kondisi_tanah" onChange={handleChange} required>
                <option value="">Pilih Kondisi Tanah</option>
                <option value="berpasir">Berpasir</option>
                <option value="berlumpur">Berlumpur</option>
            </select>

            <label>Beban Struktural:</label>
            <select name="beban_struktural" onChange={handleChange} required>
                <option value="">Pilih Beban Struktural</option>
                <option value="rendah">Rendah</option>
                <option value="tinggi">Tinggi</option>
            </select>

            <button type="submit">Dapatkan Rekomendasi</button>
        </form>
    );
}
