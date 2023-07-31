function attachEvents() {
    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');
    
    submitBtn.addEventListener('click', submitHandler);
    refreshBtn.addEventListener('click', refreshHandler);
    
    async function submitHandler(){
        const author = document.querySelector('[name="author"]');
        const content = document.querySelector('[name="content"]');

        const data = {
            author: author.value,
            content: content.value,
        };

        author.value = '';
        content.value = '';

        const url = `http://localhost:3030/jsonstore/messenger`;
        const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    }

    async function refreshHandler() {
    const url = `http://localhost:3030/jsonstore/messenger`;
    const response = await fetch(url);
    const data = await response.json();

    const messages = Object.values(data).map(x => `${x.author}: ${x.content}`).join('\n');
    document.getElementById('messages').value = messages;
}

}

attachEvents();