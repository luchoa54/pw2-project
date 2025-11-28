"use client"

import React, { FormEvent, useState } from "react";
import { Button } from "flowbite-react";
import TextInput from "@/components/form/TextInput/TextInput";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        // 1. Validação básica no Frontend
        if (password !== confirmPassword) {
            setError("As senhas não conferem.");
            return;
        }

        if (password.length < 6) {
             setError("A senha deve ter pelo menos 6 caracteres.");
             return;
        }

        setLoading(true);

        try {
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOCKER_API}/auth/register`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                // Sucesso: Redireciona para o login
                router.push("/login");
            } else {
                // Erro: Tenta pegar a mensagem do backend
                const data = await response.json();
                setError(data.message || "Erro ao realizar cadastro.");
            }
        } catch (err) {
            console.error(err);
            setError("Erro de conexão com o servidor.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-2">Criar Nova Conta</h1>
            
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
                    type="email"
                />

                <TextInput
                    name="senha"
                    label="Senha"
                    value={password}
                    onChange={setPassword}
                    type="password"
                />

                <TextInput
                    name="confirmarSenha"
                    label="Confirmar Senha"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    type="password"
                    error={error}
                />

                <Button type="submit" isProcessing={loading} disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>

                <div className="text-sm text-gray-500 mt-2">
                    Já tem uma conta?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Faça login
                    </Link>
                </div>
            </form>
        </>
    );
}

export default Register;