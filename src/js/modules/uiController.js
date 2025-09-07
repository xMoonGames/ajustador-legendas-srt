/**
 * Controlador da interface do usuário
 */
import { appState } from './state.js';
import { handleFileSelect, handleDragOver, handleDragLeave, handleDrop, handleDownload, handleRemoveFile } from './fileHandler.js';
import { handleTimeAdjustment } from './timeAdjuster.js';
import { handleEditSubtitle, handleSaveEdit, handleCancelEdit } from './editor.js';
import { handleTranslation } from './translator.js';
import { hideModal, confirmAction, cancelAction, cancelProcessing } from './modal.js';

/**
 * Inicializa os event listeners
 */
export function initializeEventListeners() {
    // Verifica se os elementos existem antes de adicionar listeners
    if (!appState.domElements.fileInput || !appState.domElements.fileUploadArea) {
        console.error('Elementos DOM não encontrados');
        return;
    }
    
    // Evita adicionar listeners duplicados
    if (appState.domElements.fileInput.hasAttribute('data-listeners-added')) {
        return;
    }
    
    // Upload de arquivo
    appState.domElements.fileInput.addEventListener('change', handleFileSelect); 
    if (appState.domElements.selectFileBtn) {
        appState.domElements.selectFileBtn.addEventListener('click', () => 
            appState.domElements.fileInput.click()
        );
    }
    appState.domElements.fileUploadArea.addEventListener('dragover', handleDragOver);
    appState.domElements.fileUploadArea.addEventListener('dragleave', handleDragLeave);
    appState.domElements.fileUploadArea.addEventListener('drop', handleDrop);

    // Botões principais
    appState.domElements.adjustBtn.addEventListener('click', handleTimeAdjustment);
    appState.domElements.editBtn.addEventListener('click', handleEditSubtitle);
    appState.domElements.translateBtn.addEventListener('click', handleTranslation);
    appState.domElements.saveBtn.addEventListener('click', handleSaveEdit);
    appState.domElements.cancelBtn.addEventListener('click', handleCancelEdit);
    appState.domElements.downloadBtn.addEventListener('click', handleDownload);
    appState.domElements.removeFileBtn.addEventListener('click', handleRemoveFile);

    // Modal de progresso
    appState.domElements.cancelProgressBtn.addEventListener('click', cancelProcessing);

    // Modal de confirmação
    appState.domElements.confirmYes.addEventListener('click', confirmAction);
    appState.domElements.confirmNo.addEventListener('click', cancelAction);

    // Fechar modais ao clicar fora
    appState.domElements.progressModal.addEventListener('click', (e) => {
        if (e.target === appState.domElements.progressModal) {
            hideModal('progressModal');
        }
    });
    appState.domElements.confirmModal.addEventListener('click', (e) => {
        if (e.target === appState.domElements.confirmModal) {
            hideModal('confirmModal');
        }
    });
    
    // Marca que os listeners foram adicionados
    appState.domElements.fileInput.setAttribute('data-listeners-added', 'true');
}

/**
 * Atualiza o estado dos botões
 */
export function updateButtonStates() {
    const stateInfo = appState.getStateInfo();
    
    appState.domElements.adjustBtn.disabled = !stateInfo.hasFile || stateInfo.isProcessing;
    appState.domElements.editBtn.disabled = !stateInfo.hasFile || stateInfo.isProcessing;
    appState.domElements.translateBtn.disabled = !stateInfo.hasFile || stateInfo.isProcessing;
    
    appState.domElements.downloadSection.style.display = stateInfo.hasModifications ? 'block' : 'none';
    
    if (stateInfo.hasModifications) {
        appState.domElements.downloadInfo.textContent = 
            `Arquivo modificado (${stateInfo.fileSize} caracteres)`;
    }
}

