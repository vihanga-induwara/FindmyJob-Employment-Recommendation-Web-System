document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch and display reviews from XML
  fetch('reviews.xml')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
          const reviewsList = document.querySelector('.reviewsList');
          const reviews = data.querySelectorAll('review');

          reviews.forEach(review => {
              const stars = review.querySelector('stars').textContent;
              const text = review.querySelector('text').textContent;
              const userName = review.querySelector('user name').textContent;
              const userTime = review.querySelector('user time').textContent;
              const userImage = review.querySelector('user image').textContent;
              const socialClass = review.querySelector('social').textContent;

              const reviewCard = document.createElement('div');
              reviewCard.classList.add('reviewCard');
              
              reviewCard.innerHTML = `
                  <div class="stars">${stars}</div>
                  <p>${text}</p>
                  <div class="user-info">
                      <img src="${userImage}" alt="${userName}">
                      <div>
                          <span class="name">${userName}</span>
                          <span class="time">${userTime}</span>
                      </div>
                  </div>
                  <i class="fa-brands ${socialClass}"></i>
              `;
              
              reviewsList.appendChild(reviewCard);
          });
      })
      .catch(error => {
          console.error('Error fetching the reviews:', error);
      });

  // Function to handle form submission for new reviews
  document.getElementById('reviewForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      const name = document.getElementById('name').value;
      const ratings = document.querySelector('input[name="ratings"]:checked').value;
      const description = document.getElementById('description').value;
      const imageInput = document.getElementById('image');
      
      const reader = new FileReader();
      reader.onload = function(event) {
          const imageUrl = event.target.result;
          
          const reviewCard = document.createElement('div');
          reviewCard.className = 'reviewCard';
          
          reviewCard.innerHTML = `
              <div class="stars">${'★'.repeat(ratings)}</div>
              <p>${description}</p>
              <div class="user-info">
                  <img src="${imageUrl}" alt="${name}">
                  <div>
                      <span class="name">${name}</span>
                      <span class="time">Just now</span>
                  </div>
              </div>
          `;
          
          document.getElementById('newUserReviews').appendChild(reviewCard);
          document.getElementById('reviewForm').reset();
      };
      reader.readAsDataURL(imageInput.files[0]);
  });

  // Function to handle newsletter subscription form
  document.getElementById('subscribeForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('subscriberName').value;
      const email = document.getElementById('subscriberEmail').value;
  
      if (name && email) {
          alert(`Dear ${name}, you have successfully subscribed for a personalized newsletter.`);
          // Reset the form after successful submission
          document.getElementById('subscribeForm').reset();
      } else {
          alert('Please fill in all required fields.');
      }
  });


    // Functionality to change background and text color
    document.getElementById('backgroundColor').addEventListener('change', function() {
      document.body.style.backgroundColor = this.value;
  });
  
  document.getElementById('textColor').addEventListener('change', function() {
      document.body.style.color = this.value;
  });

});
