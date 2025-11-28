"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import Joi, { string } from "joi";

import TextInput from "@/components/form/TextInput/TextInput";
import NumberInput from "@/components/form/NumberInput/NumberInput";
import TextArea from "@/components/form/TextArea/TextArea";

import { CreateProductDto } from "../Product.types";
import productSchema from "../Product.schema";

function ProductCreate() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0.00");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const product: CreateProductDto = {
      name: name,
      price: price,
      stock: stock,
      description: description,
    };

    const { error } = productSchema.validate(product, { abortEarly: false });

    if (error) {
      const errorDetails: { [key: string]: string } = {};
      for (const errorDetail of error.details) {
        errorDetails[errorDetail.path[0]] = errorDetail.message;
      }
      setErros(errorDetails);
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API}/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Falha ao criar produto");
          }
          return res.json();
        })
        .then((newProduct) => {
          console.log("Produto criado:", newProduct);
          router.push("/");
        })
        .catch((err) => {
          console.error(err);
          setErros({ general: err.message });
        });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-2"> Criação de Produtos </h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          name="nome"
          label="Nome do Produto"
          value={name}
          onChange={setName}
          error={erros["name"]}
          focus={true}
        ></TextInput>

        <TextInput
          name="price"
          label="Preço"
          value={price}
          onChange={setPrice}
          error={erros["price"]}
        ></TextInput>

        <NumberInput
          name="stock"
          label="Quantidade em estoque"
          value={stock}
          onChange={setStock}
          error={erros["stock"]}
        ></NumberInput>

        <TextArea
          name="description"
          label="Descrição"
          value={description}
          onChange={setDescription}
          error={erros["description"]}
        ></TextArea>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default ProductCreate;
