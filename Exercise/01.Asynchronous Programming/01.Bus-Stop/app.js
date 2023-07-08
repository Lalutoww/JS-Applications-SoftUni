async function getInfo() {
    const busId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const busList = document.getElementById('buses');

    busList.innerHTML = '';
    stopName.innerHTML = '';

    try{

        const url = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${busId}`)
        if(!url.ok) throw new Error();
        const data = await url.json();
        stopName.textContent = data.name
        Object.entries(data.buses).forEach(([bus, time]) => {
            const elem = document.createElement('li')
			elem.textContent = `Bus ${bus} arrives in ${time}`

			busList.appendChild(elem)
        })
    }catch(err){
        stopName.textContent = 'Error';
    }
}