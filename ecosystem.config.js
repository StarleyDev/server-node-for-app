/**
 * @file
 * @author Starley Cazorla
 * 
 * Este arquivo configura e automatiza um serviço Node.js usando PM2.
 * 
 * O PM2 é um gerenciador de processos de produção para aplicativos Node.js com um carregador de aplicativos integrado.
 * Ele permite que você mantenha os aplicativos ativos para sempre e recarregue-os sem tempo de inatividade.
 * 
 * Primeiro, você precisa instalar o PM2 globalmente (caso ainda não tenha feito):
 * 
 *     npm install pm2 -g
 * 
 * Uma vez que o PM2 esteja instalado, você pode usar o comando abaixo para iniciar o serviço:
 * 
 *     pm2 start ecosystem.config.js
 * 
 * O comando acima lerá a configuração do arquivo `ecosystem.config.js` e iniciará o serviço de acordo.
 * 
 * Para verificar o status do serviço e garantir que ele esteja em execução, use:
 * 
 *     pm2 status
 * 
 * Finalmente, para garantir que o serviço reinicie automaticamente após reiniciar o sistema, você precisa salvar a configuração atual do PM2:
 * 
 *     pm2 save
 * 
 * Isso salvará a lista atual de processos gerenciados pelo PM2. Após um reinício do sistema, o PM2 iniciará automaticamente esses processos.
 */

// Configuração do PM2
module.exports = {
  apps : [{
    // Nome da aplicação como será exibido no PM2
    name: "s-node", 

    // Caminho para o script que você deseja executar
    script: "./src/server.js",

    // Pastas que o PM2 deve observar para mudanças. 
    // Se um arquivo nessas pastas for modificado, o PM2 reiniciará o aplicativo
    watch: ["./Aplicacoes"],

    // Pastas que o PM2 deve ignorar. Alterações nessas pastas não farão o PM2 reiniciar o aplicativo
    ignore_watch : ["node_modules"],

    // Opções adicionais de observação. No caso, estamos dizendo para o PM2 não seguir links simbólicos
    watch_options: {
      "followSymlinks": false
    }
  }]
}
