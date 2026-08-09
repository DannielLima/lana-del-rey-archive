<div align="center">

# Monografia Interativa — Lana Del Rey

Uma homenagem visual e sonora desenvolvida para transformar uma pesquisa acadêmica em uma experiência digital imersiva.

[![Status](https://img.shields.io/badge/Status-Concluído-success?style=flat-square)](https://github.com/DannielLima/lana-del-rey-archive)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)

---

> *"Um projeto desenvolvido para o trabalho escolar de uma amiga, com o objetivo de elevar a apresentação de conteúdo biográfico e artístico através do desenvolvimento web moderno."*

</div>

## 🔗 Acesso Online

Você pode visualizar o projeto finalizado através do link abaixo:

👉 **[https://lana-del-rey-archive.vercel.app/](https://lana-del-rey-archive.vercel.app/)**

---

## 📖 Sobre o Projeto

Este repositório contém o código-fonte de uma monografia digital interativa. A ideia central foi fugir do formato tradicional de apresentação escolar, utilizando design e engenharia front-end para criar uma narrativa visualmente impactante, similar a uma galeria de arte digital ou uma revista interativa.

A identidade visual foi minuciosamente construída para refletir a atmosfera artística de Lana Del Rey, incorporando:

*   **Estética Cinematográfica:** Foco em enquadramentos dramáticos e transições suaves.
*   **Paleta de Cores Sofisticada:** Uso de tons de vinho, sépia, bordô e preto profundo.
*   **Design Editorial:** Tipografia serifada elegante que remete a publicações impressas clássicas.
*   **Interatividade Fluida:** Microinterações que guiam o usuário pelo conteúdo.

## ✨ Destaques Técnicos

O projeto utiliza uma stack moderna focada em performance e experiência do usuário (UX):

*   **Liquid Hero (WebGL):** A tela de abertura apresenta um shader customizado desenvolvido com Three.js e GLSL, criando distorções líquidas e aberração cromática que reagem em tempo real ao movimento do cursor.
*   **Spotlight Dinâmico:** Os blocos de texto possuem um efeito de iluminação (*spotlight*) que segue o mouse, adicionando profundidade à interface.
*   **Animações de Scroll:** Utilização da biblioteca Framer Motion para revelar seções e elementos com suavidade durante a rolagem da página.
*   **Responsividade:** Layout totalmente adaptado para funcionar com elegância em desktops e dispositivos móveis.

## 🛠️ Tecnologias Utilizadas

*   **React**
*   **Next.js 15 (App Router)**
*   **TypeScript**
*   **Tailwind CSS**
*   **Three.js & GLSL**
*   **Framer Motion**

## 🚀 Como Executar Localmente

Se desejar baixar o código e rodar a aplicação em sua máquina, siga estes passos:

### Pré-requisitos

Você precisará ter instalado em seu computador:
*   [Node.js](https://nodejs.org/) (versão LTS recomendada)
*   [Git](https://git-scm.com/)

### Passos

1.  **Clone o repositório**
    ```bash
    git clone [https://github.com/DannielLima/lana-del-rey-archive.git](https://github.com/DannielLima/lana-del-rey-archive.git)
    ```

2.  **Entre na pasta do projeto**
    ```bash
    cd lana-del-rey-archive
    ```

3.  **Instale as dependências**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento**
    ```bash
    npm run dev
    ```

5.  **Acesse no navegador**
    Abra o endereço `http://localhost:3000` para visualizar o projeto.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Sinta-se livre para utilizar, estudar e adaptar o código.
