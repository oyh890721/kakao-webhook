const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/webhook', async (req, res) => {
  const userMessage = req.body?.userRequest?.utterance || "";

  if (userMessage.includes("일정")) {
    try {
      const response = await axios.get('https://script.google.com/macros/s/AKfycbx7dRUDvMxakVlveD-PPOWfGbKi6FpKXLm5hkjmO7QgK_0dcJ6t1hUpyM6hpz4wxtA_hw/exec');

      const schedule = typeof response.data === 'string'
        ? response.data
        : JSON.stringify(response.data);

      return res.json({
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: schedule
              }
            }
          ]
        }
      });
    } catch (error) {
      console.error("❌ 오류 발생:", error.message);
      return res.json({
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: "❌ 일정을 불러오는 데 문제가 발생했습니다."
              }
            }
          ]
        }
      });
    }
  } else {
    return res.json({
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
