import React, { useState } from 'react';
import './css/Discussion.css';

const Discussion = ({ title, description, answers, threadId, onAddMainReply }) => {
  const [replyInputs, setReplyInputs] = useState([...answers.map(() => false)]);
  const [replyTexts, setReplyTexts] = useState([...answers.map(() => '')]);
  const [mainReplyText, setMainReplyText] = useState('');
  const [showMainReplyInput, setShowMainReplyInput] = useState(false);

  const handleReplyToggle = (index) => {
    const newReplyInputs = [...replyInputs];
    newReplyInputs[index] = !newReplyInputs[index];
    setReplyInputs(newReplyInputs);
  };
  
  const handleReplySubmit = (answerIndex, isMainReply = true, parentIndex = null) => {
    const newText = replyTexts[answerIndex];
    const newReply = { text: newText, user: "Your Name", replies: [] };

    if (isMainReply) {
      answers[answerIndex].replies.push(newReply);
    }

    const newReplyInputs = [...replyInputs];
    newReplyInputs[answerIndex] = false;
    setReplyInputs(newReplyInputs);
    setReplyTexts(replyTexts.map((text, idx) => (idx === answerIndex ? '' : text)));
  };

  const handleMainReplySubmit = () => {
    if (mainReplyText.trim()) {
      onAddMainReply([...answers, { text: mainReplyText, user: "Your Name", replies: [] }]);
      setMainReplyText('');
      setShowMainReplyInput(false);
    }
  };

  const renderReplies = (replies, parentIndex) => {
    return replies.map((reply, index) => (
      <div key={index} className="ReplyBox">
        <p>{reply.text}</p>
        <p>Posted by: {reply.user}</p>
      </div>
    ));
  };

  return (
    <div className="DiscussionContent">
      <h3 className="Title">{title}</h3>
      <p className="Description">{description}</p>
      {showMainReplyInput ? (
        <div className="ReplyInputContainer">
          <input
            className="ReplyInput"
            placeholder="Reply to thread..."
            value={mainReplyText}
            onChange={(e) => setMainReplyText(e.target.value)}
          />
          <button onClick={handleMainReplySubmit} className="RoundButton">Submit Reply</button>
        </div>
      ) : (
        <button onClick={() => setShowMainReplyInput(true)} className="RoundButton">Reply to Thread</button>
      )}
      <div className="Responses" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {answers.map((answer, index) => (
          <div key={index} className="ResponseBox">
            <p>{answer.text}</p>
            <p>Posted by: {answer.user}</p>
            <button onClick={() => handleReplyToggle(index)} className="RoundButton">
              {replyInputs[index] ? 'Cancel' : 'Reply'}
            </button>
            {replyInputs[index] && (
              <div className="ReplyInputContainer">
                <input
                  className="ReplyInput"
                  placeholder="What do you want to say?"
                  value={replyTexts[index]}
                  onChange={(e) => {
                    const newReplyTexts = [...replyTexts];
                    newReplyTexts[index] = e.target.value;
                    setReplyTexts(newReplyTexts);
                  }}
                />
                <button onClick={() => handleReplySubmit(index)} className="RoundButton">Submit Reply</button>
              </div>
            )}
            {answer.replies && answer.replies.length > 0 && renderReplies(answer.replies, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discussion;
