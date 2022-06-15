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

function salvaImagens(dir, nomeArquivo, data) {
  return new Promise((resolve, reject) => {
    try {
      let caminho = dir + nomeArquivo;
      fs.writeFile(caminho, data, 'base64', function (err, result) {
        if (err) {
          console.log('error', err);
        } else {
          console.log('result', result);
        }

      });

    } catch (err) {
      reject(err);
      console.log(err);
    } finally {
      console.log("file written successfully");
      resolve();
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

module.exports = { criarPasta, deletarPasta }
