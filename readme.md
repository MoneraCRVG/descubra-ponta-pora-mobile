# Descubra Ponta Porã Mobile

## Sobre o aplicativo

O "Descubra Ponta Porã Mobile" é um aplicativo móvel desenvolvido para ajudar moradores e turistas a explorar os pontos turísticos da cidade de Ponta Porã, Mato Grosso do Sul, Brasil. O aplicativo permite aos usuários buscar, visualizar detalhes e descobrir os diversos locais de interesse na região.

## Funcionalidades

-   **Busca de Pontos Turísticos:** Pesquise pontos turísticos por nome ou descrição.
-   **Detalhes do Local:** Visualize informações detalhadas de cada ponto, incluindo descrição, endereço e imagem.
-   **Interface Intuitiva:** Navegação fácil e design responsivo para uma experiência agradável.

## Tecnologias utilizadas

O aplicativo é construído utilizando o ecossistema React Native, garantindo compatibilidade com plataformas Android e iOS.

-   **React Native:** Framework para desenvolvimento de aplicativos móveis nativos.
-   **TypeScript:** Linguagem de programação para tipagem estática, melhorando a robustez do código.
-   **React Navigation:** Solução de navegação para aplicativos React Native.
-   **`@expo/vector-icons` (Ionicons):** Biblioteca de ícones para uma interface visualmente rica.
-   **`react-native-gesture-handler` e `react-native-reanimated`:** Para manipulação de gestos e animações.
-   **`react-native-screens` e `react-native-safe-area-context`:** Otimizações para performance e layout seguro.
-   **API RESTful:** Para buscar dados dos pontos turísticos (assumindo um backend que provê `http://192.168.21.15:5000/pontos-turisticos` e `http://192.168.21.15:5000/ponto-turistico/{id}`).

## Como executar o projeto

Siga os passos abaixo para configurar e executar o aplicativo em sua máquina local.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

-   Node.js (versão LTS recomendada)
-   npm (gerenciador de pacotes do Node.js) ou Yarn
-   Expo CLI (globalmente)
    ```bash
    npm install -g expo-cli
    ```
-   Um emulador Android/iOS ou um dispositivo físico para testes.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/descubra-ponta-pora-mobile.git](https://github.com/seu-usuario/descubra-ponta-pora-mobile.git)
    cd descubra-ponta-pora-mobile
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    # yarn install
    ```

3.  **Instale as dependências de navegação e gestos:**
    ```bash
    npm install react-native-screens react-native-safe-area-context
    npm install react-native-gesture-handler react-native-reanimated
    npm install @react-navigation/native-stack @react-navigation/native
    ```
    Para `react-native-reanimated`, adicione o plugin ao seu `babel.config.js`:
    ```javascript
    module.exports = {
      presets: ['babel-preset-expo'],
      plugins: ['react-native-reanimated/plugin'], // Adicione esta linha
    };
    ```

### Executando o aplicativo

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    # ou
    # expo start
    ```

2.  **Abra o aplicativo:**
    -   **No emulador Android:** Pressione `a` no terminal.
    -   **No emulador iOS:** Pressione `i` no terminal (macOS apenas).
    -   **No dispositivo físico:** Escaneie o código QR com o aplicativo Expo Go.

**Nota sobre a API:** O aplicativo espera que um servidor de API esteja rodando e acessível no endereço `http://192.168.21.15:5000`. Certifique-se de que o backend esteja ativo e que o IP seja o correto para sua rede local.

## Como contribuir

Contribuições são bem-vindas! Se você deseja contribuir para o projeto, siga estas etapas:

1.  Faça um fork do repositório.
2.  Crie uma nova branch (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e commit-as (`git commit -m 'feat: Adiciona nova funcionalidade X'`).
4.  Envie para a branch original (`git push origin feature/sua-feature`).
5.  Abra um Pull Request detalhando suas alterações.

Por favor, certifique-se de que seu código siga as convenções de estilo existentes e que todos os testes passem (se houver).