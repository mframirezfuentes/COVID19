/* $('#js-form').submit(async (e) => {
    e.preventDefault();
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    const JWT = await postData(email, password);
    const img = await getImg(JWT);
    construccionTabla(img, 0)
    toggleFormAndTable('js-form', 'imagenes')
});

const postData = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const {
            token
        } = await response.json();
        localStorage.setItem('jwt-toke', token)
        return token

    } catch (error) {
        alert(`Error: ${error}`)
    }
}
const getImg = async (jwt) => {

    try {
        const response = await fetch('http://localhost:3000/api/photos', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        const {
            data
        } = await response.json();
        return data;

    } catch (error) {
        console.log(`Error: ${error}`)
    }
}
//la construccion de las fotos
const construccionTabla = (data, n) => {
    let div = document.getElementById('js-table-img');
    div.innerHTML = `
    <div class="row>  
    <div class="col-12>
    <div class="row">
    <div class="col-6">
    <h3 class="text-aling:rigth">Feed</h3>
    </div>
    <div class="col-6 text-right"></div>
    <button class="btn btn-primary" onclick="cerrar()">Cerrar</button>
    </div>        
    <img src="${data[n].download_url}" width="500">
    <p>Autor: ${data[n].author}</p>
    
    </div>    
    </div>`

}
const sumarImagenes = async (pagina, jwt) => {
    try {
        const response = await fetch(`http://localhost:3000/api/photos?page=${pagina}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })     
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}
const toggleFormAndTable = (form, imagenes) => {
    $(`#${form}`).toggle()
    $(`#${imagenes}`).toggle()
}
const init = async () => {
    const token = localStorage.getItem('jwt-token')
    if (token) {
        const imagenes = await getImg(token)
        const n= 0;
        construccionTabla(imagenes,n)
        toggleFormAndTable('js-form', 'imagenes')
    }
}
init()
 

    
    
 */