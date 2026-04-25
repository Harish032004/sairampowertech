
// SIMPLE DIRECT FUNCTION
function sendWhatsApp() {
  // Get values directly
  var name = document.getElementById('newName').value.trim();
  var phone = document.getElementById('newPhone').value.trim();
  var service = document.getElementById('newService').value;
  var message = document.getElementById('newMessage').value.trim();
  
  // Simple validation
  if (!name) {
    alert('Please enter your name');
    document.getElementById('newName').focus();
    return false;
  }
  
  if (!phone) {
    alert('Please enter your phone number');
    document.getElementById('newPhone').focus();
    return false;
  }
  
  if (phone.length < 10) {
    alert('Please enter a valid 10-digit phone number');
    document.getElementById('newPhone').focus();
    return false;
  }
  
  if (!service) {
    alert('Please select a service');
    document.getElementById('newService').focus();
    return false;
  }
  
  // Default values
  var messageText = message || 'No message provided';
  
  // Create message
  var text = 'Name: ' + name + '%0A' +
             'Phone: ' + phone + '%0A' +
             'Service: ' + service + '%0A' +
             'Message: ' + messageText + '%0A%0A' +
             'Source: Sairam Power Tech Website';
  

  
  // Open WhatsApp
  var url = 'https://wa.me/919789029012?text=' + text;
  window.open(url, '_blank');
  
  return false; // Prevent form submission
}

// Map click functionality
document.addEventListener('DOMContentLoaded', function() {
  var mapContainer = document.getElementById('sptMapContainer');
  if (mapContainer) {
    mapContainer.addEventListener('click', function() {
      var mapsLink = 'https://www.google.com/maps/dir//SAIRAM+POWER+TECH+(Inverter+Battery+Store),+49,Pozhichalur,+First+Main+Rd,+Pammal,+Chennai,+Tamil+Nadu+600075/@12.976128,80.196559,2562m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3a52607e9018742f:0x40e6d6238577d40b!2m2!1d80.136147!2d12.9792109?entry=ttu&g_ep=EgoyMDI2MDMxMC4wIKXMDSoASAFQAw%3D%3D';
      window.open(mapsLink, '_blank');
    });
  }
});
