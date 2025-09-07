/**
 * Sistema de modais
 */
import { appState } from './state.js';

/**
 * Exibe o modal de progresso
 */
export function showProgressModal(title, callback) {
    appState.domElements.progressTitle.textContent = title;
    appState.domElements.progressFill.style.width = '0%';
    appState.domElements.progressText.textContent = '0%';
    appState.domElements.progressTime.textContent = 'Estimativa: --';
    
    appState.domElements.progressModal.style.display = 'flex';
    appState.setProcessing(true);
    
    // Simular progresso
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        updateProgress(progress, 100);
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(callback, 500);
        }
    }, 200);
}

/**
 * Atualiza a barra de progresso
 */
export function updateProgress(current, total) {
    const percentage = Math.round((current / total) * 100);
    appState.domElements.progressFill.style.width = percentage + '%';
    appState.domElements.progressText.textContent = percentage + '%';
}

/**
 * Esconde o modal
 */
export function hideModal(modalId) {
    appState.domElements[modalId].style.display = 'none';
    appState.setProcessing(false);
}

/**
 * Exibe o modal de confirmação
 */
export function showConfirmModal(title, message, onConfirm) {
    appState.domElements.confirmTitle.textContent = title;
    appState.domElements.confirmMessage.textContent = message;
    appState.domElements.confirmModal.style.display = 'flex';
    
    // Armazenar callback de confirmação
    appState.domElements.confirmModal.onConfirm = onConfirm;
}

/**
 * Confirma a ação
 */
export function confirmAction() {
    if (appState.domElements.confirmModal.onConfirm) {
        appState.domElements.confirmModal.onConfirm();
    }
    hideModal('confirmModal');
}

/**
 * Cancela a ação
 */
export function cancelAction() {
    hideModal('confirmModal');
}

/**
 * Cancela o processamento
 */
export function cancelProcessing() {
    appState.setProcessing(false);
    hideModal('progressModal');
}
