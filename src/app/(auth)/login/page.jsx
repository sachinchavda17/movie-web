"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function Login() {
    const router = useRouter();
    const onSubmit = (data) => {
        router.push("/");
        console.log("user logged in.");
    };

    return (
        <AuthForm
            schema={loginSchema}
            type={"login"}
            onSubmit={onSubmit}
        />
    );
}
