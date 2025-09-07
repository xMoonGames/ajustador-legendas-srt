/**
 * Gerenciamento de estado da aplicação
 */
class AppState {
    constructor() {
        this.currentFile = null;
        this.currentContent = '';
        this.modifiedContent = '';
        this.isEditing = false;
        this.isProcessing = false;
        this.domElements = {};
        this.detectedLanguage = 'pt'; // idioma padrão
    }

    /**
     * Inicializa os elementos DOM
     */
    initializeDOMElements() {
        // Evita inicialização dupla
        if (Object.keys(this.domElements).length > 0) {
            return;
        }
        
        const elementIds = [
            'fileInput', 'fileUploadArea', 'fileInfo', 'infoGrid',
            'adjustBtn', 'editBtn', 'translateBtn', 'saveBtn', 'cancelBtn',
            'downloadBtn', 'subtitleEditor', 'editorContainer', 'downloadSection',
            'progressModal', 'confirmModal', 'timeInput', 'targetLanguage',
            'downloadInfo', 'progressTitle', 'progressFill', 'progressText',
            'progressTime', 'confirmTitle', 'confirmMessage', 'cancelProgressBtn',
            'confirmYes', 'confirmNo', 'selectFileBtn', 'removeFileBtn'
        ];

        elementIds.forEach(id => {
            this.domElements[id] = document.getElementById(id);
        });
    }

    /**
     * Atualiza o arquivo atual
     */
    setCurrentFile(file) {
        this.currentFile = file;
    }

    /**
     * Atualiza o conteúdo atual
     */
    setCurrentContent(content) {
        this.currentContent = content;
        this.modifiedContent = content;
    }

    /**
     * Atualiza o conteúdo modificado
     */
    setModifiedContent(content) {
        this.modifiedContent = content;
    }

    /**
     * Define o estado de edição
     */
    setEditing(editing) {
        this.isEditing = editing;
    }

    /**
     * Define o estado de processamento
     */
    setProcessing(processing) {
        this.isProcessing = processing;
    }

    /**
     * Verifica se há arquivo carregado
     */
    hasFile() {
        return this.currentContent !== '';
    }

    /**
     * Verifica se há modificações
     */
    hasModifications() {
        return this.modifiedContent !== this.currentContent;
    }

    /**
     * Verifica se está em modo de edição
     */
    isInEditMode() {
        return this.isEditing;
    }

    /**
     * Verifica se está processando
     */
    isInProcessingMode() {
        return this.isProcessing;
    }

    /**
     * Define o idioma detectado
     */
    setDetectedLanguage(language) {
        this.detectedLanguage = language;
    }

    /**
     * Obtém o idioma detectado
     */
    getDetectedLanguage() {
        return this.detectedLanguage;
    }

    /**
     * Reseta o estado
     */
    reset() {
        this.currentFile = null;
        this.currentContent = '';
        this.modifiedContent = '';
        this.isEditing = false;
        this.isProcessing = false;
        this.detectedLanguage = 'pt'; // reset para padrão
    }

    /**
     * Obtém informações do estado atual
     */
    getStateInfo() {
        return {
            hasFile: this.hasFile(),
            hasModifications: this.hasModifications(),
            isEditing: this.isInEditMode(),
            isProcessing: this.isInProcessingMode(),
            fileSize: this.modifiedContent.length,
            fileName: this.currentFile ? this.currentFile.name : null
        };
    }
}

// Instância singleton do estado
export const appState = new AppState();
