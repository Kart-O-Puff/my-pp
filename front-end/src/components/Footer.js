import React from 'react'

const Footer = () => {
  return (
    <footer>
        <p>
            Office of Culture and Arts © 
            <span>
                {(new Date().getFullYear())}
            </span>
        </p>
    </footer>
  );
};

export default Footer