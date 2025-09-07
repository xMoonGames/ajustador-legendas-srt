/**
 * Manipulação de arquivos SRT
 */
import { CONFIG, MESSAGES } from './config.js';
import { appState } from './state.js';
import { showAlert } from './utils.js';
import { analyzeSubtitleFile, displayFileInfo } from './subtitleAnalyzer.js';

/**
 * Manipula a seleção de arquivo
 */
export function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && isValidSRTFile(file)) {
        // Evita processamento duplo
        if (appState.isInProcessingMode()) {
            return;
        }
        processFile(file);
    } else {
        showAlert(MESSAGES.ERROR.INVALID_FILE, 'error');
    }
}

/**
 * Manipula o drag over
 */
export function handleDragOver(event) {
    event.preventDefault();
    appState.domElements.fileUploadArea.classList.add('dragover');
}

/**
 * Manipula o drag leave
 */
export function handleDragLeave(event) {
    event.preventDefault();
    appState.domElements.fileUploadArea.classList.remove('dragover');
}

/**
 * Manipula o drop de arquivo
 */
export function handleDrop(event) {
    event.preventDefault();
    appState.domElements.fileUploadArea.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (isValidSRTFile(file)) {
            processFile(file);
        } else {
            showAlert(MESSAGES.ERROR.INVALID_FILE, 'error');
        }
    }
}

/**
 * Verifica se o arquivo é um SRT válido
 */
function isValidSRTFile(file) {
    return file && 
           file.name.toLowerCase().endsWith('.srt') && 
           file.size <= CONFIG.FILE.MAX_SIZE;
}

/**
 * Processa o arquivo selecionado
 */
function processFile(file) {
    // Evita processamento duplo
    if (appState.isInProcessingMode()) {
        return;
    }
    
    appState.setProcessing(true);
    appState.setCurrentFile(file);
    const reader = new FileReader();
    
    reader.onload = function(e) {
        appState.setCurrentContent(e.target.result);
        analyzeSubtitleFile(e.target.result);
        updateFileInfo(file);
        appState.setProcessing(false);
        showAlert(MESSAGES.SUCCESS.FILE_LOADED, 'success');
    };
    
    reader.onerror = function() {
        appState.setProcessing(false);
        showAlert(MESSAGES.ERROR.FILE_READ_ERROR, 'error');
    };
    
    reader.readAsText(file, CONFIG.FILE.ENCODING);
}

/**
 * Atualiza a exibição das informações do arquivo
 */
function updateFileInfo(file) {
    appState.domElements.fileInfo.style.display = 'block';
    appState.domElements.fileUploadArea.style.display = 'none';
}

/**
 * Remove o arquivo carregado e reseta a interface
 */
export function handleRemoveFile() {
    // Confirma a remoção
    if (confirm('Tem certeza que deseja remover a legenda carregada?')) {
        // Reseta o estado
        appState.reset();
        
        // Limpa o input de arquivo
        appState.domElements.fileInput.value = '';
        
        // Esconde as informações do arquivo
        appState.domElements.fileInfo.style.display = 'none';
        
        // Mostra a área de upload
        appState.domElements.fileUploadArea.style.display = 'block';
        
        // Esconde o editor se estiver aberto
        appState.domElements.editorContainer.style.display = 'none';
        appState.domElements.saveBtn.style.display = 'none';
        appState.domElements.cancelBtn.style.display = 'none';
        appState.domElements.editBtn.style.display = 'inline-flex';
        
        // Esconde a seção de download
        appState.domElements.downloadSection.style.display = 'none';
        
        // Atualiza o estado dos botões
        if (window.SubtitleAdjusterApp) {
            window.SubtitleAdjusterApp.updateButtonStates();
        }
        
        showAlert('Legenda removida com sucesso!', 'success');
    }
}

/**
 * Manipula o download do arquivo modificado
 */
export function handleDownload() {
    if (!appState.modifiedContent) {
        showAlert(MESSAGES.ERROR.NO_CONTENT, 'error');
        return;
    }
    
    const blob = new Blob([appState.modifiedContent], { 
        type: 'text/plain;charset=utf-8' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = appState.currentFile ? 
        `modificado_${appState.currentFile.name}` : 
        'legenda_modificada.srt';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showAlert(MESSAGES.SUCCESS.DOWNLOAD_STARTED, 'success');
}
