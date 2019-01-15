global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo!';

module.exports = {
    connectionString: 'mongodb://jvbechara:crvg25101995@ds048719.mlab.com:48719/ndstr',
    sendgridKey: 'SUA CHAVE AQUI', // pra enviar email
    containerConnectionString: 'CHAVE' // pra armazenar as imagens dos produtos
}
