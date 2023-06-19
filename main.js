
let listaDeItens =[];
let itensAEditar;

const form            = document.querySelector('#form-itens');
const itensInput      = document.querySelector('#receber-item');
const UlItens         = document.querySelector('#lista-de-itens');
const UlItenComprados = document.querySelector('#itens-comprados');
const listaRecuperada = localStorage.getItem('listaDeItems');
itensInput.focus();

function atualizaLocalStorage(){
    localStorage.setItem('listaDeItems',JSON.stringify(listaDeItens));
}
if(listaRecuperada){
    listaDeItens = JSON.parse(listaRecuperada);
    mostrarItem();
}else{
    listaDeItens =[];
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    salvarItem();
    mostrarItem();
    itensInput.focus();

});

function salvarItem(){
    const comprasItem = itensInput.value;
    
    const checarDuplicado =listaDeItens.some((element)=> 
        element.valor.toUpperCase() === comprasItem.toUpperCase()
    );

    checarDuplicado? alert('item já existe'): listaDeItens.push(
        {
         valor:comprasItem,
         checar:false
        }
    );
    itensInput.value =null;
}

function mostrarItem(){
    UlItens.innerHTML ='';
    UlItenComprados.innerHTML ='';
    listaDeItens.forEach((element,index)=>{

        if(element.checar){
            UlItenComprados.innerHTML +=`
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${element.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `
        }else{
            UlItens.innerHTML +=`
                    
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${element.valor}" ${index!== Number(itensAEditar) ?'disabled':'' }></input>
                </div>
                <div>
               ${index === Number(itensAEditar)? '<button onclick="salvarEdicao()"> <i class="fa-regular fa-floppy-disk is-clickable"> </i> </button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
        `
        }

    });

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');
        inputsCheck.forEach((i =>{
            i.addEventListener('click',(e)=>{
        
              const elementValue = e.target.parentNode.parentNode.getAttribute('data-value');
              listaDeItens[elementValue].checar = e.target.checked;
              console.log(listaDeItens[elementValue].checar);
              mostrarItem();
            });
        })
    );
    const deletarObjects = document.querySelectorAll('.deletar')

        deletarObjects.forEach((i =>{
            i.addEventListener('click',(e)=>{
             const elementValue = e.target.parentNode.parentNode.getAttribute('data-value');

                listaDeItens.splice(elementValue,1)
                mostrarItem();
            });
        })
    );
    const editarItens = document.querySelectorAll(".editar");

        editarItens.forEach((i =>{
            i.addEventListener('click',(e)=>{
                itensAEditar = e.target.parentElement.parentElement.getAttribute('data-value');
                 console.log(itensAEditar);
                mostrarItem();
            });
        })
    );

    atualizaLocalStorage();
}

function salvarEdicao(){
    const itemEditado = document.querySelector(`[data-value="${itensAEditar}"] input[type="text"`);

    console.log(itemEditado);
    listaDeItens[itensAEditar].valor = itemEditado.value;

    itensAEditar = -1;
    mostrarItem();

}