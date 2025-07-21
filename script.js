
document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('save-button');
    if (saveButton) {
        saveButton.addEventListener('click', handleSaveButtonClick);
    }
});

function handleSaveButtonClick() {
    const filename = getInputValue('filename');
    if (!filename) {
        alert('Please enter a filename.');
        return;
    }

    const eqtContent = getInputValue('eqt-content');
    const jsonResult = convertEqtToJson(filename, eqtContent);
    
    downloadJsonFile(filename, jsonResult);
}

function getInputValue(elementId) {
    const element = document.getElementById(elementId);
    return element ? element.value : '';
}

function downloadJsonFile(filename, jsonContent) {
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
}

function convertEqtToJson(filename, eqtContent) {
    const lines = eqtContent.split('\n');
    const preamp = parsePreamp(lines);
    const bands = parseBands(lines);

    const result = [{
        "name": filename,
        "preamp": preamp,
        "parametric": true,
        "bands": bands
    }];

    return JSON.stringify(result, null, 2);
}

function parsePreamp(lines) {
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.toUpperCase().startsWith('PREAMP')) {
            const parts = trimmedLine.split(/\s+/);
            if (parts.length >= 2) {
                const preampValue = parseFloat(parts[1]);
                if (!isNaN(preampValue)) {
                    return preampValue;
                }
            }
        }
    }
    return 0.0;
}

function parseBands(lines) {
    const defaultBands = [
        { "type": 0, "channels": 0, "frequency": 90, "q": 0.800000011920929, "gain": 0.0, "color": 0 },
        { "type": 1, "channels": 0, "frequency": 10000, "q": 0.6000000238418579, "gain": 0.0, "color": 0 }
    ];
    
    const userBands = lines.map(parseFilterLine).filter(band => band !== null);

    return [...defaultBands, ...userBands];
}

function parseFilterLine(line) {
    const trimmedLine = line.trim();
    const filterMatch = trimmedLine.match(/^Filter(\s+\d+)?:/);

    if (!filterMatch) {
        return null;
    }

    const filterDataString = trimmedLine.substring(filterMatch[0].length).trim();
    const parts = filterDataString.split(/\s+/);

    if (parts.length < 10 || parts[0] !== 'ON') {
        return null;
    }

    const filterType = getFilterType(parts[1]);
    if (filterType === null) {
        return null;
    }

    const frequency = parseFloat(parts[3]);
    const gain = parseFloat(parts[6]);
    const q = parseFloat(parts[9]);

    if (isNaN(frequency) || isNaN(gain) || isNaN(q)) {
        return null;
    }

    return {
        "type": filterType,
        "channels": 0,
        "frequency": frequency,
        "q": q,
        "gain": gain,
        "color": 0
    };
}

function getFilterType(typeStr) {
    switch (typeStr) {
        case 'LSC': return 4;
        case 'HSC': return 5;
        case 'PK': return 3;
        case 'BP': return 2;
        case 'HP': return 1;
        case 'LP': return 0;
        default: return null;
    }
}
