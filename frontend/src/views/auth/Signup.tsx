"use client"

import React, { FormEvent, useContext, useState } from "react";
import { Button } from "flowbite-react";
import TextInput from "@/components/form/TextInput/TextInput"; // Seu componente customizado
import { AuthContext } from "@/providers/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Signup() {
    // Estados separados para manter o padrão do seu Login
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Estado de erro geral ou específico
    const [error, setError] = useState('');
    
    const { signup } = useContext(AuthContext);
    const router = useRouter();

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        setError(''); // Limpa erros anteriores

        // 1. Validação básica no front
        if (password !== confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        // 2. Chama a função do contexto
        const ok = await signup({
            name, 
            email, 
            password,
            // IMPORTANTE: Use o UUID real do seu banco para o tipo Cliente
            userTypeId: "a536e89e-cbbc-11f0-aa2c-b2115d9208c8" 
        });

        // 3. Redireciona ou mostra erro
        if (ok) {
            alert("Cadastro realizado com sucesso!");
            router.push("/login");
        } else {
            setError("Erro ao cadastrar. Email já utilizado?");
        }
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-2"> Cadastro de Usuário </h1>
            
            <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                
                <TextInput
                    name="name"
                    label="Nome Completo"
                    value={name}
                    onChange={setName}
                    focus={true}
                />

                <TextInput
                    name="email"
                    label="Email"
                    value={email}
                    onChange={setEmail}
                />

                <TextInput
                    name="password"
                    label="Senha"
                    value={password}
                    onChange={setPassword}
                    type="password"
                />

                <TextInput
                    name="confirmPassword"
                    label="Confirmar Senha"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    type="password"
                    error={error} // Mostra o erro no último campo
                />

                <Button type="submit">Cadastrar</Button>

                <div className="flex justify-center text-sm font-medium text-gray-500 dark:text-gray-300 mt-2">
                    Já tem uma conta?&nbsp;
                    <Link
                        href="/login"
                        className="text-cyan-700 hover:underline dark:text-cyan-500"
                    >
                        Faça login
                    </Link>
                </div>
            </form>
        </>
    )
}

export default Signup;