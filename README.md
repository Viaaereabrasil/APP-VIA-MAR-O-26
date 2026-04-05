# Via Aérea Brasil - Guia de Exportação e Hospedagem

Este projeto foi desenvolvido no **Google AI Studio Build** e está pronto para ser exportado e hospedado em seu próprio domínio.

## 1. Como Exportar o Código
1. No menu lateral do AI Studio, clique no ícone de **Configurações** (engrenagem).
2. Selecione **Download ZIP** para baixar todo o código-fonte para o seu computador.
3. Extraia o arquivo ZIP em uma pasta.

## 2. Onde Hospedar (Alternativas ao Wix)
Como este aplicativo possui um "backend" (servidor) para processar pagamentos com Stripe, ele não pode ser hospedado diretamente no editor visual do Wix. Recomendamos as seguintes plataformas:

### Opção A: Render (Recomendada pela facilidade)
1. Crie uma conta em [render.com](https://render.com).
2. Conecte seu GitHub ou faça o upload da pasta.
3. Escolha **Web Service**.
4. Configure os comandos:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Adicione as Variáveis de Ambiente (Environment Variables) baseadas no arquivo `.env.example`.

### Opção B: Railway
1. Crie uma conta em [railway.app](https://railway.app).
2. Arraste a pasta do projeto para o painel.
3. Ele detectará automaticamente as configurações e iniciará o deploy.

## 3. Conectando seu Domínio do Wix
Se você já tem um domínio no Wix (ex: `www.suaempresa.com.br`), você pode apontá-lo para o seu novo site:
1. No painel do Wix, vá em **Domínios**.
2. Selecione o domínio e procure por **Gerenciar Registros DNS**.
3. Altere o registro **CNAME** (ou o registro **A**) conforme as instruções fornecidas pela plataforma de hospedagem escolhida (Render ou Railway).

## 4. Configurações Necessárias
Antes de publicar, você precisará das suas chaves do **Stripe**:
1. Acesse o painel do Stripe em [dashboard.stripe.com](https://dashboard.stripe.com).
2. Pegue a **Secret Key** e a **Publishable Key**.
3. Configure-as nas variáveis de ambiente da sua hospedagem:
   - `STRIPE_SECRET_KEY`: Sua chave secreta.
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Sua chave pública.
   - `APP_URL`: O endereço final do seu site (ex: `https://meusite.com`).

---
Desenvolvido com â¤ï¸ pela Via Aérea Brasil.
