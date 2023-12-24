'use strict'

const search = document.querySelector('[type=search]')
const code = document.querySelector('pre')

search.addEventListener('keyup', function(){
  let xhr = new XMLHttpRequest
  xhr.open('GET', '/search/' + search.value, true)
  xhr.onreadystatechange == function(){
    if(xhr.readyState === 4){
      code.textContent = xhr.responseText
    }
  }
  xhr.send()
}, false)