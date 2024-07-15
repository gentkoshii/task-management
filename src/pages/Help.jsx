import React from 'react'
import  Navbar  from "../assets/Navbar.jsx";
import  Footer  from "../assets/Footer.jsx";

const gradientStyle = {
  background: 'radial-gradient(circle at bottom left, rgba(255, 223, 146, 0.75), #FFF4DB 30%)',
  backgroundSize: 'cover'
};

const Help = () => {
  return (
    <div className='flex flex-col items-center overflow-hidden'>
      <Navbar />
      <div className='w-full flex justify-center' style={gradientStyle}>
      <div className='w-[70%] flex flex-col justify-center text-lefft p-24 gap-24'>
        <div className="flex flex-col text-xl gap-3  ">
          <h2>Need Help? We're Here for You</h2>
          <p>Below, you'll find various ways to get the support you need.</p>
        </div>

        <div className="flex flex-col text-xl gap-3">
          <h2>Comprehensive Knowledge Base</h2>
          <p>Our Knowledge Base is your first stop for all things TaskFlow. Packed with detailed guides, video tutorials, and FAQs, it's designed to help you find answers quickly and easily.
          Whether you’re looking for step-by-step instructions on setting up your first project or troubleshooting a specific issue, our Knowledge Base has got you covered..</p>
        </div>

        <div className="flex flex-col text-xl gap-3">
          <h2>Contact Our Support Team</h2>
          <p>If you need personalized assistance, our Support Team is just a click away. You can reach out to us via email or live chat for quick and efficient help with any issues you
          might encounter. Our support agents are knowledgeable, friendly, and committed to providing you with the best possible service. We’re here to ensure that your TaskFlow experience is smooth and hassle-free.</p>
        </div>

        <div className="flex flex-col text-xl gap-3 ">
          <h2>Feedback and Suggestions</h2>
          <p>Your feedback is invaluable to us. If you have suggestions on how we can improve TaskFlow or ideas for new features, we’d love to hear from you. Submit your feedback
          through our platform or reach out directly to our team. Together, we can continue to make TaskFlow better for everyone.</p>
        </div>
        
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Help