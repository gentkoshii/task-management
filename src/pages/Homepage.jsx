import { Link } from "react-router-dom";
import Questions from '../assets/Question.jsx';
import './Homepage.scss';

const Homepage = () => {
    return ( 
        <div className="homepage">
            
            <div className="homepage-header">
                <div className="header-text">
                    <h1>TaskFlow Brings all your tasks, teammates, and tools together</h1>
                    <h3>Keep everything in the same place—even if your team isn’t.</h3>
                </div>
                <div className="header-img">
                    <img src="" alt="icon" />
                </div>
            </div>

            <div className="features">
                <div className="features-text">
                    <h1>Simplify Your Task Management</h1>
                    <h3>Efficiently organize and prioritize your tasks with ease.</h3>
                </div>
                <div className="features-card">
                    <div className="card">
                        <img src="" alt="icon" />
                        <h3>{}</h3>
                        <p>{}</p>
                        <Link to="/features"><button>Get It Now</button></Link>
                    </div>
                </div>
            </div>

            <div className="work-process">
                <h1>Work Process</h1>
                <img src="" alt="work-process" />
            </div>

            <div className="why-taskflow">
                <h1>Why TaskFlow is the best for you!!</h1>
                <div className="card-team">
                    <div className="expert-team">
                        <h3>1. Expert Team</h3>
                        <img src="" alt="conceptual-photo" />
                        <p>Our team comprises individuals who are passionate and offers support at any given time.</p>
                    </div>
                    <div className="customized">
                        <h3>2. Customized</h3>
                        <img src="" alt="conceptual-photo" />
                        <p>Every project is tailored to your specific needs, that³s uni¿uely yours.</p>
                    </div>
                    <div className="technology">
                        <h3>3. Technology</h3>
                        <img src="" alt="conceptual-photo" />
                        <p>We stay up-to-date with the latest technologies to provide solutions.</p>
                    </div>
                </div>
            </div>

            <div className="faq">
                <Questions />
            </div>

            <div className="support-section">
                <h3>Do you need help? Contact our support team.</h3>
                <p>
                    At TaskFlow, we believe that excellent support is key to your success. Whether you're just getting started or need assistance with advanced features, our dedicated support team is here to help.
                </p>
                <Link to="/help"><button className="need-help-button">Need Help</button></Link>
            </div>

        </div>
     );
}
 
export default Homepage;