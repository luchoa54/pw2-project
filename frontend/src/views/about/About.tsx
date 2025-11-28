"use client";

import { Card } from "flowbite-react";
import Image from "next/image";

function About() {
  return (
    <div className="container mx-auto min-h-screen p-6 flex flex-col items-center">
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Sobre
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        
        <Card className="max-w-lg">
          <div className="flex flex-col items-center pb-10">
            <div className="relative w-24 h-24 mb-3 rounded-full shadow-lg overflow-hidden">
                {/* Lembre-se de adicionar 'avatars.githubusercontent.com' no next.config.mjs se usar Image */}
                <Image
                    src="https://avatars.githubusercontent.com/u/175238017?v=4"
                    alt="Foto do Aluno"
                    fill
                    className="object-cover"
                />
            </div>
            
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Luciano Vinicius Silveira Uchôa
            </h5>
            
            <div className="mt-4 flex flex-col space-y-2 w-full px-4">
                
                {/* AQUI ESTÁ A MUDANÇA: */}
                <div className="flex justify-between items-start border-b py-2">
                    <span className="font-bold text-gray-700 dark:text-gray-300 mt-0.5">Curso:</span>
                    <div className="text-right">
                        <span className="block text-gray-600 dark:text-gray-400">
                            Engenharia de Software
                        </span>
                        {/* Sua informação extra aqui, um pouco menor (text-xs) para ficar elegante */}
                        <span className="block text-xs text-gray-500 dark:text-gray-400 italic">
                            (Cadastrado na matéria pela turma de CC)
                        </span>
                    </div>
                </div>

                <div className="flex justify-between border-b py-2">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Matrícula:</span>
                    <span className="text-gray-600 dark:text-gray-400">22052740</span> 
                </div>
                <div className="flex justify-between border-b py-2">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Email:</span>
                    <span className="text-gray-600 dark:text-gray-400">luciano.uchoa@icomp.ufam.edu.br</span>
                </div>
            </div>
          </div>
        </Card>

        <Card className="max-w-lg">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Lojinha de PW2
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Este projeto foi desenvolvido como requisito avaliativo para a disciplina de 
            <strong> Programação Web 2</strong>.
          </p>

          <p className="font-normal text-gray-700 dark:text-gray-400 mt-4">
            O objetivo é aplicar conceitos avançados de desenvolvimento web fullstack, incluindo:
          </p>

          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-1">
            <li>Frontend com <strong>Next.js (App Router)</strong></li>
            <li>Backend com <strong>Node.js & Express</strong></li>
            <li>Banco de Dados com <strong>Prisma & MySQL</strong></li>
            <li>Autenticação e Sessão de Usuário</li>
            <li>Containerização com <strong>Docker</strong></li>
          </ul>

          <div className="mt-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
              Versão 1.0.0
            </span>
          </div>
        </Card>

      </div>
    </div>
  );
}

export default About;