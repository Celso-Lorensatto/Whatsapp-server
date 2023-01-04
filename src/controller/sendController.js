const {
  Client,
  Location,
  List,
  Buttons,
  LocalAuth,
  MessageMedia,
} = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: false },
});

exports.send = async (req, res, next) => {
  const telefone = "+" + req.params.telefone;
  const { cliente, filial, atendente, encomenda } = req.body;

  const mensagem = `${cliente},\nEste é o pedido de encomenda solicitado por você em nosso loja (${
    filial == "01" ? "Doceira Innocêncio" : "Doceira Innocêncio Andorinha"
  }). Por favor, confira os dados do pedido, caso necessite de algum ajuste, avise-nos, caso contrario estará disponível em nossa loja na data e hora agendada.
Atenciosamente,
${atendente} 
Doceira Innocêncio.
  `;

  const chatId = telefone.substring(1) + "@c.us";

  const media = await new MessageMedia("image/png", encomenda, "Encomenda.jpg");

  const result = await client.sendMessage(chatId, media, {
    caption: mensagem,
  });

  return res.status(200).json({
    result,
  });
};

exports.initialize = async (req, res, next) => {
  client.initialize();

  client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
  });

  return res.status(200).json({
    mensagem: "",
  });
};
