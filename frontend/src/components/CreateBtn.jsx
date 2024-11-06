import React from 'react';

const CreateBtn = () => {
  return (
    <div>
      {/* Fixed Button */}
      <button
        type="button"
        className="btn btn-primary rounded-circle"
        style={{
          width: '60px',
          height: '60px',
          padding: '0',
          textAlign: 'center',
          lineHeight: '50px',
          position: 'fixed',
          bottom: '50px', // Fixed 20px from the bottom of the viewport
          right: '50px',  // Fixed 20px from the right of the viewport
        }}
      >
        +
      </button>

     
    </div>
  );
};

export default CreateBtn;