/**
 * Arquivo principal da aplicação
 * Ajustador de Legendas SRT - Versão Web
 */

// Importações dos módulos
import { appState } from './modules/state.js';
import { initializeEventListeners, updateButtonStates } from './modules/uiController.js';
import { initializeAlertStyles } from './modules/utils.js';

/**
 * Inicialização da aplicação
 */
class SubtitleAdjusterApp {
    constructor() {
        this.initialized = false;
        this.init();
    }

    /**
     * Inicializa a aplicação
     */
    init() {
        // Evita inicialização dupla
        if (this.initialized) {
            return;
        }
        
        // Aguarda o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * Configura a aplicação
     */
    setup() {
        try {
            // Evita inicialização dupla
            if (this.initialized) {
                return;
            }
            
            // Inicializa elementos DOM
            appState.initializeDOMElements();
            
            // Inicializa event listeners
            initializeEventListeners();
            
            // Inicializa estilos de alerta
            initializeAlertStyles();
            
            // Atualiza estado inicial dos botões
            updateButtonStates();
            
            // Configura observador de mudanças de estado
            this.setupStateObserver();
            
            this.initialized = true;
            console.log('Aplicação inicializada com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar a aplicação:', error);
            this.showInitializationError();
        }
    }

    /**
     * Atualiza o estado dos botões
     */
    updateButtonStates() {
        updateButtonStates();
    }

    /**
     * Configura observador de mudanças de estado
     */
    setupStateObserver() {
        // Observa mudanças no estado e atualiza a UI
        const originalSetModifiedContent = appState.setModifiedContent.bind(appState);
        appState.setModifiedContent = (content) => {
            originalSetModifiedContent(content);
            updateButtonStates();
        };

        const originalSetEditing = appState.setEditing.bind(appState);
        appState.setEditing = (editing) => {
            originalSetEditing(editing);
            updateButtonStates();
        };

        const originalSetProcessing = appState.setProcessing.bind(appState);
        appState.setProcessing = (processing) => {
            originalSetProcessing(processing);
            updateButtonStates();
        };
    }

    /**
     * Exibe erro de inicialização
     */
    showInitializationError() {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #f44336;
            color: white;
            padding: 20px;
            border-radius: 8px;
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        `;
        errorDiv.innerHTML = `
            <h3>Erro de Inicialização</h3>
            <p>Ocorreu um erro ao carregar a aplicação. Por favor, recarregue a página.</p>
            <button onclick="location.reload()" style="
                background: white;
                color: #f44336;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 10px;
            ">Recarregar Página</button>
        `;
        document.body.appendChild(errorDiv);
    }
}

// Inicializa a aplicação apenas uma vez
if (!window.SubtitleAdjusterApp) {
    const app = new SubtitleAdjusterApp();
    window.SubtitleAdjusterApp = app;
}
