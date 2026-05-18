import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "MedFlow -  About" },
    { name: "description", content: "Descrição Sobre a empresa e seus serviços" },
  ];
}

export default function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>This is the about page of the application.</p>
        </div>);
}