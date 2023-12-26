import f3 from '../src/index.js'

var pwd = prompt("Enter password:");

// fetch("./data.json").then(r => r.json()).then(data => {
//   const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), pwd);
//   alert("encrypted : " + encrypted);
//   console.log(encrypted);
  

//   // save
//   const encodedEncrypted = encrypted.toString();
//   const blob = new Blob([encodedEncrypted], { type: 'text/plain' }); // Adjust MIME type as needed
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'encrypted_data.txt'; // Desired filename
//   link.click();


fetch("./data.enc").then(r => r.text()).then(encrypted => {
// fetch("./data.enc").then(r => r.text()).then(encrypted => {
  alert("pwd  : " + pwd);
  console.log(encrypted);
  // alert("r : " + r.toString())
  // console.log(r.text());

  // data = JSON.stringify(data);
  // alert("data : " + data);
  // var encrypted = CryptoJS.DES.encrypt(data, pwd);

  // let decData = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Utf8)
  // alert("encrypted : " + encrypted);
  // const encryptedArray = CryptoJS.lib.WordArray.create(encrypted);
  // const encryptedArray = CryptoJS.enc.Base64.parse(encrypted);
  // alert("encryptedArray : " + encryptedArray);
  // console.log(encryptedArray);
  // const decrypted = CryptoJS.AES.decrypt(encrypted, 'a', { format: CryptoJS.format.OpenSSL });
  const decrypted = CryptoJS.AES.decrypt(encrypted, "a");
  // const rawData = atob(encrypted);
  // alert("rawData : " + rawData);
  // const iv = rawData.slice(0, 16);
  // const ciphertext = rawData.slice(16);
  // alert("iv : " + iv);
  // alert("ciphertext : " + ciphertext);  
  // const key = CryptoJS.enc.Utf8.parse('a');
  // // var decrypted = CryptoJS.AES.decrypt(encrypted, pwd);
  // const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
  //     iv: CryptoJS.enc.Hex.parse(iv),
  //     mode: CryptoJS.mode.CBC,
  //     padding: CryptoJS.pad.Pkcs7
  // });
  alert("decrypted : " + decrypted)
  console.log(decrypted);
  // var data = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  // var enc = CryptoJS.AES.encrypt(JSON.stringify(data), pwd);
  // var data = CryptoJS.enc.Base64.parse(encrypted);
  // alert("data : " + data);
  var data = decrypted.toString(CryptoJS.enc.Utf8);
  console.log(data);
  const dataObj = JSON.parse(data);
  console.log(dataObj); 
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