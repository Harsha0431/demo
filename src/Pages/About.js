import React from 'react'
import './About.css'
import { useNavigate } from 'react-router-dom';


function About() {

    // const navigate = useNavigate(); // Initialize the useHistory hook

    // const handleGetStarted = () => {
    //     // Programmatically navigate to the "Share File" page
    //     navigate('/share');
    // };

    return (
        <div>
            <body className='about-3'>
    <header>
        <h1>About ShareWithMe</h1>
    </header>

    <div className="container">
        <p>Welcome to ShareWithMe, an innovative and secure file sharing platform designed to simplify the process of sharing files without the need for registration or any personal information. Our platform provides a seamless and anonymous way for users to share files with others, ensuring privacy and convenience.</p>

        <h2>How Does it Work?</h2>
        <ol>
            <li><strong>Simple File Sharing:</strong> With ShareWithMe, you can easily share any file with friends, colleagues, or anyone else in just a few clicks. There's no need to sign up or provide any personal details.</li>
            <li><strong>Anonymous Sharing:</strong> We value your privacy, and that's why we don't require any registration. Your identity remains completely anonymous while using our platform, giving you the freedom to share files discreetly.</li>
            <li><strong>Unique ID Generation:</strong> When you upload a file, our system automatically generates a unique ID for that file. This ID acts as a secure link to access and download the shared file. It's essential to keep this ID safe and share it only with the intended recipients.</li>
            <li><strong>Secure File Retrieval:</strong> The recipient of the shared file can simply enter the unique ID provided by the sender on our platform's search bar. Once verified, the file becomes available for download, ensuring that only the intended recipient can access it.</li>
        </ol>

        <div className="note">
            <p><strong>Note:</strong> Please do not share any sensitive or personal content using ShareWithMe. The unique ID acts as a direct link to the file, and anyone with the ID can access it.</p>
        </div>

        <p>Enjoy seamless and anonymous file sharing with ShareWithMe today!</p>

        {/* <a className="cta-button" onClick={handleGetStarted}>Get Started</a> */}
    </div>

    <div className="container">
        <h2>Our Commitment</h2>
        <p>At ShareWithMe, we are committed to providing a user-friendly and safe environment for file sharing. Our platform employs state-of-the-art security measures to safeguard your files during transit and ensure a seamless experience. We continuously strive to improve our services and enhance your file sharing experience.</p>
    </div>

    <div className="container">
        <h2>Contact Us</h2>
        <p>If you have any questions, feedback, or concerns, we are here to assist you. Feel free to reach out to us through our contact form or email at contact <strong>harshavardhan0431@gmail.com</strong>. Your input is invaluable to us as we work towards making ShareWithMe the best file sharing platform.</p>
    </div>

    <div className="container">
        <h2>Spread the Word</h2>
        <p>If you find ShareWithMe useful and user-friendly, don't hesitate to spread the word. Share the platform with your friends, colleagues, and contacts, helping us grow our community and assist more users in sharing files effortlessly. Together, we can make file sharing a seamless and secure experience for everyone.</p>
    </div>

    <footer>
        &copy; 2023 ShareWithMe. All rights NOT <span>&#128514;</span> received.
    </footer>
</body>

        </div>
    )
}

export default About