# 📋 Documentação Técnica

## 🏗️ Arquitetura

### Estrutura Modular
O projeto utiliza uma arquitetura modular baseada em ES6 modules, separando responsabilidades em módulos específicos:

```
src/js/
├── main.js              # Ponto de entrada da aplicação
└── modules/
    ├── config.js        # Configurações globais
    ├── state.js         # Gerenciamento de estado
    ├── fileHandler.js   # Manipulação de arquivos
    ├── subtitleAnalyzer.js # Análise de legendas
    ├── timeAdjuster.js  # Ajuste de tempo
    ├── editor.js        # Editor de texto
    ├── translator.js    # Sistema de tradução
    ├── modal.js         # Sistema de modais
    ├── utils.js         # Utilitários
    └── uiController.js  # Controlador da UI
```

### Padrões de Design

#### Singleton Pattern
- **AppState**: Gerenciamento centralizado do estado da aplicação
- **Config**: Configurações globais acessíveis em toda a aplicação

#### Module Pattern
- Cada funcionalidade é encapsulada em seu próprio módulo
- Exports nomeados para melhor tree-shaking
- Imports explícitos para dependências claras

#### Observer Pattern
- Sistema de eventos para comunicação entre módulos
- Atualização automática da UI baseada em mudanças de estado

## 🔧 Configuração

### Variáveis de Ambiente
```javascript
// src/js/modules/config.js
export const CONFIG = {
    TRANSLATION_API: {
        URL: 'https://api.mymemory.translated.net/get',
        TIMEOUT: 10000,
        DELAY_BETWEEN_REQUESTS: 100
    },
    FILE: {
        MAX_SIZE: 10 * 1024 * 1024, // 10MB
        ALLOWED_EXTENSIONS: ['.srt'],
        ENCODING: 'UTF-8'
    }
};
```

### Personalização
- **Idiomas**: Adicione novos idiomas em `LANGUAGE_DETECTION`
- **APIs**: Configure URLs e timeouts em `TRANSLATION_API`
- **UI**: Ajuste durações e animações em `UI`

## 📊 Gerenciamento de Estado

### AppState Class
```javascript
class AppState {
    constructor() {
        this.currentFile = null;
        this.currentContent = '';
        this.modifiedContent = '';
        this.isEditing = false;
        this.isProcessing = false;
        this.domElements = {};
    }
}
```

### Métodos Principais
- `setCurrentFile(file)`: Define arquivo atual
- `setCurrentContent(content)`: Define conteúdo original
- `setModifiedContent(content)`: Define conteúdo modificado
- `setEditing(editing)`: Controla modo de edição
- `setProcessing(processing)`: Controla processamento
- `getStateInfo()`: Retorna informações do estado

## 🎯 Funcionalidades Técnicas

### Análise de Arquivo SRT
```javascript
function analyzeSubtitleFile(content) {
    const lines = content.split('\n');
    const timePattern = /(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/;
    
    // Extrai informações:
    // - Número de legendas
    // - Duração total
    // - Idioma detectado
    // - Encoding
}
```

### Ajuste de Tempo
```javascript
function adjustTime(timeString, seconds) {
    const [time, ms] = timeString.split(',');
    const [hours, minutes, secs] = time.split(':').map(Number);
    
    let totalSeconds = hours * 3600 + minutes * 60 + secs + ms / 1000;
    totalSeconds += seconds;
    totalSeconds = Math.max(0, totalSeconds); // Previne valores negativos
    
    // Converte de volta para formato SRT
}
```

### Tradução Online
```javascript
async function translateText(text, targetLanguage) {
    const response = await fetch(
        `${CONFIG.TRANSLATION_API.URL}?q=${encodeURIComponent(text)}&langpair=auto|${targetLanguage}`,
        { signal: controller.signal }
    );
    
    const data = await response.json();
    return data.responseData.translatedText;
}
```

## 🎨 Sistema de UI

### CSS Architecture
- **Mobile First**: Design responsivo começando por mobile
- **CSS Custom Properties**: Variáveis para temas e cores
- **Flexbox/Grid**: Layout moderno e flexível
- **Animations**: Transições suaves e feedback visual

### Componentes
- **Modals**: Sistema reutilizável de modais
- **Alerts**: Notificações temporárias
- **Progress Bars**: Indicadores de progresso
- **File Upload**: Área de drag & drop

## 🔒 Segurança

### Validação de Entrada
- **File Type**: Verificação de extensão .srt
- **File Size**: Limite de 10MB
- **Time Values**: Validação de números positivos
- **XSS Prevention**: Sanitização de strings

### Processamento Local
- **No Upload**: Arquivos nunca saem do dispositivo
- **Memory Management**: Limpeza de objetos temporários
- **Error Handling**: Tratamento robusto de erros

## ⚡ Performance

### Otimizações
- **Lazy Loading**: Módulos carregados sob demanda
- **Debouncing**: Controle de frequência de eventos
- **Throttling**: Limitação de chamadas de API
- **Memory Cleanup**: Limpeza automática de recursos

### Métricas
- **First Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: < 100KB (sem dependências externas)
- **Memory Usage**: < 50MB para arquivos grandes

## 🧪 Testes

### Estratégia de Testes
```javascript
// Exemplo de teste unitário
describe('TimeAdjuster', () => {
    test('should adjust time correctly', () => {
        const result = adjustTime('00:01:30,500', 5);
        expect(result).toBe('00:01:35,500');
    });
});
```

### Cobertura
- **Unit Tests**: Funções isoladas
- **Integration Tests**: Módulos trabalhando juntos
- **E2E Tests**: Fluxos completos do usuário
- **Performance Tests**: Métricas de performance

## 🚀 Deploy

### Build Process
1. **Validation**: Verificação de sintaxe
2. **Minification**: Compressão de código
3. **Optimization**: Otimização de assets
4. **Testing**: Execução de testes

### Environments
- **Development**: Servidor local com hot reload
- **Staging**: Ambiente de teste
- **Production**: Deploy otimizado

## 📈 Monitoramento

### Métricas
- **Performance**: Core Web Vitals
- **Errors**: JavaScript errors
- **Usage**: Analytics de uso
- **API**: Status de APIs externas

### Logging
```javascript
// Sistema de logging
const logger = {
    info: (message) => console.log(`[INFO] ${message}`),
    error: (message) => console.error(`[ERROR] ${message}`),
    warn: (message) => console.warn(`[WARN] ${message}`)
};
```

## 🔄 Manutenção

### Versionamento
- **Semantic Versioning**: MAJOR.MINOR.PATCH
- **Changelog**: Registro de mudanças
- **Breaking Changes**: Documentação de incompatibilidades

### Updates
- **Dependencies**: Atualização regular
- **Security**: Patches de segurança
- **Features**: Novas funcionalidades
- **Bug Fixes**: Correções de bugs

## 📚 Recursos Adicionais

### Documentação
- **API Reference**: Documentação de APIs
- **User Guide**: Guia do usuário
- **Developer Guide**: Guia do desenvolvedor
- **FAQ**: Perguntas frequentes

### Comunidade
- **GitHub Issues**: Reportar bugs
- **Discussions**: Discussões da comunidade
- **Contributing**: Guia de contribuição
- **Code of Conduct**: Código de conduta
