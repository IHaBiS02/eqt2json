document.getElementById('save-button').addEventListener('click', () => {
    const filename = document.getElementById('filename').value;
    const eqtContent = document.getElementById('eqt-content').value;

    if (!filename) {
        alert('Please enter a filename.');
        return;
    }

    // Placeholder for the actual EQT to JSON conversion logic
    const jsonContent = {
        "placeholder": true,
        "original_content": eqtContent
    };

    const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});