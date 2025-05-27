const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const userMessage = req.body?.userRequest?.utterance || "";

  if (userMessage.includes("일정")) {
    // ✅ 먼저 응답을 전송 (타임아웃 방지)
    res.json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "📅 일정을 불러오는 중입니다..."
            }
          }
        ]
      }
    });

    // ✅ Google Apps Script 호출은 백그라운드에서 비동기 실행
    axios.get('https://script.google.com/macros/s/AKfycbx7dRUDvMxakVlveD-PPOWfGbKi6FpKXLm5hkjmO7QgK_0dcJ6t1hUpyM6hpz4wxtA_hw/exec')
      .then(response => {
        console.log("📥 가져온 일정:", response.data);
        // 여기서 실제로 가져온 데이터를 저장하거나 활용할 수도 있음
      })
      .catch(error => {
        console.error("❌ Google Apps Script 요청 실패:", error.message);
      });

  } else {
    // 일정이 아닌 경우 일반 응답
    res.json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "무엇을 도와드릴까요?"
            }
          }
        ]
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버가 포트 ${PORT}에서 실행 중입니다`);
});
