const express = require('express');
const app = express();

app.use(express.json());

// 기본 주소에 응답 (브라우저에서 확인 가능)
app.get('/', (req, res) => {
  res.send('Webhook is alive!');
});

// Webhook 주소 테스트 (선택)
app.post('/webhook', (req, res) => {
  const { user_key, message } = req.body;
  console.log('📩 받은 메시지:', message);
  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `✅ 메시지 잘 받았어요: ${message}`
          }
        }
      ]
    }
  });
});

// Render 환경에서 필수: process.env.PORT 사용
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버가 포트 ${PORT}에서 실행 중입니다`);
});

