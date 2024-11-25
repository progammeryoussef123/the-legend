let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let type = document.getElementById("type");
let sudimet = document.getElementById("sudimet");
let scrollWed = document.getElementById("scrollWed")
let images = 
[
    'https://i.pinimg.com/736x/f0/00/cb/f000cb054e6cf6db17de787c28d9a7b5.jpg',
    'https://i.pinimg.com/736x/11/d6/8c/11d68c7560ffc623974c64a70a2f5be3.jpg',
    'https://i.pinimg.com/736x/a1/b0/22/a1b0227af89b9aac8b13b338597432a6.jpg'
];
let start = 0;
let mood = 'create';
let x;


/* change images every second ?1*/
function changeIme() {
    let imgLogo = document.getElementById("imgLogo");
    imgLogo.src = images[start];
    start = (start + 1) % images.length;
}
window.onload = function() {
    changeIme();
    setInterval(changeIme, 1000);
};


/*collect amd display result ?!*/
function equal(){
    if(price.value != ''){
        let result = (+price.value +  +taxes.value +  +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040'; 
    }
    else{
        total.innerHTML = '';
        total.style.backgroundColor = '#8f0000';
    }
}


/* save data*/
let datapro ;
if(localStorage.width != null){
    datapro = JSON.parse(localStorage.width);
}
else{
    datapro = [];
}
sudimet.onclick = ()=>{
    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        ads : ads.value,
        taxes : taxes.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        type : type.value.toLowerCase(),
    };
if(title.value != '' && price.value != '' && type.value != '' && newPro.count <= 100){
        if(mood === 'create'){
        if(newPro.count > 1){
        for(let i = 0; i < newPro.count ; i++)
        {
            datapro.push(newPro);
        }
    }
        else
        {
            datapro.push(newPro);   
        }
    }
    else{
        datapro[x] = newPro;
        mood = 'create';
        count.style.display = 'block';
        sudimet.innerHTML = 'Create';
    }
}
  




    localStorage.width = JSON.stringify(datapro);
    clear();
    read();
}


/*onclick to sudimet => clear input value ?!*/
function clear(){
    taxes.value = '';
    title.value = '';
    price.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    type.value = '';
}


/*Read Data ?!*/
function read(){
    equal();
    let table = '';
    for(let i = 0; i < datapro.length ; i++){
        table += `
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].type}</td>
                <td><button onclick= "upData(${i})" id="updeta">updeta</button></td>
                <td><button onclick ="clean(${i})" id="delete">delete</button></td>
            </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;
    let deleteAll = document.getElementById("deleteAll");
    if(datapro.length > 0 ){
        deleteAll.innerHTML = `
        <button onclick ="deleteAll()"> Delete All (${datapro.length})</button>
        `
    }
    else{
        deleteAll.innerHTML = '';

    }
}
read();


/*Delete dataPro[i] ?!*/
function clean(i){
    datapro.splice(i,1);
    localStorage.width = JSON.stringify(datapro);
    read();    
}


/*Delete All datePro ?!*/
function deleteAll(){
    datapro.splice(0);
    localStorage.clear();
    read();
}


/*Updeta data ?!*/
function upData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    equal();
    count.style.display = 'none';
    type.value = datapro[i].type;
    mood = 'updeta';
    x = i;
    sudimet.innerHTML = 'Up Deta';
    scroll({
        top:683,
        behavior:'smooth',
    });
    title.focus();
}

/*search data ?!*/
let searchMood = 'title';
function searchDta(id){
    let search = document.getElementById("search");
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }
    else{
        searchMood = 'type';
        search.placeholder = 'Search By Type';
    }  
    search.focus();
    search.value = '';
    read();
}

function searchJO(value){
    let table = '';
    if(searchMood == 'title'){
        for(let i = 0; i < datapro.length ; i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].type}</td>
                    <td><button onclick= "upData(${i})" id="updeta">updeta</button></td>
                    <td><button onclick ="clean(${i})" id="delete">delete</button></td>
                </tr>
            `;
            }
        }
    }


    else{
        for(let i = 0; i < datapro.length ; i++){
            if(datapro[i].type.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].type}</td>
                    <td><button onclick= "upData(${i})" id="updeta">updeta</button></td>
                    <td><button onclick ="clean(${i})" id="delete">delete</button></td>
                </tr>
            `;
            }
        }   
    }
document.getElementById("tbody").innerHTML = table;
}

/*Scroll Websate ?!*/
window.onscroll = ()=>{
    if(scrollY >= 550){
        scrollWed.style.display = 'block';
    }
    else{
        scrollWed.style.display = 'none';
    }
}
scrollWed.onclick = () => {
     window.scrollTo({ 
        top: 0,
        left: 0, 
        behavior: 'smooth' 
    });
}
