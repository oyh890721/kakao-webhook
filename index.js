const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const userMessage = req.body.userRequest.utterance;

  if (userMessage.includes("오늘 일정")) {
    try {
      const response = await axios.get('https://script.google.com/macros/s/AKfycbz_tEL0igOp9-sTRnl7KhIyaLnMdbiDjgayywzlNnakwXgWVojCG6JTvUPKy93Hfu5CEg/exec');
      const schedule = response.data;

      return res.json({
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: `📅 오늘의 주요활동: ${schedule}`
              }
            }
          ]
        }
      });
    } catch (error) {
      console.error(error);
      return res.json({
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: "일정을 불러오는 데 문제가 발생했습니다."
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
              text: "원하시는 정보를 말씀해주세요."
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


