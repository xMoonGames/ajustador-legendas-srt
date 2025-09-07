/**
 * Sistema de tradução
 */
import { CONFIG, MESSAGES } from './config.js';
import { appState } from './state.js';
import { showAlert } from './utils.js';
import { showProgressModal, hideModal, updateProgress } from './modal.js';

/**
 * Manipula a tradução
 */
export function handleTranslation() {
    if (!appState.hasFile()) {
        showAlert(MESSAGES.ERROR.NO_FILE_SELECTED, 'error');
        return;
    }
    
    const mode = document.querySelector('input[name="translationMode"]:checked').value;
    const targetLanguage = appState.domElements.targetLanguage.value;
    
    if (mode === 'online') {
        translateOnline(targetLanguage);
    } else {
        showAlert(MESSAGES.WARNING.OFFLINE_TRANSLATION_UNAVAILABLE, 'warning');
    }
}

/**
 * Tradução online
 */
function translateOnline(targetLanguage) {
    // Obtém o idioma de origem detectado
    const sourceLanguage = appState.getDetectedLanguage();
    
    showProgressModal('Traduzindo legenda...', async () => {
        try {
            const translatedContent = await translateSubtitleContent(
                appState.modifiedContent, 
                sourceLanguage,
                targetLanguage
            );
            appState.setModifiedContent(translatedContent);
            showAlert(MESSAGES.SUCCESS.TRANSLATION_COMPLETE, 'success');
            hideModal('progressModal');
        } catch (error) {
            hideModal('progressModal');
            showAlert(MESSAGES.ERROR.TRANSLATION_ERROR + ' ' + error.message, 'error');
        }
    });
}

/**
 * Traduz o conteúdo da legenda
 */
async function translateSubtitleContent(content, sourceLanguage, targetLanguage) {
    const lines = content.split('\n');
    const timePattern = CONFIG.TIME.PATTERN;
    const translatedLines = [];
    
    let progress = 0;
    const totalLines = lines.length;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (timePattern.test(line) || line.trim().match(/^\d+$/) || line.trim() === '') {
            translatedLines.push(line);
        } else {
            try {
                const translatedText = await translateText(line.trim(), sourceLanguage, targetLanguage);
                translatedLines.push(translatedText + '\n');
            } catch (error) {
                translatedLines.push(line);
            }
        }
        
        progress++;
        updateProgress(progress, totalLines);
        
        // Pequena pausa para não sobrecarregar a API
        await new Promise(resolve => 
            setTimeout(resolve, CONFIG.TRANSLATION_API.DELAY_BETWEEN_REQUESTS)
        );
    }
    
    return translatedLines.join('\n');
}

/**
 * Traduz um texto específico
 */
async function translateText(text, sourceLanguage, targetLanguage) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.TRANSLATION_API.TIMEOUT);
    
    try {
        const response = await fetch(
            `${CONFIG.TRANSLATION_API.URL}?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`,
            { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.responseStatus === 200) {
            return data.responseData.translatedText;
        } else {
            throw new Error(MESSAGES.ERROR.TRANSLATION_FAILED);
        }
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('Timeout na tradução');
        }
        throw error;
    }
}
