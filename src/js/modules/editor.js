/**
 * Editor de legendas
 */
import { MESSAGES } from './config.js';
import { appState } from './state.js';
import { showAlert } from './utils.js';
import { showConfirmModal, hideModal } from './modal.js';

/**
 * Manipula a abertura do editor
 */
export function handleEditSubtitle() {
    if (!appState.hasFile()) {
        showAlert(MESSAGES.ERROR.NO_FILE_SELECTED, 'error');
        return;
    }
    
    appState.setEditing(true);
    appState.domElements.subtitleEditor.value = appState.modifiedContent;
    appState.domElements.editorContainer.style.display = 'block';
    appState.domElements.saveBtn.style.display = 'inline-flex';
    appState.domElements.cancelBtn.style.display = 'inline-flex';
    appState.domElements.editBtn.style.display = 'none';
}

/**
 * Manipula o salvamento das edições
 */
export function handleSaveEdit() {
    appState.setModifiedContent(appState.domElements.subtitleEditor.value);
    appState.setEditing(false);
    appState.domElements.editorContainer.style.display = 'none';
    appState.domElements.saveBtn.style.display = 'none';
    appState.domElements.cancelBtn.style.display = 'none';
    appState.domElements.editBtn.style.display = 'inline-flex';
    
    showAlert(MESSAGES.SUCCESS.CHANGES_SAVED, 'success');
}

/**
 * Manipula o cancelamento das edições
 */
export function handleCancelEdit() {
    if (appState.domElements.subtitleEditor.value !== appState.modifiedContent) {
        showConfirmModal(
            MESSAGES.CONFIRM.DISCARD_CHANGES,
            MESSAGES.CONFIRM.DISCARD_MESSAGE,
            () => {
                closeEditor();
            }
        );
    } else {
        closeEditor();
    }
}

/**
 * Fecha o editor
 */
function closeEditor() {
    appState.setEditing(false);
    appState.domElements.editorContainer.style.display = 'none';
    appState.domElements.saveBtn.style.display = 'none';
    appState.domElements.cancelBtn.style.display = 'none';
    appState.domElements.editBtn.style.display = 'inline-flex';
}
