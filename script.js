document.addEventListener('DOMContentLoaded', () => {
    const githubUsername = "Mirazstudio-offical";
    const branchName = "main";
    
    const myExtensions = [
        {
            id: "Dash_code_cleaner_extension", 
            name: "Code Cleaner"
        },
        {
            id: "penguinmod_firebase_extension",
            name: "firebase extension"
        }

        
    ];

    const grid = document.getElementById('extensions-grid');
    const searchInput = document.getElementById('search-input');

    function renderExtensions(extensions) {
        if (!grid) return;
        grid.innerHTML = '';
        
        extensions.forEach(ext => {
            const baseUrl = `https://cdn.jsdelivr.net/gh/${githubUsername}/${ext.id}@${branchName}`;
            const codeUrl = `${baseUrl}/code.js`;
            const logoUrl = `${baseUrl}/logo.svg`;
            
            const penguinLink = `https://studio.penguinmod.com/editor.html?extension=${encodeURIComponent(codeUrl)}`;

            const card = document.createElement('div');
            card.className = 'extension-card';
            card.setAttribute('data-name', ext.name.toLowerCase());

            card.innerHTML = `
                <img src="${logoUrl}" alt="${ext.name}" class="extension-image" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                
                <div class="no-icon-placeholder" style="display:none; width:100%; height:100%; align-items:center; justify-content:center; background:#333; color:#777; font-size:1.2rem;">
                    
                </div>
                
                <div class="card-overlay">
                    <div class="extension-title">${ext.name}</div>
                    <div class="btn-group">
                        <button class="btn btn-copy" onclick="copyLink('${codeUrl}', this)">Копировать</button>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.extension-card');
            
            cards.forEach(card => {
                const name = card.getAttribute('data-name');
                if (name.includes(searchTerm)) {
                    card.style.display = ''; 
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    renderExtensions(myExtensions);
});

function copyLink(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btnElement.innerText;
        btnElement.innerText = "Скопировано!";
        btnElement.style.background = "#28a745";
        btnElement.style.color = "#fff";
        setTimeout(() => {
            btnElement.innerText = originalText;
            btnElement.style.background = "";
            btnElement.style.color = "";
        }, 2000);
    }).catch(err => console.error(err));

}

