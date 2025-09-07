# 🎬 Ajustador de Legendas SRT

> Ferramenta web profissional para sincronização, tradução e análise de arquivos de legenda SRT

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)

## 🌟 Características

- ✅ **100% no navegador** - Processamento local, sem uploads
- ✅ **Interface moderna** - Design responsivo com tema escuro
- ✅ **Ajuste de tempo preciso** - Sincronização com segundos decimais
- ✅ **Tradução online** - Integração com API MyMemory
- ✅ **Editor integrado** - Edição completa de legendas
- ✅ **Análise automática** - Detecta idioma e extrai informações
- ✅ **Arquitetura modular** - Código organizado e manutenível

## 🚀 Início Rápido

### Opção 1: Uso Direto
1. Clone ou baixe o repositório
2. Abra `index.html` em qualquer navegador moderno
3. Comece a usar imediatamente!

### Opção 2: Servidor Local (Recomendado)
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Ou usar servidor HTTP simples
npm start
```

## 📁 Estrutura do Projeto

```
ajustador-legendas-srt/
├── index.html                 # Página principal
├── package.json              # Configurações do projeto
├── README.md                 # Documentação
├── .gitignore               # Arquivos ignorados pelo Git
└── src/                     # Código fonte
    ├── css/
    │   └── styles.css       # Estilos principais
    ├── js/
    │   ├── main.js          # Arquivo principal
    │   └── modules/         # Módulos JavaScript
    │       ├── config.js    # Configurações
    │       ├── state.js     # Gerenciamento de estado
    │       ├── fileHandler.js # Manipulação de arquivos
    │       ├── subtitleAnalyzer.js # Análise de legendas
    │       ├── timeAdjuster.js # Ajuste de tempo
    │       ├── editor.js    # Editor de texto
    │       ├── translator.js # Sistema de tradução
    │       ├── modal.js     # Sistema de modais
    │       ├── utils.js     # Utilitários
    │       └── uiController.js # Controlador da UI
    ├── assets/              # Recursos (imagens, fontes)
    ├── examples/            # Arquivos de exemplo
    └── docs/               # Documentação adicional
```

## 🎯 Funcionalidades

### 📁 Upload de Arquivos
- **Drag & Drop**: Arraste arquivos diretamente para a interface
- **Seleção manual**: Clique para escolher arquivos
- **Validação automática**: Verifica formato e tamanho
- **Suporte UTF-8**: Compatível com caracteres especiais

### ⏰ Ajuste de Tempo
- **Precisão decimal**: Ajuste com segundos decimais
- **Adiantar/Atrasar**: Controle total sobre sincronização
- **Validação de entrada**: Previne valores inválidos
- **Processamento em lote**: Ajusta todas as legendas automaticamente

### 🌍 Tradução Online
- **API MyMemory**: Tradução gratuita e confiável
- **20+ idiomas**: Suporte a múltiplos idiomas
- **Detecção automática**: Identifica idioma de origem
- **Barra de progresso**: Acompanhe o progresso em tempo real

### ✏️ Editor Integrado
- **Interface completa**: Editor de texto com syntax highlighting
- **Validação em tempo real**: Detecta erros de formatação
- **Salvamento seguro**: Confirma antes de sobrescrever
- **Histórico de alterações**: Rastreia modificações

### 📊 Análise de Arquivo
- **Detecção de idioma**: Identifica português, inglês, espanhol
- **Estatísticas completas**: Número de falas, duração, encoding
- **Informações detalhadas**: Título, linhas totais, formato
- **Validação de estrutura**: Verifica formato SRT

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com Flexbox/Grid
- **JavaScript ES6+**: Módulos, async/await, classes
- **Font Awesome**: Ícones profissionais
- **API MyMemory**: Tradução online gratuita

## 🎨 Design e UX

### Tema Escuro Moderno
- **Gradientes suaves**: Visual elegante e profissional
- **Animações fluidas**: Transições suaves e responsivas
- **Tipografia clara**: Fonte legível em todos os tamanhos
- **Cores consistentes**: Paleta harmoniosa e acessível

### Responsividade
- **Mobile First**: Otimizado para dispositivos móveis
- **Breakpoints inteligentes**: Adapta-se a qualquer tela
- **Touch Friendly**: Botões e controles otimizados para toque
- **Performance**: Carregamento rápido em qualquer dispositivo

## 🔧 Configuração Avançada

### Personalização de Idiomas
Edite `src/js/modules/config.js` para adicionar novos idiomas:

```javascript
LANGUAGE_DETECTION: {
    PT_WORDS: ['palavra1', 'palavra2', ...],
    EN_WORDS: ['word1', 'word2', ...],
    ES_WORDS: ['palabra1', 'palabra2', ...]
}
```

### Configuração de API
Ajuste timeouts e URLs em `src/js/modules/config.js`:

```javascript
TRANSLATION_API: {
    URL: 'https://api.mymemory.translated.net/get',
    TIMEOUT: 10000,
    DELAY_BETWEEN_REQUESTS: 100
}
```

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

### Dispositivos
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Mobile (iOS, Android)

## 🚀 Deploy

### GitHub Pages
1. Faça push do código para o GitHub
2. Ative GitHub Pages nas configurações do repositório
3. Selecione a branch `main` como fonte
4. Acesse `https://seuusuario.github.io/ajustador-legendas-srt`

### Netlify
1. Conecte seu repositório GitHub ao Netlify
2. Configure build settings:
   - Build command: `echo "Site estático"`
   - Publish directory: `.`
3. Deploy automático a cada push

### Vercel
1. Instale Vercel CLI: `npm i -g vercel`
2. Execute `vercel` na pasta do projeto
3. Siga as instruções para configurar

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

### Diretrizes de Contribuição
- Siga o padrão de código existente
- Adicione comentários para código complexo
- Teste em múltiplos navegadores
- Mantenha a responsividade
- Atualize a documentação quando necessário

## 🐛 Reportar Bugs

Encontrou um bug? Por favor:

1. Verifique se já não foi reportado
2. Use o template de issue
3. Inclua informações do navegador
4. Adicione passos para reproduzir
5. Anexe screenshots se relevante

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **MyMemory API** - Pelo serviço de tradução gratuito
- **Font Awesome** - Pelos ícones profissionais
- **Comunidade JavaScript** - Pela inspiração e recursos

## 📞 Suporte

- 📧 **Email**: [seu-email@exemplo.com]
- 🐛 **Issues**: [GitHub Issues](https://github.com/usuario/ajustador-legendas-srt/issues)
- 📖 **Documentação**: [Wiki do Projeto](https://github.com/usuario/ajustador-legendas-srt/wiki)

---

**Desenvolvido com ❤️ para a comunidade de legendas**

⭐ **Se este projeto te ajudou, considere dar uma estrela!**
