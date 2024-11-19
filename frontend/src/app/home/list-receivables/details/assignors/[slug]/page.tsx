'use client';

import { use } from "react";

import api from "@/services/api";
import { useEffect, useState } from "react";

interface Assignor {
    id: string;
    document: string;
    email: string;
    phone: string;
    name: string;
}

export default function AssignorDetails({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {
    const resolvedParams = use(params);
    const [assignor, setAssignor] = useState<Assignor | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAssignor() {
            try {
                const response = await api.get(`/assignor/${resolvedParams.slug}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('bankme_token')}`,
                    },
                });
                setAssignor(response.data);
            } catch (error) {
                console.error('Erro ao carregar recebível:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchAssignor();
    }, [resolvedParams.slug]);

    if (loading) return <div>Carregando...</div>;
    if (!assignor) return <div>Recebível não encontrado</div>;

    return (
        <div className="flex flex-col items-center h-screen p-4 sm:ml-64">
            <h1 className="text-2xl text-gray-900 font-bold mb-4">Detalhes do Recebível</h1>
            <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex gap-10 items-center flex-wrap justify-between">
                    <div className='flex flex-col text-gray-900'>
                        <strong className='text-gray-900'>ID</strong> {assignor.id}
                    </div>
                    <div className='flex flex-col text-gray-900'>
                        <strong className='text-gray-900'>Documento</strong> {assignor.document}
                    </div>
                    <div className='flex flex-col text-gray-900'>
                        <strong className='text-gray-900'>Nome</strong> {assignor.name}
                    </div>
                    <div className='flex flex-col text-gray-900'>
                        <strong className='text-gray-900'>Email</strong> {assignor.email}
                    </div>
                    <div className='flex flex-col text-gray-900'>
                        <strong className='text-gray-900'>Telefone</strong> {assignor.phone}
                    </div>
                </div>
            </div>
        </div>
    );
}