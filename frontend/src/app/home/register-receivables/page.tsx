"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Formik } from "formik";
import { NumericFormat } from 'react-number-format';
import { Datepicker } from 'flowbite-react';
import { useState } from "react";

type ReceivableForm = {
    value: number;
    assignor: string;
    emissionDate: string;
}

export default function RegisterReceivables() {
    const [receivableForm, setReceivableForm] = useState<ReceivableForm>({
        value: 0, 
        assignor: "", 
        emissionDate: new Date().toISOString()
    });

    const handleSubmit = (values: ReceivableForm) => {
        console.log(values);
    }

    const validateReceivableForm = (values: ReceivableForm) => {
        const errors: { [key in keyof ReceivableForm]?: string } = {};

        if (!values.value) {
            errors.value = "O valor é obrigatório";
        }
        if (!values.assignor) {
            errors.assignor = "O cedente é obrigatório";
        }
        if (!values.emissionDate) {
            errors.emissionDate = "A data de emissão é obrigatória";
        }
        return errors;
    }

    return (
        <div className="flex flex-col h-screen p-4 sm:ml-64">
        <Breadcrumb routes={[{name: "Cadastrar pagáveis", href: "/home/register-receivables"}]} />
        <div className="flex flex-col justify-center items-center">
            <p className="text-2xl pt-6 text-gray-900 font-bold">Cadastrar pagáveis</p>
        </div>
        <div className="flex flex-col justify-center items-center pt-6">
            <div className="w-full max-w-2xl">
                <Formik 
                    initialValues={receivableForm} 
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
                                {errors.value && <p className="text-red-500 text-sm">{errors.value}</p>}
                            </div>
                            <div className="mb-5">
                                <label 
                                    htmlFor="dueDate" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Data de emissão
                                </label>
                                <Datepicker 
                                    id="dueDate"
                                    language="pt-BR"
                                    className="bg-gray-50"
                                    value={new Date(values.emissionDate)}
                                    onChange={(date) => {
                                        setReceivableForm({
                                            ...receivableForm,
                                            emissionDate: date?.toISOString() ?? new Date().toISOString(),
                                        });
                                    }}
                                />
                                {errors.emissionDate && <p className="text-red-500 text-sm">{errors.emissionDate}</p>}
                            </div>
                            <div className="mb-5">
                                <label 
                                    htmlFor="assignor" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Cedente
                                </label> 
                                <input 
                                    type="text" 
                                    id="assignor" 
                                    name="assignor"
                                    value={values.assignor}
                                    onChange={handleChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                                {errors.assignor && <p className="text-red-500 text-sm">{errors.assignor}</p>}
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
  );
}