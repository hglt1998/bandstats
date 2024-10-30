// components/Navbar.js
"use client"; // Ejecuta este componente en el cliente
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { MusicalNoteIcon } from "@heroicons/react/16/solid";

function Navbar() {
  const { data: session, status } = useSession();
  const [darkMode, setDarkMode] = useState(false);

  // Maneja el cambio de modo y guarda la preferencia del usuario
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Carga el tema desde localStorage al cargar la página
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  return (
    <nav className="bg-white p-4 dark:bg-gray-800">
      <div className="flex justify-between container mx-auto">
        <Link href="/" className="flex justify-center items-center gap-3">
          <MusicalNoteIcon className="text-slate-700 size-6 dark:text-white" />
          <h1 className="font-bold text-xl text-slate-700 italic dark:text-white">Mezzo</h1>
        </Link>
        <ul className="flex items-center gap-x-4">
          <li className="flex">
            <button onClick={toggleDarkMode} className="pr-5 items-center justify-center">
              {darkMode ? (<SunIcon className="size-6" />) : (<MoonIcon className="h-6 w-6 text-slate-700" />)}
            </button>
          </li>
          {status === "loading" ? (
            <li className="px-3 py-1 text-slate-700 dark:text-white">Cargando...</li>
          ) : session ? (
            <>
              <li className="px-3 py-1 text-slate-700 dark:text-white">
                <Link href="/dashboard">Perfil</Link>
              </li>
              <li className="px-3 py-1 text-slate-700 dark:text-white">
                <button onClick={() => signOut()}>Cerrar sesión</button>
              </li>
            </>
          ) : (
            <>
              <li className="px-3 py-1 text-slate-700 dark:text-white">
                <Link href="/login">Login</Link>
              </li>
              <li className="px-3 py-1 text-slate-700 dark:text-white">
                <Link href="/register">Registro</Link>
              </li>
              <li className="px-3 py-1 text-slate-700 dark:text-white">
                <Link href="/about">About</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
