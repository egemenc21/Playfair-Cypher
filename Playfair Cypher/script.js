const decrypted_prf = document.getElementById("decrypted-text");
const btn = document.getElementById("btn");

const alphabet = "abcdefghiklmnopqrstuvwxyz";
let encryptedText =
  "KXJEY UREBE ZWEHE WRYTU HEYFS KREHE GOYFI WTTTU OLKSY CAJPO BOTEI ZONTX BYBWT GONEY CUZWR GDSON SXBOU YWRHE BAAHY USEDQ";
let secretKey = "ROYAL NEW ZEALAND NAVY";
let decrypted = " ";
secretKey = secretKey.toLowerCase();
encryptedText = encryptedText.toLowerCase();

//to remove the duplicate characters in our key
const removeDuplicateCharacters = (string) => {
  return string
    .split("")
    .filter(function (item, index, self) {
      return self.indexOf(item) == index;
    })
    .join("");
};

//adding alphabet to the end of the key 
secretKey = secretKey += alphabet;
secretKey = removeDuplicateCharacters(secretKey).split(" ").join("");

//removing all spaces from string
encryptedText = encryptedText.split(" ").join("");

//Creating a 5x5 matrix according to the key
const createMatrix = (key) => {
  let playfairMatrix = [];
  for (let i = 0; i < key.length; i += 5) {
    let subMatrix = [key[i], key[i + 1], key[i + 2], key[i + 3], key[i + 4]];
    playfairMatrix.push(subMatrix);
  }
  return playfairMatrix;
};

//grouping the character by pairs
const groupCharacters = (input) => {
  let inputArray = [];
  for (let i = 0; i < input.length; i += 2) {
    let subArray = [input[i], input[i + 1]];
    inputArray.push(subArray);
  }
  return inputArray;
};
// basic decryption rules of playfair cipher
function rule(row1,row2,col1,col2){
  if (row1 === row2) {
    col1 =  (col1 + 4)%5
    col2 =  (col2 + 4)%5      
    char1 = matrix[row1][col1];
    char2 = matrix[row2][col2];
  } else if (col1 === col2) {
    row1 = (row1 +4)%5
    row2 = (row2 +4)%5
    char1 = matrix[row1][col1];
    char2 = matrix[row2][col2];
  } else {
    char1 = matrix[row1][col2];
    char2 = matrix[row2][col1];
  }
  return char1 + char2 + ' '
}
//applying the rules by each pair
function switchIndexes(arr) {
  for(let i=0; i<arr.length; i++){
    let char1 = arr[i][0];
    let char2 = arr[i][1];
    let col1, col2, row1, row2;

    //because there is no j in the matrix we have to change it to 'i'   
    if(char1 === 'j'){
      char1 = 'i'
    }else if(char2 === 'j'){
      char2 = 'i'
    }
    //iterating through all matrix
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {        
        if (matrix[x][y] === char1) {
          col1 = y;
          row1 = x;
        }
        if (matrix[x][y] === char2) {
          col2 = y;
          row2 = x;
        }        
      }
    }
    
  decrypted += rule(row1,row2,col1,col2);
    
}
//the two-character 'TT' in the ciphertext corresponded to the two-character 'TT' in the plaintext test
return decrypted.replace('ss','tt');
}
const matrix = createMatrix(secretKey);
const encryptedTextArray = groupCharacters(encryptedText);
const decryptedText = switchIndexes(encryptedTextArray);

btn.addEventListener('click',function(){
  decrypted_prf.textContent = `
  ${decryptedText}
 `;
})




console.log(decryptedText);



