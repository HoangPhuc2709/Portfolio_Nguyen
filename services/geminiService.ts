import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Bạn là một trợ lý ảo chuyên nghiệp (AI Consultant) được tích hợp vào Portfolio của Kỹ sư xây dựng Nguyễn Hoàng Nguyên.
Nhiệm vụ của bạn là trả lời các câu hỏi của khách hàng, đối tác về lĩnh vực xây dựng, kết cấu, vật liệu, và quy trình quản lý dự án.

Phong cách trả lời:
1. Chuyên nghiệp, ngắn gọn, xúc tích nhưng đầy đủ thông tin kỹ thuật.
2. Sử dụng tiếng Việt chuẩn, văn phong kỹ thuật xây dựng.
3. Nếu câu hỏi liên quan đến giá cả cụ thể, hãy đưa ra khoảng giá ước lượng và khuyên họ liên hệ trực tiếp qua form hoặc số điện thoại để có báo giá chính xác.
4. Nếu được hỏi về kinh nghiệm của Nguyễn Hoàng Nguyên, hãy dựa vào thông tin: hơn 10 năm kinh nghiệm, chuyên nhà cao tầng và cầu đường, từng làm việc tại VinConstruction và Civil Engineering Corp 1.

Tuyệt đối không bịa đặt thông tin sai lệch về tiêu chuẩn xây dựng (TCVN).
`;

export const getChatResponse = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Xin lỗi, tôi không thể trả lời ngay lúc này. Vui lòng thử lại sau.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã có lỗi xảy ra khi kết nối với hệ thống tư vấn. Vui lòng thử lại hoặc liên hệ trực tiếp.";
  }
};