import f3 from '../src/index.js'

var pwd = prompt("Enter password:");

fetch("./data.enc").then(r => r.text()).then(encrypted => {
// fetch("./data.enc").then(r => r.text()).then(encrypted => {
  // alert("pwd  : " + pwd);
  // console.log(encrypted);

  const decrypted = CryptoJS.AES.decrypt(encrypted, pwd);
  // alert("decrypted : " + decrypted)
  // console.log(decrypted);

  var data = decrypted.toString(CryptoJS.enc.Utf8);
  // console.log(data);
  const dataObj = JSON.parse(data);
  // console.log(dataObj); 
  return dataObj
})
.then(data => {
  const store = f3.createStore({
      data,
      node_separation: 250,
      level_separation: 150
    }),
    view = f3.d3AnimationView({
      store,
      cont: document.querySelector("#FamilyChart")
    }),
    Card = f3.elements.Card({
      store,
      svg: view.svg,
      card_dim: {w:220,h:70,text_x:75,text_y:15,img_w:60,img_h:60,img_x:5,img_y:5},
      // card_display: [d => d.data.label || '', d => d.data.desc || ''],
      card_display: cardDisplayMultiLine(),
      mini_tree: true,
      link_break: false
    })

  view.setCard(Card)
  store.setOnUpdate(props => view.update(props || {}))
  store.update.tree({initial: true})
})

function cardDisplayMultiLine() {
  return [
    (d) => `
      <tspan x="0" dy="14" font-size="14">${d.data["first name"] || ""} ${d.data["last name"] || ""}</tspan>
      <tspan x="0" dy="14" font-size="10">${d.data["birthday"] || ""} ${d.data["deathyear"] || ""}</tspan>
      <tspan x="0" dy="14" font-size="10">${d.data["occupation"] || ""}</tspan>
    `,
    () => ""
  ];
}