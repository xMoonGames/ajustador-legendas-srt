/**
 * Análise de arquivos de legenda SRT
 */
import { CONFIG, LANGUAGE_CODES } from './config.js';
import { appState } from './state.js';

/**
 * Analisa o arquivo de legenda e extrai informações
 */
export function analyzeSubtitleFile(content) {
    const lines = content.split('\n');
    const timePattern = CONFIG.TIME.PATTERN;
    
    let subtitleCount = 0;
    let totalLines = lines.length;
    let timeMatches = [];
    let textLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (timePattern.test(line)) {
            timeMatches.push(line.match(timePattern));
        } else if (line && !line.match(/^\d+$/) && !timePattern.test(line)) {
            textLines.push(line);
            subtitleCount++;
        }
    }
    
    const detectedLanguageName = detectLanguage(textLines.slice(0, 10));
    const detectedLanguageCode = LANGUAGE_CODES[detectedLanguageName] || 'pt';
    
    // Salva o idioma detectado no estado global
    appState.setDetectedLanguage(detectedLanguageCode);
    
    const info = {
        title: appState.currentFile ? appState.currentFile.name : 'Arquivo SRT',
        language: detectedLanguageName,
        subtitleCount: subtitleCount,
        totalLines: totalLines,
        duration: calculateDuration(timeMatches),
        encoding: CONFIG.FILE.ENCODING
    };
    
    displayFileInfo(info);
}

/**
 * Detecta o idioma baseado nas palavras mais comuns
 */
function detectLanguage(textLines) {
    const { PT_WORDS, EN_WORDS, ES_WORDS } = CONFIG.LANGUAGE_DETECTION;
    
    let ptCount = 0;
    let enCount = 0;
    let esCount = 0;
    
    textLines.forEach(line => {
        const words = line.toLowerCase().split(/\s+/);
        words.forEach(word => {
            if (PT_WORDS.includes(word)) ptCount++;
            if (EN_WORDS.includes(word)) enCount++;
            if (ES_WORDS.includes(word)) esCount++;
        });
    });
    
    if (ptCount > enCount && ptCount > esCount) return 'Português';
    if (enCount > ptCount && enCount > esCount) return 'Inglês';
    if (esCount > ptCount && esCount > enCount) return 'Espanhol';
    return 'Desconhecido';
}

/**
 * Calcula a duração total da legenda
 */
function calculateDuration(timeMatches) {
    if (timeMatches.length === 0) return '--';
    
    const firstTime = timeMatches[0][1];
    const lastTime = timeMatches[timeMatches.length - 1][2];
    
    const start = parseTime(firstTime);
    const end = parseTime(lastTime);
    
    const duration = end - start;
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Converte string de tempo para segundos
 */
function parseTime(timeString) {
    const [time, ms] = timeString.split(',');
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds + ms / 1000;
}

/**
 * Exibe as informações do arquivo na interface
 */
export function displayFileInfo(info) {
    appState.domElements.infoGrid.innerHTML = `
        <div class="info-item">
            <strong>Título:</strong>
            <span>${info.title}</span>
        </div>
        <div class="info-item">
            <strong>Idioma:</strong>
            <span>${info.language}</span>
        </div>
        <div class="info-item">
            <strong>Número de falas:</strong>
            <span>${info.subtitleCount}</span>
        </div>
        <div class="info-item">
            <strong>Linhas totais:</strong>
            <span>${info.totalLines}</span>
        </div>
        <div class="info-item">
            <strong>Duração:</strong>
            <span>${info.duration}</span>
        </div>
        <div class="info-item">
            <strong>Encoding:</strong>
            <span>${info.encoding}</span>
        </div>
    `;
}
