/**
 * Configurações globais da aplicação
 */
export const CONFIG = {
    // Configurações de API
    TRANSLATION_API: {
        URL: 'https://api.mymemory.translated.net/get',
        TIMEOUT: 10000,
        DELAY_BETWEEN_REQUESTS: 100
    },
    
    // Configurações de arquivo
    FILE: {
        MAX_SIZE: 10 * 1024 * 1024, // 10MB
        ALLOWED_EXTENSIONS: ['.srt'],
        ENCODING: 'UTF-8'
    },
    
    // Configurações de interface
    UI: {
        ALERT_DURATION: 3000,
        PROGRESS_UPDATE_INTERVAL: 200,
        ANIMATION_DURATION: 300
    },
    
    // Configurações de detecção de idioma
    LANGUAGE_DETECTION: {
        PT_WORDS: ['que', 'não', 'sim', 'você', 'ela', 'ele', 'está', 'por', 'com', 'para', 'uma', 'um', 'de', 'da', 'do', 'das', 'dos'],
        EN_WORDS: ['the', 'and', 'you', 'not', 'yes', 'she', 'he', 'is', 'for', 'with', 'a', 'an', 'of', 'to', 'in', 'on', 'at'],
        ES_WORDS: ['que', 'no', 'sí', 'usted', 'ella', 'él', 'está', 'por', 'con', 'para', 'una', 'un', 'de', 'la', 'el', 'las', 'los']
    },
    
    // Configurações de tempo
    TIME: {
        PATTERN: /(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/,
        MIN_TIME: 0,
        MAX_ADJUSTMENT: 3600 // 1 hora
    }
};

/**
 * Mensagens da aplicação
 */
export const MESSAGES = {
    SUCCESS: {
        FILE_LOADED: 'Arquivo carregado com sucesso!',
        TIME_ADJUSTED: 'Tempo ajustado com sucesso!',
        TRANSLATION_COMPLETE: 'Tradução concluída com sucesso!',
        CHANGES_SAVED: 'Alterações salvas!',
        DOWNLOAD_STARTED: 'Download iniciado!'
    },
    ERROR: {
        INVALID_FILE: 'Por favor, selecione um arquivo SRT válido.',
        FILE_READ_ERROR: 'Erro ao ler o arquivo.',
        NO_FILE_SELECTED: 'Selecione um arquivo primeiro.',
        INVALID_TIME: 'Por favor, insira um valor de tempo válido.',
        TRANSLATION_ERROR: 'Erro na tradução:',
        NO_CONTENT: 'Nenhum conteúdo para download.',
        TRANSLATION_FAILED: 'Erro na tradução'
    },
    WARNING: {
        OFFLINE_TRANSLATION_UNAVAILABLE: 'Tradução offline não está disponível no navegador. Use a tradução online.'
    },
    CONFIRM: {
        DISCARD_CHANGES: 'Descartar alterações?',
        DISCARD_MESSAGE: 'Existem alterações não salvas. Deseja descartar?',
        CANCEL_TRANSLATION: 'Tem certeza que deseja cancelar a tradução?'
    }
};

/**
 * Elementos DOM
 */
export const DOM_ELEMENTS = {
    fileInput: 'fileInput',
    fileUploadArea: 'fileUploadArea',
    fileInfo: 'fileInfo',
    infoGrid: 'infoGrid',
    adjustBtn: 'adjustBtn',
    editBtn: 'editBtn',
    translateBtn: 'translateBtn',
    saveBtn: 'saveBtn',
    cancelBtn: 'cancelBtn',
    downloadBtn: 'downloadBtn',
    subtitleEditor: 'subtitleEditor',
    editorContainer: 'editorContainer',
    downloadSection: 'downloadSection',
    progressModal: 'progressModal',
    confirmModal: 'confirmModal',
    timeInput: 'timeInput',
    targetLanguage: 'targetLanguage',
    downloadInfo: 'downloadInfo',
    progressTitle: 'progressTitle',
    progressFill: 'progressFill',
    progressText: 'progressText',
    progressTime: 'progressTime',
    confirmTitle: 'confirmTitle',
    confirmMessage: 'confirmMessage',
    cancelProgressBtn: 'cancelProgressBtn',
    confirmYes: 'confirmYes',
    confirmNo: 'confirmNo'
};

/**
 * Mapeamento de idiomas detectados para códigos ISO
 */
export const LANGUAGE_CODES = {
    'Português': 'pt',
    'Inglês': 'en',
    'Espanhol': 'es',
    'Francês': 'fr',
    'Alemão': 'de',
    'Italiano': 'it',
    'Russo': 'ru',
    'Chinês (Simplificado)': 'zh-CN',
    'Japonês': 'ja',
    'Coreano': 'ko',
    'Árabe': 'ar',
    'Turco': 'tr',
    'Hindi': 'hi',
    'Ucraniano': 'uk',
    'Polonês': 'pl',
    'Holandês': 'nl',
    'Sueco': 'sv',
    'Grego': 'el',
    'Hebraico': 'he',
    'Romeno': 'ro',
    'Tcheco': 'cs',
    'Húngaro': 'hu',
    'Finlandês': 'fi',
    'Dinamarquês': 'da',
    'Norueguês': 'no',
    'Desconhecido': 'pt' // fallback
};
