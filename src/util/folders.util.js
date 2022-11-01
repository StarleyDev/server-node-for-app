// Manutenção de pastas e arquivos
/**
 * @author Starley Cazorla
 */

'use sctict'
const fs = require('fs');
const path = require('path');

function criarPasta(nomePasta) {
  if (!fs.existsSync(nomePasta)) {
    console.log(`# * PASTA - ${nomePasta} - CRIADA * #`);
    //Efetua a criação do diretório
    fs.mkdirSync(nomePasta, { recursive: true });
  }
}

function deletarPasta(path) {
  console.log(`# * PASTA - ${path} - DELETADA * #`);
  fs.rmSync(path, { recursive: true });
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
      let arquivoEncontrado = true;
      let count = 2

      while (arquivoEncontrado) {
        if (isPrincipal && count === 2) {
          nomeArquivo = nomeOriginal + '-1';
        } else {
          nomeArquivo = nomeOriginal + '-' + count;
        }
        arquivoEncontrado = checkFile(dir + nomeArquivo + '.png')
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

/**
 * Salva arquivos localmente
 * @param {*} caminho 
 * @param {*} buffer 
 * @param {*} tipoOperacao 
 * @returns 
 */
function salvarArquivo(caminho, buffer, tipoOperacao) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(caminho, buffer, tipoOperacao, function (err, result) {
        if (err) {
          console.log('error', err);
          reject(err);
        } else {
          resolve(result);
        }

      });
    } catch (err) {
      reject(err);
      console.log(err);
    }
  });
}


function convertImageToBase64(caminho, tipoOperacao) {
  if (tipoOperacao) {
    caminho += __dirname + '/assets/10224.jpg';
  }
  if (fs.existsSync(caminho)) {
    const imageAsBase64 = fs.readFileSync(caminho, 'base64');
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


module.exports = { criarPasta, deletarPasta, salvaImagens, checkFile, getDir, salvarArquivo }
