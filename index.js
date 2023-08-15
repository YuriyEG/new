let body = document.querySelector('body');

// app
const app = document.createElement('div');
app.classList.add('app');
app.style.width = '660px';
app.style.minHeight = '760px';
app.style.backgroundColor = 'rgba(196, 196, 196, 1)';
app.style.margin =  '0 auto';
app.style.paddingTop = '62px';
app.style.paddingBottom = '48px';
//form 



body.appendChild(app);



const input = document.createElement('input');

input.classList.add('form');
input.style.width = '500px';
input.style.height = '60px';
input.backgroundColor = 'white';

input.style.border = 'none';
input.style.fontSize = '48px';
input.style.lineHeight = '56px';
input.style.marginLeft = '78px';

app.appendChild(input);

const resultBox = document.createElement('div');

resultBox.style.width = '500px';
resultBox.style.height = 'auto';
resultBox.style.marginLeft = '78px';
app.append(resultBox);



function addToResults(element) {
    console.log(element)
    
    let content = element.name;
    const resultElement = document.createElement('div');

resultElement.classList.add('resultElement');
resultElement.style.width = '500px';
resultElement.style.height = '44px';
resultElement.style.backgroundColor = 'rgba(227, 227, 227, 1)';
resultElement.style.border = '2px solid black';

resultElement.textContent = content;
resultElement.owner = element.owner.login;
resultElement.name = element.name;
resultElement.stars = element.stargazers_count;
resultElement.style.fontSize = '30px';
resultElement.style.lineHeight = '36px';
resultElement.style.textIndent = '12px';
resultElement.id = Math.random();

resultBox.appendChild(resultElement);

resultElement.addEventListener('mouseover', (e) => {
    if (e.target === resultElement) {
        e.target.style.backgroundColor = 'rgba(101, 205, 249, 1)'
    }
})

resultElement.addEventListener('mouseout', (e) => {
    if (e.target === resultElement) {
        e.target.style.backgroundColor = 'rgba(227, 227, 227, 1)'
    }
})

}



const reposWrapper = document.createElement('div');
reposWrapper.classList.add('reposWrapper');
reposWrapper.style.width = '500px';
reposWrapper.style.marginLeft = '78px';
reposWrapper.style.marginTop = '52px';



function addToRepList (nam, ownr, strs) {


const repoElement = document.createElement('div');
repoElement.classList.add('repoElement');
repoElement.style.width = '500px';
repoElement.style.height = '100px';
repoElement.style.backgroundColor = 'rgba(226, 123, 235, 1)';
repoElement.style.border = '2px solid black';
repoElement.style.display = 'flex';
repoElement.style.flexDirection = 'row';
repoElement.style.justifyContent = 'space-between';

const closeElement = document.createElement('div');
closeElement.classList.add('closeElement');
closeElement.style.width = '42px';
closeElement.style.height = '38px';
closeElement.style.position = 'relative';
closeElement.style.display = 'inline-block';
closeElement.style.marginTop = '32px';
closeElement.style.marginRight = '32px'; 

const rect = document.createElement('div');
rect.style.width = '4px';
rect.style.height = '60px';
rect.style.backgroundColor = 'red';
rect.style.rotate = '47deg';
rect.style.position = 'absolute';
rect.style.left = '19px';
rect.style.top = '-11px';
rect.style.pointerEvents = 'none';
closeElement.appendChild(rect);

const rect2 = document.createElement('div');
rect2.style.width = '4px';
rect2.style.height = '60px';
rect2.style.backgroundColor = 'red';
rect2.style.rotate = '-47deg';
rect2.style.position = 'absolute';
rect2.style.left = '19px';
rect2.style.top = '-11px';
closeElement.appendChild(rect2);

const repoBody = document.createElement('div');
repoBody.style.width = '320px';
repoBody.style.height = '85px';

repoBody.style.marginTop = '6px';
repoBody.style.marginLeft = '16px';
repoBody.style.fontSize = '24px';
repoBody.style.lineHeight = '28px';

repoElement.appendChild(repoBody);

const repoName = document.createElement('div');
let name = nam;
repoName.textContent = `name: ${name}`;

const repoOwner = document.createElement('div');
let owner = ownr;
repoOwner.textContent = `owner: ${owner}`;

const repoStars = document.createElement('div');
let stars = strs;
repoStars.textContent = `stars: ${stars}`;

repoBody.appendChild(repoName);
repoBody.appendChild(repoOwner);
repoBody.appendChild(repoStars);

repoElement.appendChild(closeElement);


//close-element

app.appendChild(reposWrapper);
reposWrapper.appendChild(repoElement);

let childrens = [...resultBox.children];
       for (let i=0; i<childrens.length; i++) {
        let child = childrens[i];
        child.remove();
       }

}






app.addEventListener('click', (e) => {
    if (e.target.classList.value === 'closeElement') {
        let x =  e.target.parentElement;

        console.log(x);
        x.remove();
    }
    if (e.target.classList.value === 'resultElement') {

        console.log(e.target.owner);
        console.log(e.target.name);
        console.log(e.target.stars);
        addToRepList(e.target.name, e.target.owner, e.target.stars);
    }
});

let target = 'todolist';
let number = 20;



//функция запроса

function debounce(f, ms) {
    
    let isCooldown = false;
  
    return function() {
      if (isCooldown) return;
  
      f.apply(this, arguments);
  
      isCooldown = true;
  
      setTimeout(() => isCooldown = false, ms);
    };
  
  }

async function getData(e) {

let request = e.replace(/\s/g,'');
if (resultBox.children) {

        let childrens = [...resultBox.children];
        for (let i=0; i<childrens.length; i++) {
         let child = childrens[i];
         child.remove();
        }
 
     }
 


if (request !== '') {
    let x =  await fetch(`https://api.github.com/search/repositories?q=${request}&per_page=5`); 
 
        let res =  await x.json();
    let list = res.items;
    list.forEach(element => {
        addToResults(element);
    });
}

    
    
    

}


let debouceFn = debounce( getData, 1000);

async function getPredictions(e) {
 
    
if (e === '') {
    let childrens = [...resultBox.children];
       for (let i=0; i<childrens.length; i++) {
        let child = childrens[i];
        child.remove();
       }
}

debouceFn(e);
  }

input.addEventListener('input', e =>  getPredictions(e.target.value));
  
