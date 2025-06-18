document.getElementById('clickMe').addEventListener('click', () => {
    chrome.tabs.query({}, function(tabs) {
        const titlesList = document.createElement('ul');
        
        tabs.forEach(tab => {
            const li = document.createElement('li');
            
            
            const close_btn = document.createElement('button');
            close_btn.textContent = 'Close';
            close_btn.addEventListener('click', () => {
                chrome.tabs.remove(tab.id);
                li.remove(); // Remove list item from the popup
            });
            li.textContent = `${tab.title} `;
            li.appendChild(close_btn);
            
            titlesList.appendChild(li);

        });

        const tabInfo_div = document.getElementById('tabInfo');
        tabInfo_div.textContent = `Open tabs: ${tabs.length}`; //clears old content
        tabInfo_div.appendChild(titlesList);
    });
});
