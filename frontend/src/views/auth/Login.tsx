"use client"

import React, { FormEvent, useContext, useState } from "react";
import { Button } from "flowbite-react";
import TextInput from "@/components/form/TextInput/TextInput";
import { AuthContext } from "@/providers/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useContext(AuthContext)
    const router = useRouter()

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        const ok = await login(email, password);
        if (ok) {
            router.push("/")
        } else {
            setError("Email e/ou senha inválidos")
        }
    }
    return (
        <>
      <h1 className="text-2xl font-bold mb-2"> Login de Usuário </h1>
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <TextInput
          name="email"
          label="Email"
          value={email}
          onChange={setEmail}
          focus={true}
        ></TextInput>

        <TextInput
          name="senha"
          label="Senha"
          value={password}
          onChange={setPassword}
          type="password"
          error={error}
        ></TextInput>

        <Button type="submit">Submit</Button>
      </form>
    </>
    )
}

export default Login;