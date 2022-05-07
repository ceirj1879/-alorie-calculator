'use strict';
function calc(){
    const result=document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;
    
    
    sex= setV('sex');
    height=setV('height');
    weight=setV('weight');
    age=setV('age');
    ratio=setV('ratio');
    
    
    calcTotal();
    
    function calcTotal(){
        if(!sex||!height||!weight||!age||!ratio){
            result.textContent='____';
            return;
        }
        if(sex==='female'){
            result.textContent= Math.round((447.6+(9.2*weight)+(3.1*height)-(4.3*age))*ratio);
        }else{
            result.textContent= Math.round((88.36+(13.4*weight)+(4.8*height)-(5.7*age))*ratio);
        }
    }
    function gSI(pS,aC){
        const elements=document.querySelectorAll(`${pS} div`);
        elements.forEach(i=>{
            i.addEventListener('click', (e)=>{
            if(e.target.getAttribute('data-ratio')){
                ratio=+e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));
            }else{
                sex=e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            /* console.log(ratio,sex); */
            elements.forEach(e=>{
                e.classList.remove(aC);
            });
            e.target.classList.add(aC);
            calcTotal();
            });
            
    });
    }
    
    function gDI(selector){
        const input = document.querySelector(selector);
        input.addEventListener('input',()=>{
            if(input.value.match(/\D/g)){
                input.style.border='1px solid red';
            }else{
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')){
                case 'height':
                            height=+input.value;
                            localStorage.setItem('height', +input.value);
                            break;
                case 'weight':
                            weight=+input.value;
                            localStorage.setItem('weight', +input.value);
                            break;
                case 'age':
                            age=+input.value;
                            localStorage.setItem('age', +input.value);
                            break;
            }
            calcTotal();
        });
        
    }
    
    function setV(term){
        if(localStorage.getItem(term)){
           const t=localStorage.getItem(term);
            return t;
              }  
    }
    
    function fillForm(term,e){
        if(e.getAttribute('id')===term){
            e.value=localStorage.getItem(term);
        }
    }
    
    function iLS(selector,aC){
        const elements=document.querySelectorAll(selector);
        elements.forEach(e=>{
            e.classList.remove(aC);
            if(e.getAttribute('id')===localStorage.getItem('sex')){
                e.classList.add(aC);
            }
            if(e.getAttribute('data-ratio')){
                if(e.getAttribute('data-ratio')===localStorage.getItem('ratio')){
                    e.classList.add(aC);
                }
            }
    
            fillForm('height',e);
            fillForm('weight',e);
            fillForm('age',e);
        });
    }
    
    
    
    gSI('#gender','calculating__choose-item_active');
    gSI('.calculating__choose_big','calculating__choose-item_active');
    gDI('#height');
    gDI('#weight');
    gDI('#age');
    iLS('#gender div','calculating__choose-item_active');
    iLS('.calculating__choose_big div','calculating__choose-item_active');
    iLS('.calculating__choose_medium input','calculating__choose-item_active');   

}

export default calc;