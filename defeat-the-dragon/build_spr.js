// 24x24 スプライトを座標指定で生成（左右対称はミラー）
const N=24;
function mk(){return Array.from({length:N},()=>Array(N).fill('.'));}
function S(g,x,y,c){if(x>=0&&x<N&&y>=0&&y<N)g[y][x]=c;}
function row(g,y,x0,x1,c){for(let x=x0;x<=x1;x++)S(g,x,y,c);}
function rect(g,x0,y0,x1,y1,c){for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)S(g,x,y,c);}
function mirror(g){for(let y=0;y<N;y++)for(let x=0;x<12;x++){if(g[y][x]!=='.')g[y][N-1-x]=g[y][x];}}
function rows(g){return g.map(r=>r.join(''));}

const SPR={};

// ---------- SLIME ----------
(function(){
  const g=mk();
  const rng=[[7,9,11],[8,7,11],[9,6,11],[10,5,11],[11,4,11],[12,4,11],
            [13,3,11],[14,3,11],[15,3,11],[16,3,11],[17,3,11],[18,4,11],[19,5,11],[20,7,11]];
  rng.forEach(([y,a,b])=>row(g,y,a,b,'g'));
  // 下側を濃く
  row(g,18,4,11,'G');row(g,19,5,11,'G');row(g,20,7,11,'G');
  // ハイライト
  S(g,6,11,'w');S(g,7,11,'w');S(g,6,12,'w');
  mirror(g);
  // 目（ミラー後に左右へ）
  rect(g,7,13,8,15,'w');rect(g,15,13,16,15,'w');
  rect(g,8,14,8,15,'e');rect(g,15,14,15,15,'e');
  // 口
  row(g,18,10,13,'k');S(g,9,17,'k');S(g,14,17,'k');
  SPR.slime=rows(g);
})();

// ---------- GOBLIN ----------
(function(){
  const g=mk();
  // 耳
  S(g,4,5,'G');S(g,4,6,'G');S(g,5,6,'G');S(g,5,7,'g');
  // 頭
  const head=[[6,6,11],[7,5,11],[8,4,11],[9,4,11],[10,4,11],[11,4,11],[12,5,11]];
  head.forEach(([y,a,b])=>row(g,y,a,b,'g'));
  // からだ
  const body=[[13,5,11],[14,4,11],[15,4,11],[16,4,11],[17,5,11],[18,5,11]];
  body.forEach(([y,a,b])=>row(g,y,a,b,'G'));
  // あし
  rect(g,5,19,6,22,'G');
  mirror(g);
  // 目・口
  rect(g,7,9,8,10,'e');rect(g,15,9,16,10,'e');
  row(g,12,9,14,'R');S(g,10,12,'R');S(g,13,12,'R');
  // こんぼう（右手・非対称）
  rect(g,18,12,19,13,'d');rect(g,18,9,20,11,'d');
  SPR.goblin=rows(g);
})();

// ---------- BAT ----------
(function(){
  const g=mk();
  // つばさ（左）
  const wing=[[5,1,3],[6,1,6],[7,2,9],[8,3,9],[9,4,9],[10,5,9],[11,6,9]];
  wing.forEach(([y,a,b])=>row(g,y,a,b,'c'));
  // つばさの骨
  S(g,1,5,'S');S(g,1,6,'S');S(g,2,7,'S');S(g,3,8,'S');
  // からだ
  rect(g,9,7,11,14,'c');row(g,15,9,11,'c');
  // 耳
  S(g,8,4,'k');S(g,9,4,'k');S(g,10,5,'k');
  mirror(g);
  // 顔
  rect(g,9,8,10,9,'r');rect(g,13,8,14,9,'r');
  S(g,9,8,'w');S(g,14,8,'w');
  // きば
  S(g,11,12,'w');S(g,12,12,'w');
  SPR.bat=rows(g);
})();

// ---------- SKELETON ----------
(function(){
  const g=mk();
  // ずがいこつ
  const sk=[[4,7,11],[5,5,11],[6,4,11],[7,4,11],[8,4,11],[9,5,11]];
  sk.forEach(([y,a,b])=>row(g,y,a,b,'n'));
  row(g,10,6,11,'n');row(g,11,7,11,'n');
  // あご
  row(g,12,7,11,'n');
  // ろっこつ
  rect(g,8,14,11,14,'n');rect(g,8,16,11,16,'n');rect(g,8,18,11,18,'n');
  rect(g,9,13,11,19,'n');
  mirror(g);
  // 目・鼻
  rect(g,7,7,8,8,'e');rect(g,15,7,16,8,'e');
  S(g,11,9,'e');S(g,12,9,'e');
  // は
  row(g,11,9,14,'k');
  // あばらの陰影
  for(let y=13;y<=19;y++){g[y][11]='c';g[y][12]='c';}
  // けん（左手・非対称）
  rect(g,3,9,4,20,'S');rect(g,2,8,5,9,'S');S(g,3,21,'c');
  SPR.skeleton=rows(g);
})();

// ---------- DRAGON ----------
(function(){
  const g=mk();
  // つばさ（左）
  const wing=[[3,1,3],[4,1,5],[5,2,7],[6,3,8],[7,4,8],[8,5,8]];
  wing.forEach(([y,a,b])=>row(g,y,a,b,'R'));
  S(g,1,3,'r');S(g,1,4,'r');
  // 角
  S(g,7,2,'o');S(g,8,1,'o');
  // あたま
  const head=[[4,8,11],[5,7,11],[6,6,11],[7,6,11],[8,7,11]];
  head.forEach(([y,a,b])=>row(g,y,a,b,'r'));
  // むね・どう
  const body=[[9,6,11],[10,5,11],[11,4,11],[12,4,11],[13,4,11],[14,5,11],[15,6,11]];
  body.forEach(([y,a,b])=>row(g,y,a,b,'r'));
  // おなか（明るい）
  rect(g,8,11,11,15,'y');
  // あし
  rect(g,5,16,7,21,'r');
  // しっぽ
  S(g,3,15,'r');S(g,2,16,'r');S(g,2,17,'r');S(g,1,18,'r');
  mirror(g);
  // 目
  rect(g,7,6,8,7,'e');rect(g,15,6,16,7,'e');S(g,7,6,'y');S(g,16,6,'y');
  // きば
  S(g,9,9,'w');S(g,14,9,'w');
  // りんかく濃く（背中）
  row(g,9,8,15,'R');
  SPR.dragon=rows(g);
})();

// ---------- HERO（左向き・非対称） ----------
(function(){
  const g=mk();
  // かぶと
  rect(g,8,3,15,4,'S');rect(g,7,5,16,8,'S');
  S(g,8,5,'y');S(g,15,5,'y');         // 角飾り
  rect(g,9,9,14,9,'k');               // ひさし
  // かお
  rect(g,9,10,14,12,'s');
  rect(g,9,11,9,11,'e');rect(g,11,11,11,11,'e'); // 目（左向き）
  // どう（よろい・青）
  rect(g,8,13,15,19,'B');
  rect(g,9,14,14,18,'b');
  rect(g,11,14,12,19,'S');            // むねのライン
  // うで
  rect(g,6,14,7,18,'b');rect(g,16,14,17,18,'b');
  // あし
  rect(g,9,20,10,23,'k');rect(g,13,20,14,23,'k');
  // けん（左・非対称、構える）
  rect(g,3,6,4,17,'S');rect(g,2,5,5,6,'S');S(g,3,18,'y');rect(g,2,17,5,18,'y');
  // たて（右・非対称）
  rect(g,18,12,20,19,'y');rect(g,19,13,19,18,'o');
  SPR.hero=rows(g);
})();

// ---------- MUSHROOM ----------
(function(){
  const g=mk();
  const cap=[[4,8,11],[5,6,11],[6,5,11],[7,4,11],[8,3,11],[9,3,11],[10,3,11],[11,4,11]];
  cap.forEach(([y,a,b])=>row(g,y,a,b,'r'));
  row(g,11,4,11,'R');S(g,3,9,'R');S(g,3,10,'R');
  S(g,6,7,'w');S(g,7,7,'w');S(g,5,9,'w');S(g,9,9,'w');
  for(let y=12;y<=19;y++)row(g,y,7,11,'n');
  row(g,20,6,11,'n');
  mirror(g);
  rect(g,8,14,8,15,'e');rect(g,15,14,15,15,'e');
  row(g,17,10,13,'k');
  SPR.mushroom=rows(g);
})();

// ---------- WOLF ----------
(function(){
  const g=mk();
  S(g,5,3,'S');S(g,6,3,'c');S(g,5,4,'c');S(g,6,4,'c');S(g,7,5,'c');
  for(let y=5;y<=11;y++)row(g,y,4,11,'c');
  for(let y=7;y<=11;y++)row(g,y,6,11,'S');
  rect(g,6,7,7,8,'y');S(g,6,8,'e');
  rect(g,10,10,11,11,'k');
  S(g,9,12,'w');S(g,10,12,'w');
  for(let y=13;y<=19;y++)row(g,y,5,11,'c');
  rect(g,5,20,6,22,'c');rect(g,9,20,10,22,'c');
  mirror(g);
  rect(g,19,13,21,14,'c');rect(g,20,11,21,13,'c');
  SPR.wolf=rows(g);
})();

// ---------- MAGE ----------
(function(){
  const g=mk();
  const hood=[[3,8,11],[4,6,11],[5,5,11],[6,4,11]];
  hood.forEach(([y,a,b])=>row(g,y,a,b,'P'));
  for(let y=7;y<=9;y++)row(g,y,6,11,'e');
  S(g,7,8,'y');S(g,8,8,'y');
  const robe=[[10,4,11],[11,4,11],[12,4,11],[13,3,11],[14,3,11],[15,3,11],[16,3,11],[17,2,11],[18,2,11],[19,2,11],[20,2,11]];
  robe.forEach(([y,a,b])=>row(g,y,a,b,'p'));
  row(g,20,2,11,'P');row(g,19,2,11,'P');
  mirror(g);
  for(let y=6;y<=20;y++)S(g,3,y,'d');
  rect(g,2,4,4,5,'b');S(g,3,3,'b');
  SPR.mage=rows(g);
})();

// ---------- GOLEM ----------
(function(){
  const g=mk();
  for(let y=4;y<=7;y++)row(g,y,8,11,'c');
  S(g,9,6,'y');
  for(let y=8;y<=16;y++)row(g,y,4,11,'c');
  for(let y=9;y<=17;y++){S(g,2,y,'c');S(g,3,y,'c');}
  rect(g,5,17,7,22,'c');
  S(g,6,10,'d');S(g,7,12,'d');S(g,5,14,'d');S(g,9,11,'d');
  S(g,4,8,'S');S(g,4,9,'S');
  mirror(g);
  SPR.golem=rows(g);
})();

// ---------- KING SLIME（もりのボス） ----------
(function(){
  const g=mk();
  // おうかん
  S(g,6,2,'y');S(g,6,3,'y');S(g,8,2,'y');S(g,8,3,'y');S(g,10,3,'y');
  row(g,4,6,11,'y');row(g,5,6,11,'o');
  S(g,8,4,'r'); // ほうせき
  // からだ
  const body=[[6,8,11],[7,6,11],[8,5,11],[9,4,11],[10,4,11],
             [11,3,11],[12,3,11],[13,3,11],[14,3,11],[15,3,11],
             [16,3,11],[17,3,11],[18,4,11],[19,4,11],[20,5,11],[21,7,11]];
  body.forEach(([y,a,b])=>row(g,y,a,b,'g'));
  // したを こく
  row(g,19,4,11,'G');row(g,20,5,11,'G');row(g,21,7,11,'G');
  // ハイライト
  S(g,6,10,'w');S(g,7,10,'w');S(g,6,11,'w');
  mirror(g);
  // め
  rect(g,7,13,8,15,'w');rect(g,15,13,16,15,'w');
  rect(g,8,14,8,15,'e');rect(g,15,14,15,15,'e');
  // くち
  row(g,18,9,14,'k');S(g,8,17,'k');S(g,15,17,'k');
  SPR.kingslime=rows(g);
})();

// ---------- MINOTAUR（どうくつのボス） ----------
(function(){
  const g=mk();
  // つの（しろ）
  S(g,5,5,'n');S(g,4,4,'n');S(g,3,3,'n');S(g,2,3,'n');S(g,2,2,'w');
  // あたま
  const head=[[5,6,11],[6,5,11],[7,5,11],[8,5,11],[9,5,11],[10,5,11]];
  head.forEach(([y,a,b])=>row(g,y,a,b,'d'));
  // あたまの け（こい）
  row(g,5,9,11,'k');S(g,6,11,'k');
  // はな・くち（あかるい）
  rect(g,8,11,11,12,'s');
  // どう
  const body=[[13,6,11],[14,5,11],[15,4,11],[16,4,11],[17,4,11]];
  body.forEach(([y,a,b])=>row(g,y,a,b,'d'));
  // むねの かげ
  for(let y=13;y<=17;y++)S(g,11,y,'k');
  // うで
  rect(g,2,13,3,18,'d');S(g,2,19,'s');S(g,3,19,'s');
  // あし
  rect(g,5,18,7,22,'d');row(g,22,5,7,'k');
  mirror(g);
  // め（あか）
  rect(g,7,9,8,9,'r');rect(g,15,9,16,9,'r');
  // はなのあな
  S(g,10,12,'k');S(g,13,12,'k');
  SPR.minotaur=rows(g);
})();

// 出力（検証）
let bad=0;
Object.keys(SPR).forEach(n=>{
  const r=SPR[n];
  const ws=[...new Set(r.map(s=>s.length))];
  if(r.length!==24||ws.length!==1||ws[0]!==24){console.log('BAD',n,r.length,ws);bad++;}
});
console.log(bad?('BAD '+bad):'ALL 24x24 OK');

// ASCII プレビュー
Object.keys(SPR).forEach(n=>{
  console.log('--- '+n+' ---');
  SPR[n].forEach(r=>console.log(r.replace(/\./g,' ')));
});

// JS リテラル出力（HTML 埋め込み用）
const lit='var SPR={\n'+Object.keys(SPR).map(n=>{
  return '  '+n+':['+SPR[n].map(r=>JSON.stringify(r)).join(',')+']';
}).join(',\n')+'\n};';
require('fs').writeFileSync(require('path').join(__dirname,'spr_literal.txt'),lit);
console.log('\nliteral written');
