# BankMe Frontend

Interface web do desafio técnico da aplicação AproveMe, desenvolvida com Next.js para gerenciamento de recebíveis.

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/) & [Testing Library](https://testing-library.com/)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/bankme.git
cd bankme/frontend
```

2. Instale as dependências
```bash
yarn install
```

## 🏃‍♂️ Executando a aplicação

```bash
# desenvolvimento
yarn dev

# build de produção
yarn build

# executar versão de produção
yarn start
```

Acesse [http://localhost:3001](http://localhost:3001) no seu navegador.


## 🎨 Funcionalidades

### Cedentes
- Cadastro de novos cedentes
- Listagem de cedentes


### Pagáveis
- Registro de novos pagáveis
- Visualização de lista de pagáveis
- Atualização de status
- Remoção de pagáveis

## 🏗️ Estrutura do Projeto

```
src/
├── app/                # Rotas e páginas
│   ├── home/          # Página inicial após login
│       ├── list-receivables/      
│           ├── details/     #pagina secundaria de detalhes de um recebível   
|                ├── assignors/     #pagina secundaria de detalhes de um cedente 
│           ├── edit/           #pagina de edição de um recebível    
│       ├── register-assignor/    # Página de cadastro de cedentes
│       ├── register-receivables/  # Página de cadastro de recebíveis
│           ├── details/     #pagina de detalhes de um recebível   
|   ├── page/          # Página inicial
│   └── layout.tsx     # Layout principal
├── components/        # Componentes reutilizáveis
│   ├── Aside/         # Barra lateral
│   ├── Breadcrumb/    # Navegação
│   ├── CustomToast/    # Toast customizado
│   ├── LoginForm/      # Formulário de login
├── hooks/             # Custom hooks
├── services/          # Serviços e API
```

## 📱 Layout Responsivo

O projeto é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 📦 Scripts Disponíveis

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
  }
}
```

## 🧩 Componentes Principais

### Aside
Barra lateral de navegação com:
- Logo da aplicação
- Menu de navegação
- Toggle para modo mobile

### Breadcrumb
Navegação hierárquica mostrando:
- Localização atual
- Links para níveis anteriores
- Separadores visuais

### CustomToast
Toast customizado com:
- Mensagens de sucesso
- Mensagens de erro

### LoginForm
Formulário de login com:
- Campo de username
- Campo de senha
- Botão de login

## 🎯 Boas Práticas

- **Componentização**: Componentes reutilizáveis e modulares
- **TypeScript**: Tipagem estática para maior segurança
- **Testes**: Cobertura de testes para componentes principais
- **Responsividade**: Layout adaptável a diferentes dispositivos
- **Acessibilidade**: Seguindo diretrizes WCAG
- **Performance**: Otimizações do Next.js 14

## 🔄 Integração com Backend

A aplicação se comunica com o backend através de:
- Requisições HTTP
- Gerenciamento de estado
- Tratamento de erros
- Feedback visual para o usuário
