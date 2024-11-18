'use client';

import { useEffect, useState, use } from 'react';
import api from '@/services/api';

interface Receivable {
    id: string;
    value: number;
    assignorId: string;
    emissionDate: string;
}

export default function ReceivableDetails({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {
    const resolvedParams = use(params);
    const [receivable, setReceivable] = useState<Receivable | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReceivable() {
            try {
                const response = await api.get(`/payable/${resolvedParams.slug}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('bankme_token')}`,
                    },
                });
                setReceivable(response.data);
            } catch (error) {
                console.error('Erro ao carregar recebível:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchReceivable();
    }, [resolvedParams.slug]);

    if (loading) return <div>Carregando...</div>;
    if (!receivable) return <div>Recebível não encontrado</div>;

    return (
        <div className="flex flex-col items-center h-screen p-4 sm:ml-64">
            <h1 className="text-2xl text-gray-900 font-bold mb-4">Detalhes do Recebível</h1>
            <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex gap-10 items-center flex-wrap justify-between">
                    <div className='flex flex-col text-gray-900'>
                        <strong className='text-gray-900'>ID</strong> {receivable.id}
                    </div>
                    <div className='flex flex-col text-gray-900'>
                        <strong className='text-gray-900'>Valor</strong> {receivable.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <div className='flex flex-col text-gray-900'>
                        <strong className='text-gray-900'>Cedente</strong> {receivable.assignorId}
                    </div>
                    <div className='flex flex-col text-gray-900'>
                        <strong className='text-gray-900'>Data de Emissão</strong> {String(receivable.emissionDate).split('T')[0].split('-').reverse().join('/')}
                    </div>
                </div>
            </div>
        </div>
    );
}