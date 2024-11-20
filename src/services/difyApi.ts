const DIFY_API_KEY = 'app-hniLVOTQ5YW0t3lANgtDht4b'; // Replace with your actual API key

interface DifyResponse {
  answer: string;
  error?: string;
}

interface DifyError {
  error: {
    message: string;
  };
}

export async function generateHeadlines(
  asset: string,
  location: string,
  tone: string
): Promise<string> {
  try {
    const response = await fetch('https://api.dify.ai/v1/completion-messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          Asset: asset,
          Location: location,
          Tone: tone
        },
        response_mode: "blocking",
        user: "user-" + Date.now()
      })
    });

    if (!response.ok) {
      const errorData = await response.json() as DifyError;
      throw new Error(errorData.error?.message || 'Failed to generate headlines');
    }

    const data = await response.json() as DifyResponse;
    
    if (!data.answer) {
      throw new Error('ไม่ได้รับคำตอบจาก AI');
    }

    return data.answer;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`การสร้างคำพาดหัวล้มเหลว: ${error.message}`);
    }
    throw new Error('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
  }
} 