"use client";

import { useState } from 'react';
import { Button, Input } from 'antd';
//import 'antd/dist/reset.css';


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
      <h1>Job Description Analyzer</h1>
      <p>
        Paste the job description below to receive a detailed analysis and a study roadmap.
      </p>
      <div style={{ width: '100%' }}>
        <Input.TextArea
          rows={6}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here"
        />
        <Button type="primary" onClick={handleAnalyze} style={{ marginTop: '10px' }}>
          Analyze Job
        </Button>
        {result && (
          <div style={{ marginTop: '20px' }}>
            <h4>Analysis Result</h4>
            <div dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
