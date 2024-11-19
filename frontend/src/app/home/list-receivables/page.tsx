'use client';

import { Breadcrumb } from "@/components/Breadcrumb";
import api from "@/services/api";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Receivable {
    id: string;
    value: number;
    assignorId: string;
    emissionDate: string;
}

export default function ListReceivables() {
    const [receivables, setReceivables] = useState<Receivable[]>([]);

    async function handleDelete(id: string) {
        const response = await api.delete(`/payable/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('bankme_token')}`,
            },
        });

        if (response.status === 200) {
            alert('Recebível excluído com sucesso');
            setReceivables(receivables.filter((receivable) => receivable.id !== id));
        } else {
            alert('Erro ao excluir recebível');
        }
    }

    useEffect(() => {
        async function fetchReceivable() {
            try {
                const response = await api.get(`/payable`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('bankme_token')}`,
                    },
                });
                console.log('response');
                console.log(response.data);
                setReceivables(response.data);
            } catch (error) {
                console.error('Erro ao carregar recebível:', error);
            } finally {
            }
        }

        fetchReceivable();
    }, []);

    if (!receivables) return <div>Nenhum recebível encontrado</div>;

    return (
        <div className="flex flex-col min-h-screen p-4 sm:ml-64">
            <Breadcrumb 
                routes={[
                    {
                        name: "Listar pagáveis", 
                        href: "/home/list-receivables"
                    }
                ]} 
            />
            
            <div className="flex flex-col justify-center items-center pt-6">
                <h1 className="text-2xl text-gray-900 font-bold mb-4">
                    Listar pagáveis
                </h1>
            </div>

            <ul className="w-full flex flex-col gap-4">
                {receivables.map((receivable) => (
                    <li key={receivable.id}>
                        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className="flex gap-10 items-center flex-wrap justify-between">
                            <div className="flex flex-col text-gray-900">
                                <strong className="text-gray-900">ID</strong> 
                                {receivable.id}
                            </div>
                            
                            <div className="flex flex-col text-gray-900">
                                <strong className="text-gray-900">Valor</strong> 
                                {receivable.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            
                            <div className="flex flex-col text-gray-900">
                                <strong className="text-gray-900">Data de Emissão</strong> 
                                {receivable.emissionDate.split('T')[0].split('-').reverse().join('/')}
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end gap-4 pt-8">
                            <Link className="sm:w-auto w-full" href={`/home/list-receivables/details/${receivable.id}`}>
                                <Button className="bg-blue-500 sm:w-auto w-full hover:bg-blue-700">
                                    Ver detalhes
                                </Button>
                            </Link>
                            <Link className="sm:w-auto w-full" href={`/home/list-receivables/edit/${receivable.id}`}>
                                <Button className="bg-green-500 sm:w-auto w-full hover:bg-green-700">
                                    Editar
                                </Button>
                            </Link>
                            <div className="sm:w-auto w-full" onClick={() => handleDelete(receivable.id)}>
                                <Button className="bg-red-500 sm:w-auto w-full hover:bg-red-700">
                                    Excluir
                                </Button>
                            </div>
                        </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}