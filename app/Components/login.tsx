import { useState } from "react";

type Role = "cliente" | "farmaceutico" | "admin";

const roles: { id: Role; label: string; desc: string; icon: React.ReactNode }[] = [
    {
        id: "cliente",
        label: "Cliente",
        desc: "Marketplace & pedidos",
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
        ),
    },
    {
        id: "farmaceutico",
        label: "Equipe",
        desc: "Estoque, RH & financeiro",
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
        ),
    },
    {
        id: "admin",
        label: "Admin",
        desc: "Dashboard & gestão",
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
            </svg>
        ),
    },
];

const roleColors: Record<Role, { ring: string; bg: string; text: string; accent: string }> = {
    cliente: { ring: "ring-emerald-400", bg: "bg-emerald-50", text: "text-emerald-700", accent: "bg-emerald-500" },
    farmaceutico: { ring: "ring-blue-400", bg: "bg-blue-50", text: "text-blue-700", accent: "bg-blue-500" },
    admin: { ring: "ring-violet-400", bg: "bg-violet-50", text: "text-violet-700", accent: "bg-violet-600" },
};

const submitColors: Record<Role, string> = {
    cliente: "bg-emerald-500 hover:bg-emerald-600",
    farmaceutico: "bg-blue-500   hover:bg-blue-600",
    admin: "bg-violet-600 hover:bg-violet-700",
};

const placeholders: Record<Role, string> = {
    cliente: "voce@email.com",
    farmaceutico: "equipe@medflow.com",
    admin: "admin@medflow.com",
};

export function FormLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<Role>("cliente");

    const color = roleColors[role];

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
            <form
                action="/login"
                method="post"
                className="w-full max-w-md bg-white rounded-3xl p-10 relative overflow-hidden shadow-sm border border-slate-100"
            >
                {/* Blob decorativo — muda de cor com o perfil */}
                <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-30 pointer-events-none transition-colors duration-500 ${color.accent}`} />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-slate-100 opacity-60 pointer-events-none" />

                {/* Brand */}
                <div className="flex items-center gap-3 mb-8">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${color.accent}`}>
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <span className="font-serif text-lg font-medium text-slate-800 tracking-tight">MedFlow</span>
                    <span className="ml-auto text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                        {role === "cliente" ? "Marketplace" : role === "farmaceutico" ? "Equipe" : "Admin"}
                    </span>
                </div>

                {/* Heading */}
                <div className="mb-6">
                    <h1 className="font-serif text-3xl font-medium text-slate-900 tracking-tight leading-tight">
                        Boas-vindas<br />de volta
                    </h1>
                    <p className="text-sm text-slate-400 mt-2">Selecione seu perfil e entre na plataforma.</p>
                </div>

                {/* Role selector */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                    {roles.map((r) => {
                        const c = roleColors[r.id];
                        const active = role === r.id;
                        return (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setRole(r.id)}
                                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all duration-150 ${active
                                    ? `${c.ring} ${c.bg} ${c.text} ring-2 border-transparent`
                                    : "border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                            >
                                {r.icon}
                                <span className="text-[11px] font-medium leading-none">{r.label}</span>
                                <span className="text-[10px] leading-none opacity-70">{r.desc}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-1.5">
                        E-mail
                    </label>
                    <div className="relative">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                        </svg>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={placeholders[role]}
                            autoComplete="email"
                            className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 ${color.ring} focus:border-transparent`}
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label htmlFor="senha" className="block text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-1.5">
                        Senha
                    </label>
                    <div className="relative">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.875A4.875 4.875 0 007.5 7.875V10.5M3.75 10.5h16.5v9.75H3.75V10.5z" />
                        </svg>
                        <input
                            id="senha"
                            name="senha"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            className={`w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 ${color.ring} focus:border-transparent`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C3.75 7.5 7.636 4.5 12 4.5s8.25 3 9.75 7.5c-1.5 4.5-5.386 7.5-9.75 7.5S3.75 16.5 2.25 12z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Hidden role field — envia o perfil junto ao POST */}
                <input type="hidden" name="role" value={role} />

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer select-none">
                        <input type="checkbox" name="remember" className="w-3.5 h-3.5 cursor-pointer accent-slate-500" />
                        Lembrar de mim
                    </label>
                    <a href="#" className={`text-sm hover:underline transition-colors ${color.text}`}>
                        Esqueci a senha
                    </a>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className={`w-full py-3 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-150 active:scale-[.98] ${submitColors[role]}`}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    Entrar como {roles.find((r) => r.id === role)?.label}
                </button>

                {/* Divider + Social — só para clientes */}
                {role === "cliente" && (
                    <>
                        <div className="flex items-center gap-3 my-5 text-xs text-slate-400">
                            <span className="flex-1 h-px bg-slate-100" />
                            ou continue com
                            <span className="flex-1 h-px bg-slate-100" />
                        </div>

                        <div className="flex gap-3">
                            <a
                                href="https://accounts.google.com/signin/v2/identifier?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%2F&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-slate-500 bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-all duration-150"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </a>

                            <a
                                href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-slate-500 bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-all duration-150"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11.4 2H2v9.4h9.4V2z" fill="#F25022" />
                                    <path d="M22 2h-9.4v9.4H22V2z" fill="#7FBA00" />
                                    <path d="M11.4 12.6H2V22h9.4v-9.4z" fill="#00A4EF" />
                                    <path d="M22 12.6h-9.4V22H22v-9.4z" fill="#FFB900" />
                                </svg>
                                Microsoft
                            </a>
                        </div>

                        <p className="text-center text-sm text-slate-400 mt-6">
                            Não tem conta?{" "}
                            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors">
                                Criar conta
                            </a>
                        </p>
                    </>
                )}

                {/* Aviso para equipe e admin */}
                {role !== "cliente" && (
                    <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        Acesso restrito. Credenciais fornecidas pela MedFlow.
                    </p>
                )}
            </form>
        </div>
    );
}