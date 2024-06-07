<template>
  <navbar></navbar>
  
      <!-- Introduction Section -->
      <section class="introduction-section">
        <div class="container">
          <h2>Welcome to Our Company</h2>
          <p>
            We are dedicated to providing the best services in the industry. Our team of professionals works tirelessly to ensure customer satisfaction and deliver top-quality results.
          </p>
        </div>
      </section>
  
      <!-- Mission and Vision Section -->
      <section class="mission-vision-section">
        <div class="container">
          <div class="mission">
            <h3>Our Mission</h3>
            <p>
              Our mission is to create value for our customers through innovative solutions and exceptional service.
            </p>
          </div>
          <div class="vision">
            <h3>Our Vision</h3>
            <p>
              Our vision is to be the leading provider in our industry, known for our commitment to excellence and customer satisfaction.
            </p>
          </div>
        </div>
      
      </section>
  
      <!-- Team Section -->
       <div class="flex-wrap justify-center content-center">
      <h2>Our Team</h2>
        <div class="team">
          <div class="team-member">
            <img src="public/images/ice.jpg" alt="jhune" />
            <h3>Jhune Eleazar Camatura</h3>
            <p>CEO</p>
          </div>
          <div class="team-member">
            <img src="public/images/ice.jpg" alt="shane" />
            <h3>Shane Cale</h3>
            <p>CTO</p>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  
  </script>
  
  <style scoped>
  .about-page {
    font-family: Arial, sans-serif;
  }
  
  /* Hero Section */
  .hero-section {
    background: url('public/images/ice.jpeg') no-repeat center center/cover;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
  }
  
  .hero-content h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
  
  .hero-content p {
    font-size: 1.2rem;
  }
  
  /* Introduction Section */
  .introduction-section {
    padding: 2rem 0;
    text-align: center;
  }
  
  .introduction-section .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .introduction-section h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .introduction-section p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  /* Mission and Vision Section */
  .mission-vision-section {
    background: #f9f9f9;
    padding: 2rem 0;
  }
  
  .mission-vision-section .container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
  }
  
  .mission-vision-section h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .mission-vision-section p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .mission-vision-section .mission,
  .mission-vision-section .vision {
    flex: 1;
  }
  
  /* Team Section */
  
  .team-section .container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  
  .team-section h3 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .team-members {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }
  
  .team-member {
    width: 200px;
    text-align: center;
  }
  
  .team-member img {
    width: 100%;
    border-radius: 50%;
    margin-bottom: 1rem;
  }
  
  .team-member h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .team-member p {
    font-size: 1rem;
    color: #555;
  }
  </style>