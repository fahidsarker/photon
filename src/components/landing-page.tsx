"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Globe, Zap, Users, CodeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GITHUB_URL } from "@/data/constants";
import { languages } from "@/data/languages";
import CodeEditorWindow from "./CodeEditorWindow";
import { themes } from "@/data/themes";
import { defineTheme } from "@/lib/defineTheme";

export function LandingPageComponent() {
  const [email, setEmail] = useState("");
  const [ideThemeReady, setIdeThemeReady] = useState(false);

  useEffect(() => {
    defineTheme({
      background: "#1B2B34",
      forground: "#CDD3DE",
      value: "oceanic-next",
      label: "Oceanic Next",
    }).then(() => {
      setIdeThemeReady(true);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log("Submitted email:", email);
    setEmail("");
  };

  useEffect(() => {
    const blobs = document.querySelectorAll(".blob") as NodeListOf<HTMLElement>;
    blobs.forEach((blob) => {
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      blob.style.setProperty("--x", `${randomX}%`);
      blob.style.setProperty("--y", `${randomY}%`);
    });
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen dark bg-gray-900 text-gray-100 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob bg-blue-500 opacity-10"></div>
        <div className="blob bg-purple-500 opacity-10"></div>
        <div className="blob bg-green-500 opacity-10"></div>
      </div>
      <header className="px-4 lg:px-6 h-14 w-full flex items-center relative z-10">
        <Link className="flex items-center justify-center" href="#">
          <Code className="h-6 w-6 mr-2" />
          <span className="font-bold">Photon</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href={GITHUB_URL}
          >
            GitHub
          </Link>
          <Link
            className="text-sm bg-white text-black rounded-md px-4 py-2 font-medium hover:underline underline-offset-4 flex items-center"
            href={`/javascript`}
          >
            <CodeIcon className="size-4 mr-2" />
            Code Now
          </Link>
        </nav>
      </header>
      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Code in Any Language, Anywhere
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Experience the power of Photon - your all-in-one online code
                  editor supporting hundreds of programming languages.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link href="/javascript">Start Coding</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="text-gray-300 border-gray-300 hover:bg-gray-800"
                >
                  <Link href={GITHUB_URL}>Visit Github</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              See Photon in Action
            </h2>
            <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/demos/photon-features.gif"
                alt="Animated preview of Photon code editor functionality"
                layout="fill"
                objectFit="cover"
                className="rounded-xl md:hidden"
              />
              {ideThemeReady && (
                <div className="hidden md:block w-full h-full">
                  <CodeEditorWindow
                    code={`// Welcome to Photon!
// This is JavaScript code
// Try It Out!
console.log('Hello, Photon!');
console.log('Code in any language, anywhere!');
const x = 20;
console.log(x + 10);

// It can even report errors
console.log(anotherVariable - 10); // oops code error

// Cool right?
// You can even execute the code
// by visiting ${window.location.origin}/typescript


// Did you know that Photon supports over 100 programming languages?
                    `}
                    fontSize={16}
                    height="100%"
                    language={languages[0]}
                    onChange={() => {}}
                    theme="oceanic-next"
                    width="100%"
                  />
                </div>
              )}
            </div>
            <p className="text-center mt-6 text-gray-300 md:text-lg">
              Watch as Photon seamlessly handles multiple languages, real-time
              collaboration, and instant code execution.
            </p>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Globe className="h-10 w-10 mb-4 text-blue-400" />}
                title="Multi-Language Support"
                description="Code in over 100 programming languages, from Python to Rust."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 mb-4 text-blue-400" />}
                title="Real-Time Collaboration"
                description="Work on projects together in real-time with team members."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 mb-4 text-blue-400" />}
                title="Community Sharing"
                description="Share your code snippets and projects with the Photon community."
              />
            </div>
          </div>
        </section>
        <section id="languages" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Supported Languages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              {languages.slice(0, 12).map((lang) => (
                <Link
                  key={lang.id}
                  href={`/${lang.value}`}
                  className="p-4 rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-lg text-gray-100"
                >
                  {lang.name.split(" ")[0]}
                </Link>
              ))}
            </div>
            <p className="text-center mt-8 text-gray-300">
              And many more! Photon supports over 100 programming languages.
            </p>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Coding Today
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Join thousands of developers who trust Photon for their coding
                  needs.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-lg text-gray-100 border-gray-700"
                  />
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-300">
                  Free to use. Totally Opensourced.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700 relative z-10">
        <p className="text-xs text-gray-300">
          © 2024 Photon. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
      <style jsx>{`
        .blob {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(80px);
          animation: blob-animation 20s ease-in-out infinite alternate;
        }
        @keyframes blob-animation {
          0% {
            transform: translate(var(--x), var(--y)) scale(1);
          }
          50% {
            transform: translate(calc(var(--x) - 10%), calc(var(--y) - 10%))
              scale(1.1);
          }
          100% {
            transform: translate(var(--x), var(--y)) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
      <CardContent className="flex flex-col items-center text-center p-6">
        {icon}
        <h3 className="text-lg font-bold mb-2 text-gray-100">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
}
