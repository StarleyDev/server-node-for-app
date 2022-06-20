// Manutenção de pastas e arquivos
/**
 * @author Starley Cazorla
 */

'use sctict'
const fs = require('fs');
const path = require('path');

function criarPasta(nomePasta) {
  if (!fs.existsSync(nomePasta)) {
    //Efetua a criação do diretório
    fs.mkdirSync(nomePasta, { recursive: true });
  }
}

function deletarPasta(path) {
  fs.rmdirSync(path, { recursive: true });
}

function getPathImg(dir, nomeArquivo) {
  let caminho = dir + nomeArquivo + '.png';

  //passsing directoryPath and callback function
  // fs.readdirSync(process.cwd() + dir, function (err, files) {
  //     //handling error
  //     if (err) {
  //         return console.log('Unable to scan directory: ' + err);
  //     } 
  //     //listing all files using forEach
  //     files.forEach(function (file) {
  //         // Do whatever you want to do with the file
  //         console.log(file); 
  //     });
  // });


  // fs.readFileSync(, function (err, data) {
  //   if (err) {
  //     console.log(err);
  //     return false;
  //   }
  //   else {
      // console.log(data.toString());
      return process.cwd() + caminho;
    // }
  // });
}

// Using a function to set default app path
function getDir() {
  if (process.pkg) {
      return path.resolve(process.execPath + "/..");
  } else {
      return path.join(require.main ? require.main.path : process.cwd());
  }
}


/**
 * Salva a imagem em pasta local
 * @param {*} dir 
 * @param {*} nomeArquivo 
 * @param {*} data 
 * @param {*} isPrincipal 
 * @returns 
 */
function salvaImagens(dir, nomeArquivo, data, isPrincipal) {
  return new Promise((resolve, reject) => {

    try {
      let nomeOriginal = nomeArquivo;
      // console.log("🚀 ~ file: folders.util.js ~ line 27 ~ returnnewPromise ~ nomeOriginal", nomeOriginal)
      let arquivoEncontrado = true;
      let count = 2

      while (arquivoEncontrado) {
        if (isPrincipal && count === 2) {
          // console.log("🚀 ~ file: folders.util.js ~ line 33 ~ returnnewPromise ~ isPrincipal", isPrincipal)
          nomeArquivo = nomeOriginal + '-1';
        } else {
          nomeArquivo = nomeOriginal + '-' + count;
        }
        arquivoEncontrado = checkFile(dir + nomeArquivo + '.png') //.then(async (res) => {
        // console.log("🚀 ~ file: folders.util.js ~ line 39 ~ arquivoEncontrado=checkFile ~ dir + nomeArquivo", dir + nomeArquivo)
        if (arquivoEncontrado) {
          count += 1;
        }
      }

      let caminho = dir + nomeArquivo;
      // Caso não exista ira converter e salvar a imagem
      if (!arquivoEncontrado) {
        fs.writeFile(caminho + '.png', data, 'base64', function (err, result) {
          if (err) {
            console.log('error', err);
            reject(err);
          } else {
            // console.log('result', result);
            resolve(result);
          }

        });
      } else {
        resolve('Arquivo já existente!');
      }

    } catch (err) {
      reject(err);
      console.log(err);
    }

  });
}

function salvarArquivo(caminho, buffer, tipoOperacao) {
  return new Promise((resolve, reject) => {
    try {
      if (tipoOperacao === 'csv') {
        fs.writeFile(caminho, buffer, 'utf8', function (err, result) {
          if (err) {
            console.log('error', err);
          } else {
            console.log('result', result);
          }

        });
      } else {
        fs.writeFile(caminho, buffer, 'binary', function (err, result) {
          if (err) {
            console.log('error', err);
          } else {
            console.log('result', result);
          }

        });
      }
    } catch (err) {
      reject(err);
      console.log(err);
    } finally {
      console.log("file written successfully");
      resolve();
    }
  });
}

// async function abrirArquivo(caminho) {
//   try {
//     await open(caminho);
//   } catch (err) {
//     console.log(err)
//   } finally {
//     console.log('abriu arquivo')
//   }

// }

function convertImageToBase64(caminho, tipoOperacao) {
  if (tipoOperacao) {
    caminho += __dirname + '/assets/10224.jpg';
  }
  if (fs.existsSync(caminho)) {
    var imageAsBase64 = fs.readFileSync(caminho, 'base64');
    return imageAsBase64;
  } else {
    return null;
  }
}

function checkFile(path) {
  let retorno;
  if (fs.existsSync(path)) {
    retorno = true;
  } else {
    retorno = false;
  }
  return retorno;
}

module.exports = { criarPasta, deletarPasta, salvaImagens, checkFile, getPathImg }
