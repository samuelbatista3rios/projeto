"use client";

import { useState } from 'react';
import { Button, Input, Space, Typography } from 'antd';
//import 'antd/dist/reset.css';

const { Title, Paragraph } = Typography;

const Home = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred while processing the request.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title>Job Description Analyzer</Title>
      <Paragraph>
        Paste the job description below to receive a detailed analysis and a study roadmap.
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input.TextArea
          rows={6}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here"
        />
        <Button type="primary" onClick={handleAnalyze}>
          Analyze Job
        </Button>
        {result && (
          <div>
            <Title level={4}>Analysis Result</Title>
            <div dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        )}
      </Space>
    </div>
  );
};

export default Home;
