import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
    return (
        <div className="terms-container">
            <div className="terms-card">
                <h1 className="terms-title">Terms and Conditions</h1>

                <p className="terms-intro">
                    Welcome to <span className="highlight">OilCulture.in</span>! These Terms and Conditions ("Terms", "Terms and Conditions") govern your use of our website located at www.yourwebsitename.com (together or individually “Service”) operated by YourWebsiteName.
                </p>

                <div className="terms-section">
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the service.
                    </p>

                    <h2>2. Intellectual Property</h2>
                    <p>
                        All content, features, and functionality including text, graphics, logos, icons, and software are the exclusive property of YourWebsiteName and are protected by international copyright, trademark, and other intellectual property laws.
                    </p>

                    <h2>3. User Accounts</h2>
                    <p>
                        When you create an account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account. You must keep your password secure. We reserve the right to suspend or terminate your account if you violate these Terms.
                    </p>

                    <h2>4. Prohibited Activities</h2>
                    <p>
                        You agree not to use the site for any unlawful or prohibited activity, including:
                        <ul style={{ marginLeft: '20px', listStyle: 'disc' }}>
                            <li>Disrupting or interfering with site operations</li>
                            <li>Uploading viruses or malicious code</li>
                            <li>Infringing on any intellectual property</li>
                            <li>Harassing or threatening other users</li>
                        </ul>
                    </p>

                    <h2>5. User-Generated Content</h2>
                    <p>
                        By submitting content (e.g., comments, posts), you grant us a non-exclusive, worldwide, royalty-free license to use, publish, reproduce, and distribute that content. We reserve the right to remove any content we consider inappropriate or in violation of these terms.
                    </p>

                    <h2>6. Links to Other Websites</h2>
                    <p>
                        Our service may contain links to third-party websites. We do not control and are not responsible for the content or practices of any third-party sites. Accessing these sites is at your own risk.
                    </p>

                    <h2>7. Termination</h2>
                    <p>
                        We may suspend or terminate your access at any time, without prior notice or liability, for any reason including breach of Terms. Upon termination, your right to use the website will cease immediately.
                    </p>

                    <h2>8. Limitation of Liability</h2>
                    <p>
                        In no event shall YourWebsiteName be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, or goodwill, arising out of or in connection with your use of the service.
                    </p>

                    <h2>9. Disclaimer</h2>
                    <p>
                        Our website is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the site will be available at all times or free from errors or viruses.
                    </p>

                    <h2>10. Indemnification</h2>
                    <p>
                        You agree to indemnify and hold harmless YourWebsiteName and its employees, contractors, and affiliates from any claims, liabilities, or expenses arising out of your use or misuse of the website or violation of these terms.
                    </p>

                    <h2>11. Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
                    </p>

                    <h2>12. Changes to Terms</h2>
                    <p>
                        We reserve the right to update or change these Terms at any time. It is your responsibility to review them periodically. Your continued use of the website after the changes constitutes acceptance of those changes.
                    </p>

                    <h2>13. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, you can contact us at <a href="mailto:support@OilCulture.com" className="highlight">support@yourwebsitename.com</a>.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default TermsAndConditions;
