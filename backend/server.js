require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors());
app.use(express.json());

const limiterGeral = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 30,
  message: { ok: false, erro: 'Muitas requisições. Tente novamente mais tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiterGeral);

const limiterContato = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 3,
  message: { ok: false, erro: 'Você já enviou várias mensagens. Aguarde alguns minutos antes de tentar de novo.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/contato', limiterContato, async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ ok: false, erro: 'Preencha todos os campos.' });
  }

  if (nome.length > 100 || email.length > 150 || mensagem.length > 2000) {
    return res.status(400).json({ ok: false, erro: 'Um dos campos excedeu o tamanho máximo permitido.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, erro: 'Email inválido.' });
  }

  try {
    await transporter.sendMail({
      from: `"${nome}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Novo contato do portfólio: ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`,
      html: `
        <h3>Novo contato pelo portfólio</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `,
    });

    res.status(200).json({ ok: true, mensagem: 'Email enviado com sucesso!' });
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    res.status(500).json({ ok: false, erro: 'Erro ao enviar email.' });
  }
});

app.get('/', (req, res) => {
  res.send('API do portfólio rodando!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});