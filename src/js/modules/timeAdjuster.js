/**
 * Ajuste de tempo das legendas
 */
import { CONFIG, MESSAGES } from './config.js';
import { appState } from './state.js';
import { showAlert } from './utils.js';
import { showProgressModal, hideModal } from './modal.js';

/**
 * Manipula o ajuste de tempo
 */
export function handleTimeAdjustment() {
    if (!appState.hasFile()) {
        showAlert(MESSAGES.ERROR.NO_FILE_SELECTED, 'error');
        return;
    }
    
    const timeValue = parseFloat(appState.domElements.timeInput.value);
    const adjustmentType = document.querySelector('input[name="adjustmentType"]:checked').value;
    
    if (isNaN(timeValue) || timeValue < CONFIG.TIME.MIN_TIME || timeValue > CONFIG.TIME.MAX_ADJUSTMENT) {
        showAlert(MESSAGES.ERROR.INVALID_TIME, 'error');
        return;
    }
    
    const seconds = adjustmentType === 'advance' ? -timeValue : timeValue;
    
    showProgressModal('Ajustando tempo da legenda...', () => {
        const adjustedContent = adjustSubtitleTiming(appState.currentContent, seconds);
        appState.setModifiedContent(adjustedContent);
        showAlert(MESSAGES.SUCCESS.TIME_ADJUSTED, 'success');
        hideModal('progressModal');
    });
}

/**
 * Ajusta o timing de todas as legendas
 */
function adjustSubtitleTiming(content, seconds) {
    const lines = content.split('\n');
    const timePattern = CONFIG.TIME.PATTERN;
    
    return lines.map(line => {
        const match = line.match(timePattern);
        if (match) {
            const startTime = adjustTime(match[1], seconds);
            const endTime = adjustTime(match[2], seconds);
            return `${startTime} --> ${endTime}`;
        }
        return line;
    }).join('\n');
}

/**
 * Ajusta um tempo específico
 */
function adjustTime(timeString, seconds) {
    const [time, ms] = timeString.split(',');
    const [hours, minutes, secs] = time.split(':').map(Number);
    
    let totalSeconds = hours * 3600 + minutes * 60 + secs + ms / 1000;
    totalSeconds += seconds;
    
    // Garantir que não seja negativo
    totalSeconds = Math.max(CONFIG.TIME.MIN_TIME, totalSeconds);
    
    const newHours = Math.floor(totalSeconds / 3600);
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    const newSecs = Math.floor(totalSeconds % 60);
    const newMs = Math.floor((totalSeconds % 1) * 1000);
    
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSecs.toString().padStart(2, '0')},${newMs.toString().padStart(3, '0')}`;
}
