import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/DiscussionPage.css';
import uicLogo from './public/images/UIC-Circle-Logo.png';
import Discussion from './Discussion.jsx';

const DiscussionPage = ({ discussionThreads }) => {
  const navigate = useNavigate();
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [selectedClass, setSelectedClass] = useState("All");
  const [threads, setThreads] = useState(discussionThreads);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title: '',
    description: '',
    category: 'Grade Thread',
  });

  const handleThreadClick = (threadId) => {
    setSelectedThreadId(threadId);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setSelectedThreadId(null);
  };

  const filteredThreads = selectedClass === "All"
    ? threads
    : threads.filter(thread => thread.class === selectedClass);

  const isValidThread = selectedThreadId !== null && selectedThreadId > 0 && selectedThreadId <= filteredThreads.length;
  const selectedThread = isValidThread ? filteredThreads[selectedThreadId - 1] : {};
  const comments = selectedThread.comments || [];

  const handleAddMainReply = (newReply) => {
    const updatedThreads = threads.map(thread => {
      if (thread.id === selectedThread.id) {
        return {
          ...thread,
          answers: newReply
        };
      }
      return thread;
    });
    setThreads(updatedThreads);
    console.log("Adding reply to the main post:", newReply);
  };

  const handleAddPost = () => {
    setShowAddPostModal(true);
  };

  const handleModalClose = () => {
    setShowAddPostModal(false);
    setNewPostData({
      title: '',
      description: '',
      category: 'Grade Thread',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPostData({ ...newPostData, [name]: value });
  };

  const handleAddPostSubmit = () => {
    const newThread = {
      id: threads.length + 1,
      class: selectedClass,
      title: newPostData.title,
      description: newPostData.description,
      category: newPostData.category,
      replies: [],
      answers: [],
    };
    setThreads([...threads, newThread]);
    handleModalClose();
  };

  return (
    <div className='discussion-body'>
      <nav className='discussion-nav'>
        <div className="home">
          <label className="takehome" onClick={() => navigate('/home')} title="Home">UniConnect</label>
        </div>
        <div className="class-dropdown">
          <label htmlFor="class">Class:</label>
          <select id="class" name="class" onChange={handleClassChange} value={selectedClass}>
            <option value="All">All</option>
            <option value="CS378">Class 1</option>
            <option value="CS440">Class 2</option>
            <option value="CS426">Class 3</option>
          </select>
          <button className="add-post-button" onClick={handleAddPost}>Add New Post</button>
        </div>
        <div className="picture-space">
          <img src={uicLogo} alt="UniConnect Logo" className="discussion-logo" />
        </div>
      </nav>

      <div className='discussion-content'>
        <div className="discussion-threads">
          <h2>Discussions</h2>
          <div className="CategorySection GradeThreads">
            <h3 className="CategoryHeader">Grade Threads</h3>
            {filteredThreads.map((thread, index) => (
              thread.category === "Grade Thread" && (
                <div className='Title small-title' key={index} onClick={() => handleThreadClick(index + 1)}>
                  {thread.title}
                </div>
              )
            ))}
          </div>
          <div className="CategorySection HomeworkThreads">
            <h3 className="CategoryHeader">Homework Threads</h3>
            {filteredThreads.map((thread, index) => (
              thread.category === "Homework Thread" && (
                <div className='Title small-title' key={index} onClick={() => handleThreadClick(index + 1)}>
                  {thread.title}
                </div>
              )
            ))}
          </div>
          <div className="CategorySection ProjectThreads">
            <h3 className="CategoryHeader">Project Threads</h3>
            {filteredThreads.map((thread, index) => (
              thread.category === "Project Thread" && (
                <div className='Title small-title' key={index} onClick={() => handleThreadClick(index + 1)}>
                  {thread.title}
                </div>
              )
            ))}
          </div>
        </div>

        {isValidThread && (
          <Discussion
            title={selectedThread.title}
            description={selectedThread.description}
            answers={selectedThread.answers}
            threadId={selectedThread.id}
            onAddMainReply={handleAddMainReply}
          />
        )}

        <div className="comments">
          {comments.map((comment, index) => (
            <div className="comment-box" key={index}>
              <div className="comment">
                {comment.text}
              </div>
            </div>
          ))}
        </div>

        {showAddPostModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleModalClose}>X</span>
              <h2>Add New Post</h2>
              <label>Title:</label>
              <input type="text" name="title" value={newPostData.title} onChange={handleInputChange} />
              <label>Description:</label>
              <textarea name="description" value={newPostData.description} onChange={handleInputChange}></textarea>
              <label>Category:</label>
              <select name="category" value={newPostData.category} onChange={handleInputChange}>
                <option value="Grade Thread">Grade Thread</option>
                <option value="Homework Thread">Homework Thread</option>
                <option value="Project Thread">Project Thread</option>
              </select>
              <button onClick={handleAddPostSubmit}>Submit</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DiscussionPage;
