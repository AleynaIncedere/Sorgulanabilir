import { useState } from 'react';
import PostComments from './PostComments';
import PostContent from './PostContent';
import postData from '../postData';

export default function DebatePost() {
  const [comments, setComments] = useState(postData.comments);
  const [formData, setFormData] = useState({
    userName: '',
    commentText: '',
    isAnonymous: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (!formData.commentText || !formData.userName) {
      alert("Kullanıcı adı ve yorum girin.");
      return;
    }


    const newComment = {
      id: crypto.randomUUID(),
      userName: formData.isAnonymous ? "AnonimKullanıcı" : formData.userName,
      commentText: formData.commentText,
    };

  
    setComments((prevComments) => [...prevComments, newComment]);

  
    setFormData({
      userName: '',
      commentText: '',
      isAnonymous: false
    });
  };

  return (
    <div className='post-container'>
      <PostContent data={{ ...postData }} />
      <PostComments data={comments} />
      <form onSubmit={handleSubmit}>
        <input
          className='text-input'
          type='text'
          name='userName'
          placeholder='Kullanıcı adı girin.'
          value={formData.userName}
          onChange={handleInputChange}
        />
        <textarea
          name='commentText'
          placeholder='Ne düşünüyorsunuz?'
          value={formData.commentText}
          onChange={handleInputChange}
        />
        <label>
          <input
            className='checkbox'
            type='checkbox'
            name='isAnonymous'
            checked={formData.isAnonymous}
            onChange={handleInputChange}
          />
          İsimsiz mi göndereyim?
        </label>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
}
