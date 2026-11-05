
'use strict';
let language='en';
const $=id=>document.getElementById(id);
$('language').addEventListener('click',()=>{language=language==='en'?'zh':'en';document.documentElement.lang=language==='zh'?'zh-CN':'en';document.querySelectorAll('[data-en]').forEach(el=>el.innerHTML=el.dataset[language]);$('language').textContent=language==='en'?'中文':'EN';$('language').setAttribute('aria-label',language==='en'?'Switch to Chinese':'切换到英文');updateFigure();});
let active=0;
function updateFigure(){const fig=window.PAPER_FIGURES[active];$('result-image').src=fig.src;$('result-image').alt=fig[language];$('result-zoom').href=fig.src;$('result-zoom').dataset.caption=fig[language];$('result-caption').textContent=fig[language];$('result-description').textContent=fig[language+'Description'];document.querySelectorAll('[data-figure]').forEach((button,i)=>button.setAttribute('aria-selected',String(i===active)));}
document.querySelectorAll('[data-figure]').forEach(button=>button.addEventListener('click',()=>{active=+button.dataset.figure;updateFigure();}));
const dialog=$('figure-dialog');
document.querySelectorAll('[data-zoom]').forEach(link=>link.addEventListener('click',e=>{if(typeof dialog.showModal!=='function')return;e.preventDefault();$('dialog-image').src=link.href;$('dialog-image').alt=link.dataset.caption;$('dialog-caption').textContent=link.dataset.caption;dialog.showModal();}));
$('dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
$('copy-citation').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('bibtex').textContent);$('toast').textContent=language==='zh'?'引用已复制':'Citation copied';setTimeout(()=>$('toast').textContent='',2300);}catch{$('toast').textContent=language==='zh'?'请选中引用文本复制':'Select the citation text to copy';setTimeout(()=>$('toast').textContent='',3000);}});
updateFigure();
