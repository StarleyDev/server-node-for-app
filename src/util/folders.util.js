// Manutenção de pastas e arquivos
/**
 * @author Starley Cazorla
 */

'use sctict'
const fs = require('fs');
const path = require('path');

function createFolder(folderName) {
  if (!fs.existsSync(folderName)) {
    console.log(`# * 🗂 PASTA - ${folderName} - CRIADA * #`);
    //Efetua a criação do diretório
    fs.mkdirSync(folderName, { recursive: true });
  }
}

async function deleteFolder(filePath) {
  console.log(`# * 🗑  PASTA - ${filePath} - DELETADA * #`);
  fs.rmSync(filePath, { recursive: true });
}

async function deleteFile(filePath) {
  try {
    fs.unlinkSync(filePath, { recursive: true });
  } catch (error) {
    // console.log(`# * 🗑  ARQUIVO - ${filePath} - DELETADO * #`);
  }
}

// Using a function to set default app path
function getDir() {
  return path.join(process.cwd());
}

/**
 * Salva a imagem em pasta local
 * @param {*} dir 
 * @param {*} fileName 
 * @param {*} data 
 * @param {*} isPrincipal 
 * @returns 
 */
function salvaImagens(dir, fileName, data, isPrincipal) {
  return new Promise((resolve, reject) => {

    try {
      let nomeOriginal = fileName;
      let arquivoEncontrado = true;
      let count = 2

      while (arquivoEncontrado) {
        if (isPrincipal && count === 2) {
          fileName = nomeOriginal + '-1';
        } else {
          fileName = nomeOriginal + '-' + count;
        }
        arquivoEncontrado = checkFile(dir + fileName + '.png')
        if (arquivoEncontrado) {
          count += 1;
        }
      }

      let caminho = dir + fileName;
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
 * @param {*} operationType 
 * @returns 
 */
function saveFile(caminho, buffer, operationType) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(caminho, buffer, operationType, function (err, result) {
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


function convertImageToBase64(caminho, operationType) {
  if (operationType) {
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

async function getListOfApplication(pathApplication) {
  return new Promise((resolve) => {
    fs.readdir(pathApplication, { withFileTypes: true }, (err, files) => {
      if (err) {
        resolve(false);
        return;
      }

      const subpastas = files
        .filter(file => file.isDirectory())
        .map(file => file.name);

      resolve(subpastas);
    });
  });
}


module.exports = { createFolder, deleteFolder, deleteFile, salvaImagens, checkFile, getDir, saveFile, getListOfApplication }
