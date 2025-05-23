const express = require('express');
const app = express();

app.use(express.json());

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Webhook is alive!');
});

// 웹훅 처리용 (옵션)
app.post('/webhook', (req, res) => {
  const { user_key, message } = req.body;
  console.log('Received message:', message);
  res.json({
    version: "2.0",
    template: {
      outputs: [{
        simpleText: {
          text: `🔔 메시지를 잘 받았습니다: ${message}`
        }
      }]
    }
  });
});

// Render가 요구하는 포트 사용
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버가 포트 ${PORT}에서 실행 중입니다`);
});
