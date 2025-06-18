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

async function getCPUStats() {
    const [processes, tabs] = await Promise.all([
        new Promise(resolve => chrome.processes.getProcessInfo([], true, resolve)),
        new Promise(resolve => chrome.tabs.query({}, resolve))
    ]);

    const res = [];
    processes.forEach(process => {
        if (process.type === "renderer") {
            tabs.forEach(tab => {
                if (tab.processId === process.id) {
                    res.push({
                        tabId: tab.id,
                        title: tab.title,
                        cpu: process.cpuUsage,
                        memory: process.privateMemory
                    })
                }
            })
        }
    })

    return res;
}

setInterval(async () => {
    const tabStats = await getCPUStats();
}, 2000);