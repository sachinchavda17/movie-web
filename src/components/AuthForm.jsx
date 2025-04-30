"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthForm({ schema, onSubmit, type, }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });


    return (
        <div className="p-8 rounded-lg shadow-md dark:shadow-gray-800 w-full max-w-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">{type === "signup" ? "Signup" : "Login"}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="flex flex-col gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type={"email"}
                        placeholder="Enter your email"
                        {...register("email")}
                    />
                    {errors && errors.email && (
                        <div className="text-red-700 text-sm">{errors.email.message}</div>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password")}

                    />
                    {errors && errors.password && (
                        <div className="text-red-700 text-sm">
                            {errors.password.message}
                        </div>
                    )}
                </div>
                {
                    type === "signup" &&
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Enter your confirm password"
                            {...register("confirmPassword")}

                        />
                        {errors && errors.confirmPassword && (
                            <div className="text-red-700 text-sm">
                                {errors.confirmPassword.message}
                            </div>
                        )}
                    </div>}

                <Button type="submit" size={"lg"}>
                    {type === "signup" ? "Signup" : "Login"}
                </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
                <Link href={type === "signup" ? "/login" : "/signup"} className="text-blue-600 hover:text-blue-500">
                    {type === "signup" ? "Alredy have an account? Log in" : "Don't have an account? Sign up"}
                </Link>
            </div>
        </div>
    );
}
