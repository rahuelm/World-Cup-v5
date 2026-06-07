
const pots=[
["🇦🇷 Argentina","🇧🇷 Brazil","🇫🇷 France","🏴 England","🇪🇸 Spain","🇵🇹 Portugal","🇩🇪 Germany","🇳🇱 Netherlands","🇧🇪 Belgium","🇭🇷 Croatia","🇺🇾 Uruguay","🇲🇦 Morocco"],
["🇨🇴 Colombia","🇯🇵 Japan","🇺🇸 USA","🇲🇽 Mexico","🇨🇭 Switzerland","🇦🇹 Austria","🇸🇪 Sweden","🇸🇳 Senegal","🇰🇷 South Korea","🇳🇴 Norway","🇪🇨 Ecuador","🇹🇷 Türkiye"],
["🇩🇿 Algeria","🇦🇺 Australia","🇨🇦 Canada","🇨🇮 Côte d'Ivoire","🇨🇿 Czechia","🇪🇬 Egypt","🇮🇷 Iran","🇵🇾 Paraguay","🏴 Scotland","🇧🇦 Bosnia & Herzegovina","🇬🇭 Ghana","🇶🇦 Qatar"],
["🇭🇹 Haiti","🇨🇼 Curaçao","🇹🇳 Tunisia","🇳🇿 New Zealand","🇨🇻 Cabo Verde","🇸🇦 Saudi Arabia","🇮🇶 Iraq","🇯🇴 Jordan","🇨🇩 Congo DR","🇺🇿 Uzbekistan","🇵🇦 Panama","🇿🇦 South Africa"]
];
let cards=[],idx=0,auto=null;

function shuffle(a){let x=[...a];for(let i=x.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}

function generateDraw(){
 const names=document.getElementById('participants').value.split('\n').filter(Boolean);
 const draw=names.map(n=>({name:n,teams:[]}));
 pots.forEach(p=>{
   const s=shuffle(p);
   draw.forEach((d,i)=>d.teams.push(s[i]));
 });
 document.getElementById('meta').innerText='Draw ID: '+Date.now();
 const r=document.getElementById('results');
 r.innerHTML='';
 draw.forEach(d=>{
   const c=document.createElement('div');
   c.className='card';
   c.innerHTML='<h3>👓 '+d.name+'</h3>'+d.teams.map(t=>'<div class="team">'+t+'</div>').join('');
   r.appendChild(c);
 });
 cards=[...document.querySelectorAll('.card')];
 idx=0;
}
function revealNext(){if(idx<cards.length){cards[idx].classList.add('show');idx++;}}
function toggleAuto(){
 if(auto){clearInterval(auto);auto=null;return;}
 auto=setInterval(()=>{if(idx<cards.length)revealNext();else clearInterval(auto);},1500);
}
function downloadImage(){
 html2canvas(document.body,{scale:2}).then(c=>{
  const a=document.createElement('a');
  a.download='sweepstake.jpg';
  a.href=c.toDataURL('image/jpeg');
  a.click();
 });
}
