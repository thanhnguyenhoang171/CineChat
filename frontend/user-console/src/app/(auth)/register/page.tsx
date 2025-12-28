"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic
    console.log("Register with:", { name, email, password });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background md:items-center md:justify-center">
      {/* Background overlay for desktop */}
      <div className="absolute inset-0 hidden -z-10 md:block">
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 via-background to-secondary/20" />
      </div>

      <div className="mt-24 w-full px-4 md:mt-0 md:max-w-[450px]">
        <Card className="border-border bg-card/80 backdrop-blur-sm p-8 text-card-foreground shadow-xl md:p-12">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-3xl font-bold text-primary">Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-input/50 border-border h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input/50 border-border h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input/50 border-border h-12"
                  required
                />
              </div>
              <Button 
                type="submit" 
                variant="default" 
                size="xl" 
                className="mt-4 w-full text-base font-bold transition-all hover:scale-[1.02]"
              >
                Sign Up
              </Button>
            </form>

            <div className="mt-8 text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Sign in now.
              </Link>
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground/80 leading-tight">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
              <Link href="#" className="text-secondary hover:underline">Learn more.</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}