// v1775061083 - cache bust
// app.js - 房屋与生活 完整应用逻辑
var CLOUD_KEY='fangwu_yushenghuo_cloud';
var currentUser=null;

function getCloud(){try{return JSON.parse(localStorage.getItem(CLOUD_KEY)||'{}')}catch(e){return {}}}
function setCloud(d){localStorage.setItem(CLOUD_KEY,JSON.stringify(d))}

window.addEventListener('load',function(){gp('home');
  setTimeout(function(){
    var ld=document.getElementById('ld');
    if(ld){ld.classList.add('out');setTimeout(function(){ld.style.display='none'},600)}
  },1200);
  var saved=localStorage.getItem('fangwu_current_user');
  if(saved){try{currentUser=JSON.parse(saved)}catch(e){}}
  renderHomeNews();
  renderFangchan();
  renderCars();
  renderXueche();
  renderAllNews();
  window.addEventListener('scroll',function(){
    var btn=document.getElementById('stb');
    if(btn)btn.classList.toggle('on',window.scrollY>400);
  });
});


function gp(page){
  var grid=document.getElementById('mainGrid');
  if(!grid)return;
  var html='';
  if(page==='home'){html=renderHome();}
  else if(page==='fangchan'){html=renderFangchan();}
  else if(page==='tudi'){html=renderTudi();}
  else if(page==='diandongche'){html=renderCars();}
  else if(page==='dianji'){html=renderDianji();}
  else if(page==='wangyueche'){html=renderWangyueche();}
  else if(page==='xueche'){html=renderXueche();}
  else if(page==='news'){html=renderNews();}
  else if(page==='admin'){html=renderAdmin();}
  grid.innerHTML=html;
}

function renderTudi(){
  var items=TUDI_DATA.map(function(p){return '<div class="crd"><div class="ci">&#127968;</div><div class="cb"><span class="ctag">'+p.district+'</span><div class="ct">'+p.name+'</div><div class="cm"><span>¥'+p.price+'元/平</span></div></div></div>';}).join('');
  return '<h2>海口市土地信息</h2><div class="tab">'+items+'</div>';
}

function renderDianji(){
  var items=CAR_DATA.filter(function(c){return c.type==='电动车';}).map(function(c){return '<div class="crd"><div class="ci">&#128665;</div><div class="cb"><span class="ctag">'+c.district+'</span><div class="ct">'+c.name+'</div><div class="cm"><span>'+c.brand+'</span><span>¥'+c.price+'万</span></div></div></div>';}).join('');
  return '<h2>电动车信息</h2><div class="tab">'+items+'</div>';
}

function renderWangyueche(){
  var items=WYCHE_DATA.map(function(p){return '<div class="crd"><div class="ci">&#128241;</div><div class="cb"><div class="ct">'+p.title+'</div><div class="cm"><span>'+p.date+'</span></div></div></div>';}).join('');
  return '<h2>网约车服务</h2><div class="tab">'+items+'</div>';
}

function renderXueche(){
  var items=XUECHE_DATA.filter(function(x){return x.type==='驾校';}).map(function(x){return '<div class="crd"><div class="ci">&#127891;</div><div class="cb"><span class="ctag">'+x.district+'</span><div class="ct">'+x.name+'</div><div class="cm"><span>¥'+x.price+'</span></div></div></div>';}).join('');
  return '<h2>学车信息</h2><div class="tab">'+items+'</div>';
}
);
  list.innerHTML=lh;
}

function renderHomeNews(){
  var list=document.getElementById('homeNewsList');
  if(!list)return;
  var html='';
  FANGCHAN_POLICY.slice(0,5).forEach(function(p){
    html+='<div class="ni"><div class="nim">&#127968;</div><div class="nc">'
      +'<div class="nt">'+p.title+'</div>'
      +'<div class="nm"><span>'+p.date+'</span><span class="tag">'+p.source+'</span><span><i class="fas fa-eye"></i> '+p.views+'</span></div>'
      +'</div></div>';
  });
  list.innerHTML=html;
}

function renderAllNews(type){
  var list=document.getElementById('allNewsList');
  if(!list)return;
  var data=[];
  if(!type||type==='all'){
    data=FANGCHAN_POLICY.concat(XUECHE_DATA);
  }else if(type==='fangchan'){
    data=FANGCHAN_POLICY;
  }else if(type==='car'){
    data=CAR_DATA.map(function(c){return {title:c.name+' - '+c.desc,date:c.date,views:c.views,source:c.brand}});
  }else if(type==='xueche'){
    data=XUECHE_DATA;
  }
  var html='';
  data.slice(0,30).forEach(function(item){
    html+='<div class="ni"><div class="nim">&#128240;</div><div class="nc">'
      +'<div class="nt">'+(item.title||item.name||'')+'</div>'
      +'<div class="nm"><span>'+(item.date||'')+'</span><span class="tag">'+(item.source||'资讯')+'</span><span><i class="fas fa-eye"></i> '+(item.views||0)+'</span></div>'
      +'</div></div>';
  });
  list.innerHTML=html;
}

function switchFangchanTab(tab,el){
  document.querySelectorAll('#fangchanTabs .tab').forEach(function(t){t.classList.remove('on')});
  if(el)el.classList.add('on');
  var grids=['fangchanGrid','ershouGrid','policyList','gossipList'];
  grids.forEach(function(g){var e=document.getElementById(g);if(e)e.style.display='none'});
  if(tab==='loupan'){var e=document.getElementById('fangchanGrid');if(e){e.style.display='grid';renderFangchan()}}
  else if(tab==='ershou'){var e=document.getElementById('ershouGrid');if(e){e.style.display='grid';renderErshou()}}
  else if(tab==='policy'){var e=document.getElementById('policyList');if(e){e.style.display='flex';renderPolicy()}}
  else if(tab==='gossip'){var e=document.getElementById('gossipList');if(e){e.style.display='flex';renderGossip()}}
}

function renderGossip(){
  var list=document.getElementById('gossipList');
  if(!list)return;
  var gossips=[
    {title:'龙华区某楼盘烂尾？官方辟谣：已重组复工',date:'2026-03-28',views:1567},
    {title:'海口二手房交易新套路：低评估价避税风险大',date:'2026-03-26',views:1234},
    {title:'某中介公司卷款跑路，受害者已报案',date:'2026-03-24',views:2345},
    {title:'购房合同陷阱：这些条款要注意',date:'2026-03-22',views:987},
    {title:'海口部分区域房价或将迎来调整',date:'2026-03-20',views:1567},
    {title:'女子买二手房遇凶宅，状告原房东',date:'2026-03-18',views:3456},
    {title:'购房定金能退吗？这些情况可以！',date:'2026-03-15',views:1234},
    {title:'海口多个小区物业费涨价遭业主抵制',date:'2026-03-12',views:876},
    {title:'房产证迟迟办不下来？可能是这些问题',date:'2026-03-10',views:1456},
    {title:'海口学区房骗局：名校名额是假的',date:'2026-03-08',views:2876},
  ];
  var html='';
  gossips.forEach(function(g){
    html+='<div class="pi"><div class="pic">&#128680;</div><div class="pc">'
      +'<div class="pct">'+g.title+'</div>'
      +'<div class="pd">'+g.date+' &middot; <i class="fas fa-eye"></i> '+g.views+' 阅读</div>'
      +'</div></div>';
  });
  list.innerHTML=html;
}

function switchDistrict(page,district,el){
  var container=document.getElementById(page+'Districts');
  if(container)container.querySelectorAll('.db2').forEach(function(b){b.classList.remove('on')});
  if(el)el.classList.add('on');
  if(page==='fangchan')renderFangchan(district);
  else if(page==='ershou')renderErshou(district);
  else if(page==='car')renderCars(district);
}

function switchNewsTab(type,el){
  document.querySelectorAll('#newsTabs .tab').forEach(function(t){t.classList.remove('on')});
  if(el)el.classList.add('on');
  renderAllNews(type);
}

function toast(msg,type){
  type=type||'ok';
  var container=document.getElementById('tc');
  if(!container)return;
  var t=document.createElement('div');
  t.className='tost '+type;
  var icons={ok:'fa-check-circle',er:'fa-times-circle',wr:'fa-exclamation-circle'};
  t.innerHTML='<i class="fas '+(icons[type]||'fa-info-circle')+' ic"></i><span>'+msg+'</span>';
  container.appendChild(t);
  setTimeout(function(){t.style.opacity='0';t.style.transform='translateX(100%)';setTimeout(function(){t.remove()},300)},3000);
}


// ====== DETAIL MODAL FUNCTIONS ======
function showDetail(type, id){
  var data = null;
  if(type === 'loupan'){
    data = LOU_PAN.find(function(x){return x.id === id});
  }else if(type === 'ershou'){
    data = ERSHOU.find(function(x){return x.id === id});
  }else if(type === 'policy'){
    data = FANGCHAN_POLICY.find(function(x){return x.id === id});
  }else if(type === 'car'){
    data = CAR_DATA.find(function(x){return x.id === id});
  }else if(type === 'xueche'){
    data = XUECHE_DATA.find(function(x){return x.id === id});
  }
  if(!data){toast('Data not found','er');return;}
  var modal = document.getElementById('detailModal');
  var content = document.getElementById('detailContent');
  var name = data.name || data.title || 'Details';
  var html = '<div class="detail-header"><h2>'+name+'</h2></div><div class="detail-body">';
  html += '<div class="detail-img"><img src="https://picsum.photos/800/400?random='+Math.random()+'" alt="Image"></div>';
  
  if(type === 'loupan' || type === 'ershou'){
    html += '<div class="detail-info">';
    html += '<div class="di-row"><span class="di-label">Region:</span><span class="di-value">'+(data.district||'-')+'</span></div>';
    html += '<div class="di-row"><span class="di-label">Price:</span><span class="di-value">'+(data.price||'-')+'</span></div>';
    html += '<div class="di-row"><span class="di-label">Property Fee:</span><span class="di-value">'+(data.wy||'-')+' yuan/month</span></div>';
    html += '<div class="di-row"><span class="di-label">Parking:</span><span class="di-value">'+(data.tc||'-')+' yuan/month</span></div>';
    html += '<div class="di-row"><span class="di-label">School District:</span><span class="di-value">'+(data.xq||'-')+'</span></div>';
    html += '<div class="di-row"><span class="di-label">Date:</span><span class="di-value">'+(data.date||'-')+'</span></div>';
    html += '<div class="di-row"><span class="di-label">Views:</span><span class="di-value">'+(data.views||'-')+'</span></div>';
    html += '</div>';
    html += '<div class="detail-desc"><h3>Description</h3><p>'+(data.desc||'No description available.')+'</p></div>';
  }else if(type === 'policy'){
    html += '<div class="detail-info">';
    html += '<div class="di-row"><span class="di-label">Source:</span><span class="di-value">'+(data.source||'-')+'</span></div>';
    html += '<div class="di-row"><span class="di-label">Date:</span><span class="di-value">'+(data.date||'-')+'</span></div>';
    html += '<div class="di-row"><span class="di-label">Views:</span><span class="di-value">'+(data.views||'-')+'</span></div>';
    html += '</div>';
    html += '<div class="detail-desc"><h3>Policy Content</h3><p>'+(data.content||'No content available.')+'</p></div>';
  }else if(type === 'car'){
    html += '<div class="detail-info">';
    html += '<div class="di-row"><span class="di-label">Brand:</span><span class="di-value">'+(data.brand||'-')+'</span></div>';
    html += '<div class="di-row"><span class="di-label">Region:</span><span class="di-value">'+(data.district||'-')+'</span></div>';
    html += '<div class="di-row"><span class="di-label">Price:</span><span class="di-value">'+(data.price||'-')+' 万</span></div>';
    html += '<div class="di-row"><span class="di-label">Type:</span><span class="di-value">'+(data.type||'-')+'</span></div>';
    html += '<div class="di-row"><span class="di-label">Date:</span><span class="di-value">'+(data.date||'-')+'</span></div>';
    html += '<div class="di-row"><span class="di-label">Views:</span><span class="di-value">'+(data.views||'-')+'</span></div>';
    html += '</div>';
    html += '<div class="detail-desc"><h3>Description</h3><p>'+(data.desc||'No description available.')+'</p></div>';
  }else if(type === 'xueche'){
    html += '<div class="detail-info">';
    html += '<div class="di-row"><span class="di-label">Date:</span><span class="di-value">'+(data.date||'-')+'</span></div>';
    html += '<div class="di-row"><span class="di-label">Views:</span><span class="di-value">'+(data.views||'-')+'</span></div>';
    html += '</div>';
    html += '<div class="detail-desc"><h3>Content</h3><p>'+(data.content||data.title||'No content available.')+'</p></div>';
  }
  html += '<div class="detail-contact"><h3>Contact Us</h3><p>Phone: 13876699053</p></div>';
  html += '</div>';
  content.innerHTML = html;
  modal.classList.add('on');
}

function closeDetail(){
  document.getElementById('detailModal').classList.remove('on');
}
// END OF APP.JS
