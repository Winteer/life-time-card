'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

function PlusIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 6l1-2h6l1 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 6l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function LifeReceiptGenerator() {
  const [items, setItems] = useState([
    { id: 1, text: '读书' },
    { id: 2, text: '看电影' },
    { id: 3, text: '放空自己' }
  ]);
  const receiptRef = useRef(null);
  const [savedReceipts, setSavedReceipts] = useState([]);

  const addItem = () => {
    const newItem = { id: Date.now(), text: '' };
    setItems([...items, newItem]);
  };

  const refreshQuote = () => {
    setCurrentQuote(getRandomQuote());
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, text) => {
    setItems(items.map(item => item.id === id ? { ...item, text } : item));
  };

  const generateReceipt = () => {
    if (receiptRef.current) {
      html2canvas(receiptRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `life-receipt-${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Save to receipts
        setSavedReceipts([...savedReceipts, canvas.toDataURL('image/png')]);
        
        // Refresh quote after generating
        refreshQuote();
      });
    }
  };

  // Random quotes
  const quotes = [
    { en: 'Ordinary days, simple joy', zh: '日子一般般，快乐很简单' },
    { en: 'Keep loving, chase dreams', zh: '保持热爱，奔赴山海' },
    { en: 'Small happiness, big smile', zh: '小确幸，大开心' },
    { en: 'Slow down, enjoy life', zh: '慢下来，享受生活' },
    { en: 'Live simply, dream big', zh: '简单生活，大胆追梦' }
  ];

  const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>THE LIFE STORE</h1>
        <p className="subtitle">时光小票生成器 · Life Receipt Generator</p>
      </header>

      <main className="main-content">
        <div className="input-section">
          <div className="section-header">
            <h2>今日事项 · TODAY'S TODO</h2>
          </div>
          
          <div className="input-list">
            {items.map(item => (
              <div key={item.id} className="input-item">
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => updateItem(item.id, e.target.value)}
                  placeholder="输入事项"
                  className="item-input"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-button"
                  aria-label="删除事项"
                >
                  <TrashIcon width="16" height="16" />
                </button>
              </div>
            ))}
          </div>

          <div className="button-group">
            <button onClick={addItem} className="add-button">
              <PlusIcon width="16" height="16" />
              <span>添加事项</span>
            </button>
            
            <button onClick={generateReceipt} className="generate-button">
              <span>PRINT · 生成小票</span>
            </button>
          </div>

          <p className="hint">输入今日事项来生成你的时光小票</p>
        </div>

        <div className="preview-section">
          <div ref={receiptRef} className="receipt-preview">
            <div className="receipt-header">
              <h3>THE LIFE STORE</h3>
              <p className="store-subtitle">时光采购店</p>
              <p className="store-english">DAILY LIFE RECEIPT</p>
            </div>
            
            <div className="receipt-date">
              <span>DATE: {today}</span>
            </div>
            
            <div className="receipt-items">
              {items.map((item, index) => (
                <div key={item.id} className="receipt-item">
                  <span>{index + 1}. {item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="receipt-total">
              <span>TOTAL:</span>
              <span className="total-value">ONE DAY</span>
            </div>
            
            <div className="receipt-footer">
              <p className="footer-text">{currentQuote.en}</p>
              <p className="footer-text-zh">{currentQuote.zh}</p>
            </div>
            
            <div className="barcode">
              <div className="barcode-lines"></div>
            </div>
          </div>
        </div>
      </main>

      <div className="receipts-section">
        <h2>我的收据 · MY RECEIPTS</h2>
        <div className="receipts-grid">
          {savedReceipts.map((receipt, index) => (
            <div key={index} className="saved-receipt">
              <img src={receipt} alt={`Receipt ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Courier New', monospace, '得意黑', sans-serif;
          background-color: #ffffff;
          color: #000000;
          line-height: 1.6;
        }

        @font-face {
          font-family: 'Courier New';
          src: local('Courier New');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: '得意黑';
          src: url('/life-time-card/static/SmileySans-Oblique.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }

        .app-container {
          min-height: 100vh;
          padding: 20px;
          background-color: #ffffff;
        }

        .app-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 20px 0;
        }

        .app-header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          letter-spacing: 2px;
        }

        .subtitle {
          font-size: 1rem;
          color: #cccccc;
        }

        .main-content {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 30px;
          margin-bottom: 60px;
        }

        .input-section {
          background-color: #ffffff;
          border: 2px dashed #000;
          padding: 30px;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
        }

        .section-header h2 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .input-list {
          margin-bottom: 20px;
        }

        .input-item {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .item-input {
          flex: 1;
          padding: 12px;
          background-color: #ffffff;
          border: 2px solid #000;
          border-radius: 8px;
          color: #000000;
          font-family: 'Courier New', monospace;
          font-size: 1rem;
        }

        .remove-button {
          background-color: transparent;
          border: none;
          padding: 10px;
          color: #000000;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .remove-button:hover {
          background-color: #f5f5f5;
        }

        .button-group {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .add-button {
          flex: 1;
          padding: 15px;
          background-color: #ffffff;
          border: 2px solid #000;
          border-radius: 8px;
          color: #000000;
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 0.2s;
        }

        .add-button:hover {
          background-color: #f5f5f5;
        }

        .generate-button {
          flex: 1;
          padding: 15px;
          background-color: #000;
          border: 2px solid #000;
          border-radius: 8px;
          color: #ffffff;
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.2s;
        }

        .generate-button:hover {
          background-color: #333;
        }

        .hint {
          text-align: center;
          color: #666;
          font-size: 0.9rem;
          font-style: italic;
        }

        .preview-section {
          width: 100%;
          max-width: 400px;
          display: flex;
          justify-content: center;
        }

        .receipt-preview {
          background-color: #ffffff;
          border: 2px solid #ccc;
          padding: 30px;
          border-radius: 8px;
          width: 100%;
          max-width: 350px;
          min-height: 500px;
          position: relative;
          font-family: 'Courier New', monospace;
        }

        .receipt-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .receipt-header h3 {
          font-size: 1.5rem;
          margin-bottom: 5px;
          letter-spacing: 2px;
          font-family: 'Courier New', monospace;
        }

        .store-subtitle {
          font-size: 0.9rem;
          margin-bottom: 5px;
          font-family: '得意黑', sans-serif;
        }

        .store-english {
          font-size: 0.9rem;
          color: #444;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Courier New', monospace;
        }

        .receipt-date {
          text-align: left;
          margin-bottom: 15px;
          color: #666;
          font-size: 0.9rem;
          padding: 10px 0;
          border-top: 2px dashed #000;
          border-bottom: 1px dashed #000;
          font-family: 'Courier New', monospace;
        }

        .receipt-items {
          margin-bottom: 5px;
          padding: 5px 0;
        }

        .receipt-item {
          margin-bottom: 5px;
          font-size: 1rem;
          padding: 5px 0;
          font-family: 'Courier New', monospace, '得意黑', sans-serif;
        }

        .receipt-total {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding: 15px 0;
          border-top: 1px dashed #000;
          border-bottom: 1px dashed #000;
          font-family: 'Courier New', monospace;
          font-weight: bold;
        }

        .total-value {
          font-weight: bold;
          font-family: 'Courier New', monospace;
        }

        .receipt-footer {
          text-align: center;
          margin-bottom: 15px;
          color: #666;
          font-size: 0.9rem;
          font-style: italic;
          padding: 10px 0;
        }

        .footer-text {
          margin-bottom: 5px;
          font-family: 'Courier New', monospace;
        }

        .footer-text-zh {
          margin-top: 8px;
          font-size: 1rem;
          font-style: normal;
          color: #333;
          font-family: '得意黑', sans-serif;
        }



        .barcode {
          text-align: center;
          margin-top: 30px;
        }

        .barcode-lines {
          height: 48px;
          width: 75%;
          margin: 0 auto;
          background: linear-gradient(to right,
            #000 0%, #000 2%, transparent 2%, transparent 3%,
            #000 3%, #000 4%, transparent 4%, transparent 5%,
            #000 5%, #000 7%, transparent 7%, transparent 8%,
            #000 8%, #000 9%, transparent 9%, transparent 10%,
            #000 10%, #000 12%, transparent 12%, transparent 13%,
            #000 13%, #000 14%, transparent 14%, transparent 15%,
            #000 15%, #000 17%, transparent 17%, transparent 18%,
            #000 18%, #000 19%, transparent 19%, transparent 20%,
            #000 20%, #000 22%, transparent 22%, transparent 23%,
            #000 23%, #000 24%, transparent 24%, transparent 25%,
            #000 25%, #000 27%, transparent 27%, transparent 28%,
            #000 28%, #000 29%, transparent 29%, transparent 30%,
            #000 30%, #000 32%, transparent 32%, transparent 33%,
            #000 33%, #000 34%, transparent 34%, transparent 35%,
            #000 35%, #000 37%, transparent 37%, transparent 38%,
            #000 38%, #000 39%, transparent 39%, transparent 40%,
            #000 40%, #000 42%, transparent 42%, transparent 43%,
            #000 43%, #000 44%, transparent 44%, transparent 45%,
            #000 45%, #000 47%, transparent 47%, transparent 48%,
            #000 48%, #000 49%, transparent 49%, transparent 50%,
            #000 50%, #000 52%, transparent 52%, transparent 53%,
            #000 53%, #000 54%, transparent 54%, transparent 55%,
            #000 55%, #000 57%, transparent 57%, transparent 58%,
            #000 58%, #000 59%, transparent 59%, transparent 60%,
            #000 60%, #000 62%, transparent 62%, transparent 63%,
            #000 63%, #000 64%, transparent 64%, transparent 65%,
            #000 65%, #000 67%, transparent 67%, transparent 68%,
            #000 68%, #000 69%, transparent 69%, transparent 70%,
            #000 70%, #000 72%, transparent 72%, transparent 73%,
            #000 73%, #000 74%, transparent 74%, transparent 75%,
            #000 75%, #000 77%, transparent 77%, transparent 78%,
            #000 78%, #000 79%, transparent 79%, transparent 80%,
            #000 80%, #000 82%, transparent 82%, transparent 83%,
            #000 83%, #000 84%, transparent 84%, transparent 85%,
            #000 85%, #000 87%, transparent 87%, transparent 88%,
            #000 88%, #000 89%, transparent 89%, transparent 90%,
            #000 90%, #000 92%, transparent 92%, transparent 93%,
            #000 93%, #000 94%, transparent 94%, transparent 95%,
            #000 95%, #000 97%, transparent 97%, transparent 98%,
            #000 98%, #000 99%, transparent 99%, transparent 100%);
        }

        .receipts-section {
          margin-top: 60px;
        }

        .receipts-section h2 {
          font-size: 1.5rem;
          margin-bottom: 30px;
          text-align: center;
        }

        .receipts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          padding: 0 20px;
        }

        .saved-receipt {
          background-color: #f5f5f5;
          border: 2px dashed #999;
          border-radius: 12px;
          padding: 15px;
        }

        .saved-receipt img {
          width: 100%;
          height: auto;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .main-content {
            flex-direction: column;
            align-items: center;
          }
          
          .input-section, .preview-section {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
