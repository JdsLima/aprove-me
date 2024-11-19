'use client';

import { Assignors, validateReceivableForm } from "@/app/home/register-receivables/page";
import { ReceivableForm } from "@/app/home/register-receivables/page";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CustomToast } from "@/components/CustomToast";
import api from "@/services/api";
import { Datepicker } from "flowbite-react";
import { Formik } from "formik";
import { use, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

interface Receivable {
    id: string;
    value: number;
    assignorId: string;
    emissionDate: string;
}

export default function EditReceivable({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const resolvedParams = use(params);
    const [receivable, setReceivable] = useState<Receivable | null>(null);
    const [loading, setLoading] = useState(true);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [assignors, setAssignors] = useState<Assignors[]>([]);

    const handleSubmit = async (values: ReceivableForm) => {
        try {
            const response = await api.patch(`/payable/${resolvedParams.slug}`, values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('bankme_token')}`,
                },
            });

            if (response.status === 200) {
                setIsToastOpen(true);
            }
        } catch (error) {
            console.error('Error registering receivable:', error);
        }
    }

    const fetchAssignors = async () => {
        try {
            const response = await api.get('/assignor', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('bankme_token')}`,
                },
            });
            setAssignors(response.data);
        } catch (error) {
            console.error('Error fetching assignors:', error);
        }
    };

    useEffect(() => {
        fetchAssignors();
    }, []);

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
        <div className="flex flex-col min-h-screen p-4 sm:ml-64">
            <Breadcrumb 
                routes={[{
                    name: "Cadastrar pagáveis", 
                    href: "/home/register-receivables"
                }]} 
            />

            <div className="flex flex-col justify-center items-center">
                <p className="text-2xl pt-6 text-gray-900 font-bold">
                    Cadastrar pagáveis
                </p>
            </div>

            <div className="flex flex-col justify-center items-center pt-6">
                <div className="w-full max-w-2xl">
                    <Formik 
                        initialValues={receivable} 
                        onSubmit={handleSubmit}
                        validate={validateReceivableForm}
                    >
                        {({
                            values, 
                            handleChange, 
                            handleSubmit, 
                            setFieldValue,
                            errors
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label 
                                        htmlFor="value" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Valor
                                    </label>
                                    <NumericFormat
                                        id="value"
                                        name="value"
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        prefix="R$ "
                                        decimalScale={2}
                                        fixedDecimalScale
                                        allowNegative={false}
                                        value={values.value}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required
                                        onValueChange={(values) => {
                                            setFieldValue("value", values.floatValue ?? 0);
                                        }}
                                    />
                                    {errors.value && (
                                        <p className="text-red-500 text-sm">{errors.value}</p>
                                    )}
                                </div>

                                <div className="mb-5">
                                    <label 
                                        htmlFor="emissionDate" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Data de emissão
                                    </label>
                                    <Datepicker 
                                        id="emissionDate"
                                        language="pt-BR"
                                        className="bg-gray-50"
                                        value={new Date(values.emissionDate)}
                                        onChange={(date) => {
                                            setFieldValue(
                                                "emissionDate", 
                                                date?.toISOString() ?? new Date().toISOString()
                                            );
                                        }}
                                    />
                                    {errors.emissionDate && (
                                        <p className="text-red-500 text-sm">{errors.emissionDate}</p>
                                    )}
                                </div>

                                <div className="mb-5">
                                    <label 
                                        htmlFor="assignor" 
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Cedente
                                    </label>
                                    <select
                                        id="assignorId" 
                                        name="assignorId"
                                        value={values.assignorId}
                                        onChange={handleChange}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required
                                    >
                                        <option value="">Selecione um cedente</option>
                                        {assignors.map((assignor) => (
                                            <option key={assignor.id} value={assignor.id}>
                                                {assignor.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.assignorId && (
                                        <p className="text-red-500 text-sm">{errors.assignorId}</p>
                                    )}
                                </div>

                                <div className="flex justify-center">
                                    <button 
                                        type="submit" 
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Atualizar
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>

            <CustomToast 
                title="Sucesso" 
                text="Pagável atualizado com sucesso" 
                isOpen={isToastOpen} 
                onClose={() => setIsToastOpen(false)} 
            />
        </div>
    );
}